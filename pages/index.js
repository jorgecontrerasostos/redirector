import Head from 'next/head'
import {
  Heading,
  Flex,
  Text,
  Center,
  Button,
  VStack,
  Box,
  Textarea
} from '@chakra-ui/react'
import Layout from '@/components/layout/Layout'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'

const redirector = (jwebURLs, elevateUrls) => {
  try {
    if (jwebURLs.length !== elevateUrls.length) {
      throw new Error('The number of urls must match')
    }

    let finalUrls = []
    for (let i = 0; i < jwebURLs.length; i++) {
      const domain = jwebURLs[i].split('.')[1]
      let topLevelDomain = jwebURLs[i].split('.')[2]
      topLevelDomain = topLevelDomain.split('/')[0]
      const jwebSlug = jwebURLs[i].split('.')[2].replace(topLevelDomain, '')

      if (elevateUrls[i]) {
        const elevateSlug = elevateUrls[i].split('justia.site')[1]
        if (elevateSlug) {
          finalUrls.push(
            `RewriteRule ^/?(amp/)?${jwebSlug}.html$ https://www.${domain}.${topLevelDomain}/$1${elevateSlug} [R=301,L]\n`
          )
        }
      }
    }
    // Use map to transform each URL individually
    finalUrls = finalUrls.map((url) =>
      url.replace('$1/', '$1').replace('?/', '?')
    )

    // Join the array into a single string
    return finalUrls.join('')
  } catch (error) {
    console.error('Error in redirector function:', error.message)
    return 'Error generating redirects'
  }
}
export default function Home() {
  const toast = useToast()
  const [jwebUrls, setJwebUrls] = useState('')
  const [elevateUrls, setElevateUrls] = useState('')
  const [result, setResult] = useState('')

  const handleInputChange = () => {
    try {
      if (jwebUrls.length === 0 || elevateUrls.length === 0) {
        toast({
          title: 'Oops',
          description: 'Please enter some URLs',
          status: 'error',
          duration: 5000,
          isClosable: true
        })
      } else {
        const jwebArray = jwebUrls
          .split('\n')
          .filter((url) => url.trim() !== '')
        const elevateArray = elevateUrls
          .split('\n')
          .filter((url) => url.trim() !== '')
        const generatedResult = redirector(jwebArray, elevateArray)
        setResult(generatedResult)
      }
    } catch (error) {
      setResult(`Error: ${error.message}`)
    }
  }

  const clearTextAreas = () => {
    setJwebUrls('')
    setElevateUrls('')
    setResult('')
  }

  return (
    <>
      <Head>
        <title>Redirector</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        {' '}
        <Center>
          <Heading>Redirector</Heading>
        </Center>
        <Text textAlign='center'>Lorem Ipsum Dolor sit Amet</Text>
        <Flex
          gap={6}
          direction={['column', 'column', 'row']}
          p={8}
          justifyContent='space-between'
        >
          <VStack w='100%' h='100%'>
            {' '}
            <Textarea
              value={jwebUrls}
              onChange={(e) => setJwebUrls(e.target.value)}
              placeholder='jWeb URLs go here'
              h='550px'
            />
            <Button colorScheme='teal' mt={2} onClick={clearTextAreas}>
              Clear Text Areas
            </Button>
          </VStack>
          <VStack w='100%'>
            <Textarea
              placeholder='elevate URLs go here'
              value={elevateUrls}
              onChange={(e) => setElevateUrls(e.target.value)}
              h='550px'
            />
            <Button colorScheme='red' mt={2} onClick={handleInputChange}>
              Generate Redirects
            </Button>
          </VStack>
          <VStack w='100%'>
            <Box
              bg='transparent'
              w='100%'
              borderRadius='lg'
              borderColor='gray.200'
              borderWidth={1}
              p={2}
              h='550px'
            >
              {result.length > 0 ? (
                result
              ) : (
                <Text>redirects will appear here... hopefully</Text>
              )}
            </Box>
            <CopyToClipboard
              text={result}
              onCopy={() => {
                toast({
                  title: 'Redirects Copied',
                  status: 'info',
                  duration: 5000,
                  isClosable: true
                })
              }}
            >
              <Button colorScheme='blue' mt={2}>
                Copy Redirects
              </Button>
            </CopyToClipboard>
          </VStack>
        </Flex>
      </Layout>
    </>
  )
}
