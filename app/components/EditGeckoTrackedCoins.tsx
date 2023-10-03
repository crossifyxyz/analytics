import { setComp, setUser, useAppSelector } from '@/lib/store'
import { usePatchUserTrackedGeckoCoinsMutation } from '@/lib/store'
import {
  Button,
  HStack,
  SlideFade,
  Stack,
  Switch,
  Tag,
  Text,
  useColorModeValue,
  Wrap,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { AvatarSpinner } from './ui'

export default function EditGeckoTrackedCoins() {
  const dispatch = useDispatch()
  const {
    id,
    editingTrackedGeckoCoins,
    selectedGeckoCoins,
    trackedGeckoCoinsLength,
  } = useAppSelector((state) => ({
    id: state.auth.id,
    editingTrackedGeckoCoins: state.comp.editingTrackedGeckoCoins,
    selectedGeckoCoins: state.comp.selectedGeckoCoins,
    trackedGeckoCoinsLength: state.user.trackedGeckoCoins.length,
  }))

  const shadowColor = useColorModeValue(
    'rgb(125, 125, 125, 0.2)',
    'rgb(250, 250, 250, 0.1)'
  )
  const [patchTrackedGeckoCoins, trackedGeckoCoinsResult] =
    usePatchUserTrackedGeckoCoinsMutation()

  const StopTracking = () => (
    <Button
      spinner={<AvatarSpinner />}
      isLoading={trackedGeckoCoinsResult.isLoading}
      onClick={() => {
        patchTrackedGeckoCoins({
          id,
          selectedGeckoCoins,
          type: 'pull',
        }).then((res: any) => {
          dispatch(
            setUser({
              trackedGeckoCoins: res.data,
            })
          )
          dispatch(setComp({ selectedGeckoCoins: [] }))
          dispatch(
            setComp({
              editingTrackedGeckoCoins: !editingTrackedGeckoCoins,
            })
          )
        })
      }}
      colorScheme={'orange'}
      size={'xs'}
    >
      Stop Tracking
    </Button>
  )

  return (
    <SlideFade unmountOnExit in={!!id && !!trackedGeckoCoinsLength}>
      <HStack
        spacing={3}
        p={3}
        borderRadius={10}
        boxShadow={`0 0 10px ${shadowColor}`}
        border={'1px solid'}
        borderColor={'whiteAlpha.400'}
      >
        <Stack>
          <HStack>
            <Text>Edit</Text>
            <Switch
              isChecked={editingTrackedGeckoCoins}
              onChange={() => {
                dispatch(
                  setComp({
                    editingTrackedGeckoCoins: !editingTrackedGeckoCoins,
                  })
                )
                !editingTrackedGeckoCoins &&
                  dispatch(setComp({ selectedGeckoCoins: [] }))
              }}
              size="md"
            />
          </HStack>
        </Stack>
        <SlideFade unmountOnExit in={editingTrackedGeckoCoins}>
          <Stack
            spacing={2}
            p={3}
            borderRadius={10}
            boxShadow={`0 0 10px ${shadowColor}`}
            border={'1px solid'}
            borderColor={'whiteAlpha.400'}
          >
            <SlideFade unmountOnExit in={!selectedGeckoCoins.length}>
              <Text size={'xs'}>Please select the coins below</Text>
            </SlideFade>
            <SlideFade unmountOnExit in={!!selectedGeckoCoins.length}>
              <Wrap justify={'center'}>
                <Text size={'xs'}>Selected Coins</Text>
                {selectedGeckoCoins.map((i) => (
                  <Tag key={i} size={'sm'}>
                    {i}
                  </Tag>
                ))}
                <StopTracking />
              </Wrap>
            </SlideFade>
          </Stack>
        </SlideFade>
      </HStack>
    </SlideFade>
  )
}
