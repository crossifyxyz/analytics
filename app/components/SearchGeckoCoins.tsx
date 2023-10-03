'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Divider,
  SlideFade,
  Heading,
  HStack,
  Stack,
  useColorModeValue,
  Wrap,
} from '@chakra-ui/react'
import {
  setComp,
  setUser,
  useAppSelector,
  useGetGeckoCoinsListQuery,
  useGetGeckoSearchQuery,
  usePatchUserTrackedGeckoCoinsMutation,
} from '@/lib/store'
import { AvatarSpinner, CWindowedSelect } from './ui'
import Market from './mapItems/Market'
import Link from 'next/link'
import { useIsHydrated } from '@/hooks'

export default function SearchGeckoCoins() {
  const isHydradet = useIsHydrated()
  const dispatch = useDispatch()
  const [optSearch, setOptSearch] = useState('0')
  const [isActive, setIsActive] = useState(false)
  const { id, geckoSearchValue } = useAppSelector((state) => ({
    id: state.auth.id,
    geckoSearchValue: state.comp.geckoSearchValue,
  }))

  const geckoCoinsQuery = useGetGeckoCoinsListQuery()

  const [patchTrackedGeckoCoins, trackedGeckoCoinsResult] =
    usePatchUserTrackedGeckoCoinsMutation()

  const geckoSearchQuery = useGetGeckoSearchQuery(
    { ids: geckoSearchValue.map((i: any) => i.value) },
    {
      skip: !geckoSearchValue.length,
    }
  )

  const shadowColor = useColorModeValue(
    'rgba(0, 0, 0, 0.05)',
    'rgb(250, 250, 250, 0.05)'
  )

  const TrackResults = () => (
    <Button
      spinner={<AvatarSpinner />}
      isLoading={trackedGeckoCoinsResult.isLoading}
      size={'xs'}
      onClick={() => {
        setIsActive(false)
        patchTrackedGeckoCoins({
          id,
          selectedGeckoCoins: geckoSearchValue.map((i: any) => i.value),
          type: 'add',
        }).then((res: any) => {
          dispatch(
            setUser({
              trackedGeckoCoins: res.data,
            })
          )
          dispatch(
            setComp({
              geckoSearchValue: [],
            })
          )
        })
      }}
    >
      Track Results
    </Button>
  )

  const combinedIsLoading =
    trackedGeckoCoinsResult.isLoading || geckoCoinsQuery.isLoading

  return (
    <Stack
      justify={'center'}
      p={3}
      spacing={2}
      boxShadow={`0px 0px 4px 4px ${shadowColor}`}
      border={'1px solid'}
      borderColor={'whiteAlpha.400'}
      borderRadius={10}
    >
      {(() => {
        if (!isHydradet || combinedIsLoading || geckoSearchQuery.isLoading)
          return <AvatarSpinner />

        return (
          <SlideFade unmountOnExit in={!combinedIsLoading}>
            <Heading size={'xs'}>{`Search Gecko Coin's`}</Heading>
            <CWindowedSelect
              isMulti
              placeholder="Gecko search..."
              value={geckoSearchValue}
              onInputChange={(e) => setOptSearch(e.charAt(0).toUpperCase())}
              onMenuClose={() => setOptSearch('0')}
              onChange={(e: any) => {
                setIsActive(true)
                dispatch(setComp({ geckoSearchValue: e }))
                !e.length && setIsActive(false)
              }}
              options={(geckoCoinsQuery.data?.[optSearch] ?? []).map(
                (x: any) => ({
                  label: `${x.symbol.toUpperCase()} / ${x.name}`,
                  value: x.id,
                })
              )}
            />

            <SlideFade
              unmountOnExit
              in={!geckoSearchQuery.isLoading && isActive}
            >
              <Stack>
                <Divider />
                <HStack justify={'space-between'}>
                  <Heading size={'xs'}>Results</Heading>
                  {!!id ? (
                    <TrackResults />
                  ) : (
                    <Button size={'xs'} as={Link} href="/login">
                      Login To Track
                    </Button>
                  )}
                </HStack>
                <Divider />
              </Stack>

              <Wrap align={'center'} justify={'center'} spacing={3} pt={3}>
                {(geckoSearchQuery.data || []).map((item, index) => (
                  <Market key={index} data={item} />
                ))}
              </Wrap>
            </SlideFade>
          </SlideFade>
        )
      })()}
    </Stack>
  )
}
