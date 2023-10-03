import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const fonts = {
  mono: "'Menlo', monospace",
}

export const themeColors = {
  bg: {
    light: '#FDFDFF',
    dark: '#1A202C',
  },
}

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const styles = {
  global: (props: any) => ({
    body: {
      bg: mode(themeColors.bg.light, themeColors.bg.dark)(props),
    },
  }),
}

const colors = {
  uniGreen: '#39DE1F',
}

const theme = extendTheme({
  config,
  fonts,
  styles,
  colors,
})

export default theme
