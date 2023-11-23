import React from 'react'
import {
  Box,
  Container,
  Flex,
  Spacer,
  Icon,
  Link,
  Text
} from '@chakra-ui/react'
import SwitchColorMode from '../SwitchColorMode'
import GithubIcon from '../GithubIcon'

const Navbar = () => {
  return (
    <Box as={Container} maxWidth='4xl' p={4}>
      <Flex as='nav'>
        <Text as='strong' fontSize='2xl' letterSpacing='tight'>
          <Link
            as='a'
            href='https://www.justia.com/'
            target='_blank'
            _hover={{ textDecor: 'none' }}
          >
            Powered by JUSTIA
          </Link>
        </Text>
        <Spacer />
        <Flex gap={8} alignItems='center'>
          <Link
            href='https://github.com/jorgecontrerasostos/redirector'
            target='_blank'
          >
            {' '}
            <GithubIcon />
          </Link>
          <SwitchColorMode boxSize={8} />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar
