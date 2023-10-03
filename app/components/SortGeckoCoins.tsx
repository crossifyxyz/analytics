import { setIndicatorSortPorps, useAppSelector } from '@/lib/store'
import { Button, Center, Heading, Switch, Text, Wrap } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { Pagination } from './ui'

export default function SortGeckoCoins() {
  const dispatch = useDispatch()

  const { indicatorSortPorps, trackedGeckoCoinsLength } = useAppSelector(
    (state) => ({
      indicatorSortPorps: state.comp.indicatorSortPorps,
      trackedGeckoCoinsLength: state.user.trackedGeckoCoins?.length,
    })
  )

  const { sortBy, perPage, page, desc } = indicatorSortPorps

  return (
    <>
      <Wrap align={'center'} justify={'center'} p={3}>
        <Heading size={'xs'}>Sort by</Heading>
        {[
          { title: 'Market Cap', value: 'market_cap' },
          {
            title: '1h Change',
            value: 'price_change_percentage_1h_in_currency',
          },
          {
            title: '24h Change',
            value: 'price_change_percentage_24h_in_currency',
          },
          {
            title: '7dh Change',
            value: 'price_change_percentage_7d_in_currency',
          },
          { title: '24h Volume', value: 'total_volume' },
          { title: 'Max Supply', value: 'max_supply' },
          { title: 'Circ Supply', value: 'total_supply' },
        ].map((i) => (
          <Center gap={2} key={i.value}>
            <Button
              colorScheme={sortBy === i.value ? 'blue' : 'gray'}
              size={'xs'}
              onClick={() =>
                dispatch(
                  setIndicatorSortPorps({
                    sortBy: i.value,
                  })
                )
              }
            >
              {i.title}
            </Button>
            <Heading size={'md'}>|</Heading>
          </Center>
        ))}
        <Text>Reverse</Text>
        <Switch
          isChecked={!desc}
          onChange={() => dispatch(setIndicatorSortPorps({ desc: !desc }))}
          size="md"
        />
      </Wrap>
      <Pagination
        total={trackedGeckoCoinsLength || 50}
        perPage={perPage}
        page={page}
        setPage={(page) => {
          dispatch(setIndicatorSortPorps({ page: page }))
        }}
        setPerPage={(perPage) => {
          dispatch(
            setIndicatorSortPorps({
              perPage: perPage,
              page: 1,
            })
          )
        }}
      />
    </>
  )
}
