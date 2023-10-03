'use client'

import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/lib/styles/theme'
import AppProvider from './appContext'
import ReduxProvider from '@/lib/store/ReduxProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ChakraProvider theme={theme}>
        <AppProvider>{children}</AppProvider>
      </ChakraProvider>
    </ReduxProvider>
  )
}

export * from './appContext'
