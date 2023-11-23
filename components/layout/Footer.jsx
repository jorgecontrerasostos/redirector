import { Box, Text, Container, Divider } from '@chakra-ui/react'
const Footer = () => {
  return (
    <Box as={Container} maxWidth='4xl' p={4}>
      <Divider borderColor='gray.300' w='100%' mb={4} />
      <Text textAlign='center'>Made by Jorge Contreras</Text>
    </Box>
  )
}

export default Footer
