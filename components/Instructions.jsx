import React from 'react'
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
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
            <ListIcon as={FaChevronCircleRight} color='black.500' />
            2. Make sure that the same amount of jwebURLs and elevateURLs is
            inserted into both text areas.
          </ListItem>
          <ListItem>
            <ListIcon as={FaChevronCircleRight} color='black.500' />
            3. If you encounter any bug, please report it or create a github
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
      </Container>
    </Box>
  )
}

export default Instructions
