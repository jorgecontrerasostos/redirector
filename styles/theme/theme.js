import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  },
  colors: {
    light: {
      background: 'gray.300' // Light mode background color
    },
    dark: {
      background: 'blackAlpha.100', // Dark mode background color
      overriddenBackground: 'blackAlpha.100' // Override the dark mode background color
    },
    customSwitchColors: {
      200: '#13B0CF'
    }
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('light.background', 'dark.overriddenBackground')(props), // Use overridden background color for dark mode
        color: mode('black', 'white')(props)
      }
    })
  }
})

export default theme
