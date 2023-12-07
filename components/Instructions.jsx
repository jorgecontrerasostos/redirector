import React from 'react'
import {
  List,
  ListItem,
  ListIcon,
  Text,
  Heading,
  Box,
  Container,
  Link
} from '@chakra-ui/react'
import { FaChevronCircleRight } from 'react-icons/fa'

const Instructions = () => {
  return (
    <Box mt={4}>
      <Heading as='h2' fontSize='2xl' textAlign='center'>
        Instructions
      </Heading>
      <Container maxW='6xl' mt={2} textAlign='lef'>
        <List>
          <ListItem>
            <ListIcon as={FaChevronCircleRight} color='black.500' />
            1. Make sure that every jwebURL is aligned with its elevateURL
            counterpart since the tool compares the same indexes on both text
            areas.
          </ListItem>
          <ListItem>
            <ListIcon as={FaChevronCircleRight}>
              2. Use the live jweb URL and the Elevate .site URL on their
              corresponding text areas.
            </ListIcon>
          </ListItem>
          <ListItem>
            <ListIcon as={FaChevronCircleRight} color='black.500' />
            3. Make sure that the same amount of jwebURLs and elevateURLs is
            inserted into both text areas.
          </ListItem>
          <ListItem>
            <ListIcon as={FaChevronCircleRight} color='black.500' />
            4. If you encounter any bug, please report it or create a github
            issue{' '}
            <Link
              href='https://github.com/jorgecontrerasostos/redirector'
              target='_blank'
              color='blue.500'
              as='a'
            >
              here
            </Link>
            .
          </ListItem>
        </List>
        <Text as='small'>
          Please not the tool does <strong>NOT</strong> support subdomain URLs
          just yet.
        </Text>
      </Container>
    </Box>
  )
}

export default Instructions
