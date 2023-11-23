import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/styles/theme/theme'
import FadeIn from '@/components/layout/FadeIn'

function MyApp({ Component, pageProps }) {
  return (
    <FadeIn>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </FadeIn>
  )
}

export default MyApp
