'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { TickerMarque } from '@/components'
import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  StackProps,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import Link from 'next/link'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { ProfileIcon, StockIcon } from '../components/ui'
import { useAppSelector } from '@/lib/store'
import { useIsHydrated } from '@/hooks'

export default function Navbar({ ...styles }: StackProps) {
  const clientLoc = usePathname()
  const { colorMode, toggleColorMode } = useColorMode()

  const initalColor = colorMode === 'dark' ? 'white' : 'black'
  const auth = useAppSelector((state) => state.auth)

  const isHydradet = useIsHydrated()
  const isLoggedIn = !!auth.id
  const isAdmin = auth.role === 'admin'

  const MapOptions = useMemo(() => {
    const navOptions = ({ size }: { size: number }) => {
      let result: any[] = [
        {
          name: 'markets',
          path: '/',
          icon: (
            <StockIcon
              w={size}
              fill={clientLoc === `/` ? 'blue.300' : initalColor}
            />
          ),
        },
      ]

      if (!isHydradet) return result

      if (!isLoggedIn) {
        result[2] = {
          path: '/login',
          icon: (
            <Heading size={'xs'} p={2}>
              Login
            </Heading>
          ),
        }
      } else {
        result[2] = {
          name: 'profile',
          path: '/profile',
          icon: (
            <ProfileIcon
              w={size}
              fill={clientLoc === `/profile` ? 'blue.300' : initalColor}
            />
          ),
        }
        if (isAdmin)
          result[3] = {
            name: 'panel',
            path: '/panel',
            icon: <Image w={size} aria-label="Panel" src="keypad.svg" />,
          }
      }
      return result
    }

    return navOptions({ size: 6 }).map((x, index) => (
      <Link key={index} href={x.path}>
        <Flex
          flexDirection={'column'}
          align="center"
          color={clientLoc === x.path ? 'blue.300' : initalColor}
          fontWeight={550}
          bg={colorMode === 'light' ? 'gray.100' : 'whiteAlpha.200'}
          p={1.5}
          borderRadius="1rem"
        >
          {x.icon}
          {!!x.name && <Text fontSize="xs">{x.name}</Text>}
        </Flex>
      </Link>
    ))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydradet, clientLoc, isAdmin, isLoggedIn, colorMode])

  return (
    <Stack
      boxShadow={`0 0 10px ${
        colorMode === 'light'
          ? 'rgb(125, 125, 125, 0.2)'
          : 'rgb(250, 250, 250, 0.1)'
      }`}
      borderBottom={'1px solid'}
      borderColor={'whiteAlpha.400'}
      {...styles}
    >
      <HStack spacing={5} p={2} justify={'center'}>
        <Link href={'/'}>
          <Image src={'crossify-logo.svg'} w={50} alt="Crossify Logo" />
        </Link>
        <Button size={'sm'} onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
        {MapOptions}
      </HStack>
      <TickerMarque />
    </Stack>
  )
}
