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
import Instructions from '@/components/Instructions'
import { saveAs } from 'file-saver'

export default function Home() {
  const toast = useToast()
  const [jwebUrls, setJwebUrls] = useState('')
  const [elevateUrls, setElevateUrls] = useState('')
  const [result, setResult] = useState('')
  const [domain, setDomain] = useState('')

  /**
   *
   * @param {*} jwebURLs - Origin Jweb URLs
   * @param {*} elevateURLs - Target Elevate URLs
   * @returns - Final Redirects to be added to the new Elevate Website
   * @description - Function to generate redirects from Jweb to Elevate
   */
  const redirector = (jwebURLs, elevateURLs) => {
    try {
      let finalRedirects = []
      let domain = ''
      for (let i = 0; i < jwebURLs.length; i++) {
        domain = jwebURLs[i].split('.')[1]
        let topLevelDomain = jwebURLs[i].split('.')[2]
        topLevelDomain = topLevelDomain.split('/')[0]
        const jwebSlug = jwebURLs[i].split('.')[2].replace(topLevelDomain, '')

        if (elevateURLs[i]) {
          const elevateSlug = elevateURLs[i].split('justia.site')[1]
          if (elevateSlug) {
            finalRedirects.push(
              `RewriteRule ^/?(amp/)?${jwebSlug}.html$ https://www.${domain}.${topLevelDomain}/$1${elevateSlug} [R=301,L]`
            )
          }
        }
      }
      // Replacing some bits of the redirect that come out wrong. May need to refactor this.
      finalRedirects = finalRedirects.map((url) =>
        url.replace('$1/', '$1').replace('?/', '?')
      )

      return finalRedirects.join('\n', domain)
    } catch (error) {
      console.error('Error in redirector function:', error.message)
      return 'Error generating redirects'
    }
  }
  /**
   *
   * @description - Function that downloads the generated redirects to a text file.
   */
  const downloadFile = () => {
    try {
      if (!domain) {
        toast({
          title: 'Oops',
          description:
            'Cannot determine domain. Please generate redirects first.',
          status: 'warning',
          duration: 3000,
          isClosable: true
        })
      } else {
        // Creating a file name
        const today = new Date()

        //Adding the Date when the file was created to the file name.
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour12: false
        }
        const formatedDate = new Intl.DateTimeFormat('en-us', options)

        // Creating the file name
        const fileName = `${domain}-redirects_${formatedDate.format(today)}.txt`

        // Creating the file content using Blob Class
        const blob = new Blob([result], { type: 'text/plain;charset=utf-8' })
        saveAs(blob, fileName)

        toast({
          title: 'Redirects Downloaded',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
      }
    } catch (error) {
      toast({
        title: 'Oops',
        description: `Error downloading redirects: ${error.message}`,
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }
  /**
   * @description - Function that handles all input changes on the Text Areas
   */
  const handleInputChange = () => {
    try {
      const jwebArray = jwebUrls.split('\n').filter((url) => url.trim() !== '')
      const elevateArray = elevateUrls
        .split('\n')
        .filter((url) => url.trim() !== '')
      if (jwebArray.length === 0 && elevateArray.length === 0) {
        toast({
          title: 'Oops',
          description: 'Please enter some URLs',
          status: 'warning',
          duration: 3000,
          isClosable: true
        })
      } else if (jwebArray.length !== elevateArray.length) {
        toast({
          title: 'Oops',
          description: 'The number of urls must match',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      } else if (jwebArray.length == elevateArray.length) {
        const domainMatch = jwebArray[0].match(
          /(?:https?:\/\/)?(?:www\.)?([^\/]+)/i
        )
        setDomain(domainMatch ? domainMatch[1] : '')
        const generatedResult = redirector(jwebArray, elevateArray)
        setResult(generatedResult)
      }
    } catch (error) {
      setResult(`Error: ${error.message}`)
    }
  }
  /**
   * @description - Function that clears the text areas.
   */
  const clearTextAreas = () => {
    setJwebUrls('')
    setElevateUrls('')
    setResult('')
  }

  return (
    <>
      <Head>
        <title>Redirector</title>
        <meta
          name='description'
          content='Redirector app to create redirects from Jweb sites to Elevate sites'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        {' '}
        <Center>
          <Heading>Redirector</Heading>
        </Center>
        <Instructions />
        <Flex
          gap={6}
          direction={['column', 'column', 'column', 'row', 'row', 'row']}
          p={8}
          justifyContent='space-between'
        >
          <VStack w='100%' h='100%'>
            {' '}
            <Textarea
              value={jwebUrls}
              onChange={(e) => setJwebUrls(e.target.value)}
              placeholder='jWeb URLs go here'
              h='500px'
              _focus={{ borderColor: 'teal' }}
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
              h='500px'
              _focus={{ borderColor: 'red' }}
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
              h='500px'
              overflowY='scroll'
              whiteSpace='pre-line'
            >
              {result.length > 0 ? (
                result
              ) : (
                <Text color='gray.600'>
                  redirects will appear here... hopefully
                </Text>
              )}
            </Box>
            <Flex alignItems='baseline' justifyContent='center' gap={4}>
              <CopyToClipboard
                text={result}
                onCopy={() => {
                  toast({
                    title: 'Redirects Copied',
                    status: 'success',
                    duration: 3000,
                    isClosable: true
                  })
                }}
              >
                <Button colorScheme='blue' mt={2}>
                  Copy Redirects
                </Button>
              </CopyToClipboard>
              <Button onClick={downloadFile}>Download Redirects</Button>
            </Flex>
          </VStack>
        </Flex>
      </Layout>
    </>
  )
}
