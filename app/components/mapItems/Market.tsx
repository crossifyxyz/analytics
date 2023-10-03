import { toggleToSelectedGeckoCoins } from '@/lib/store'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import {
  HStack,
  Image,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'

export default function Market({
  data,
  editing,
  selected,
  dispatch,
}: {
  data: GeckoMarketResult
  editing?: boolean
  selected?: boolean
  dispatch?: Dispatch
}) {
  const {
    id,
    symbol,
    image,
    current_price,
    ath,
    market_cap,
    total_volume,
    interest,
    max_supply,
    total_supply,
    circulating_supply,
  } = data
  const percentageChanges = [
    'price_change_percentage_1h_in_currency',
    'price_change_percentage_24h_in_currency',
    'price_change_percentage_7d_in_currency',
  ]
  const ticker = symbol.toUpperCase()
  function convertToInternationalCurrencySystem(
    value: string | number | undefined
  ) {
    // Nine Zeroes for Billions
    return Math.abs(Number(value)) >= 1.0e9
      ? (Math.abs(Number(value)) / 1.0e9).toFixed(2) + 'B'
      : // Six Zeroes for Millions
      Math.abs(Number(value)) >= 1.0e6
      ? (Math.abs(Number(value)) / 1.0e6).toFixed(2) + 'M'
      : // Three Zeroes for Thousands
      Math.abs(Number(value)) >= 1.0e3
      ? (Math.abs(Number(value)) / 1.0e3).toFixed(2) + 'K'
      : Math.abs(Number(value)).toFixed(5)
  }
  const shadowColor = useColorModeValue(
    'rgba(0, 0, 0, 0.05)',
    'rgb(250, 250, 250, 0.05)'
  )

  return (
    <TableContainer
      cursor={!editing ? 'default' : 'grab'}
      onClick={() =>
        editing && !!dispatch ? dispatch(toggleToSelectedGeckoCoins(id)) : null
      }
      p={1}
      maxW={140}
      borderRadius={'1rem'}
      boxShadow={`0px 0px 4px 4px ${
        !editing ? shadowColor : !selected ? '#5C7CC0' : '#D39A41'
      }`}
      border={'1px solid'}
      borderColor={'whiteAlpha.400'}
    >
      <Table size="xs">
        <Thead>
          <Tr>
            <Th
              fontSize={10}
              color={'current'}
              textAlign="center"
              borderBottomWidth={2}
              borderBottomColor={'current'}
            >
              <Stack spacing={0} align={'center'}>
                <HStack>
                  <Text
                    cursor={'grab'}
                    onClick={() =>
                      window.confirm('Open CoinGecko ' + ticker + ' Link?') &&
                      window.open('https://www.coingecko.com/en/coins/' + id)
                    }
                    color={'twitter.500'}
                  >
                    {ticker}
                  </Text>
                  <Image
                    backgroundColor={'white'}
                    borderRadius={'full'}
                    h={5}
                    src={image}
                    alt={id + '-img'}
                  />
                </HStack>
                {!!current_price && <Text>${current_price.toFixed(5)}</Text>}
                <Text>Ath ${convertToInternationalCurrencySystem(ath)}</Text>
              </Stack>
            </Th>
          </Tr>
        </Thead>
        <Tbody fontSize={10} fontWeight={'bold'}>
          {!!market_cap && (
            <Tr>
              <Td textAlign="center">
                Cap {convertToInternationalCurrencySystem(market_cap)}
              </Td>
            </Tr>
          )}
          {!!total_volume && (
            <Tr>
              <Td textAlign="center">
                Vol ${convertToInternationalCurrencySystem(total_volume)}
              </Td>
            </Tr>
          )}
          {!!interest && (
            <Tr>
              <Td textAlign="center">
                Int {convertToInternationalCurrencySystem(interest)}
              </Td>
            </Tr>
          )}
          {/* @ts-ignore */}
          {!percentageChanges.every((i) => !data?.[i]) && (
            <Tr>
              <Td display={'flex'} flexDirection={'column'}>
                {percentageChanges.map((m, index) => {
                  /* @ts-ignore */
                  const value = data?.[m]
                  if (!!value)
                    return (
                      <HStack key={index} m={'auto'}>
                        <Text>
                          {m.substring(24, 27).replace('_', '')} %
                          {value.toFixed(0)}
                        </Text>
                        {value > 0 ? (
                          <TriangleUpIcon color={'green.300'} boxSize={3} />
                        ) : (
                          <TriangleDownIcon color={'red.300'} boxSize={3} />
                        )}
                      </HStack>
                    )
                })}
              </Td>
            </Tr>
          )}
          {!!max_supply && (
            <Tr>
              <Td textAlign="center">
                Max {convertToInternationalCurrencySystem(max_supply)}
              </Td>
            </Tr>
          )}
          {!!total_supply && (
            <Tr>
              <Td textAlign="center">
                Total {convertToInternationalCurrencySystem(total_supply)}
              </Td>
            </Tr>
          )}
          {!!circulating_supply && (
            <Tr>
              <Td textAlign="center">
                Circ {convertToInternationalCurrencySystem(circulating_supply)}
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
