'use client'

import { HStack, Image, StackProps, useColorModeValue } from '@chakra-ui/react'

export default function Footer({ ...styles }: StackProps) {
  const bgColor = useColorModeValue(
    'rgb(125, 125, 125, 0.2)',
    'rgb(250, 250, 250, 0.1)'
  )
  return (
    <HStack
      fontSize={10}
      spacing={5}
      boxShadow={`0 0 10px ${bgColor}`}
      borderTop={'1px solid'}
      borderColor={'whiteAlpha.400'}
      p={4}
      justify={'center'}
      {...styles}
    >
      <Image
        p={1}
        borderRadius={30}
        backgroundColor={'green.100'}
        h={46}
        src={'coingecko.svg'}
        alt="Gecko Logo"
      />
    </HStack>
  )
}
