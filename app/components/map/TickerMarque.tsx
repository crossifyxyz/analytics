import Marquee from 'react-fast-marquee'
import {
  Stat,
  StatNumber,
  StatArrow,
  HStack,
  Image,
  Text,
  Link,
} from '@chakra-ui/react'
import { useGetGeckoMarqueMarketsQuery } from '@/lib/store'
import { memo } from 'react'

const TickerMarque = memo(function TickerMarque() {
  const { isLoading, data } = useGetGeckoMarqueMarketsQuery({})
  return (
    <Marquee gradient={false} speed={5} pauseOnHover>
      {!isLoading &&
        (data ?? []).map((i, index) => {
          const ticker = i.symbol.toUpperCase()
          return (
            <Stat key={index} ml={5}>
              <HStack spacing={1} align={'center'}>
                <Text
                  as={Link}
                  fontSize={'xs'}
                  onClick={() =>
                    window.confirm('Open CoinGecko ' + ticker + ' Link?') &&
                    window.open('https://www.coingecko.com/en/coins/' + i.id)
                  }
                >
                  {ticker}
                </Text>
                <Image
                  backgroundColor={'white'}
                  borderRadius={'full'}
                  h={4}
                  src={i.image}
                  alt={i.id + 'ticker-image'}
                />
              </HStack>
              <StatNumber fontSize={'xs'}>
                ${!!i.current_price && i.current_price.toFixed(2)}
              </StatNumber>
              <HStack spacing={0} align={'center'}>
                <StatArrow
                  type={
                    i.price_change_percentage_24h_in_currency < 0
                      ? 'decrease'
                      : 'increase'
                  }
                />
                <Text fontSize={'xs'}>
                  {!!i.price_change_percentage_24h_in_currency &&
                    i.price_change_percentage_24h_in_currency.toFixed(2)}
                  %
                </Text>
              </HStack>
            </Stat>
          )
        })}
    </Marquee>
  )
})

export default TickerMarque
