import React from 'react'
import { Input } from '@chakra-ui/react'

const InputArea = ({ placeholder, height, bgColor, id }) => {
  return (
    <Input
      placeholder={placeholder}
      backgroundColor={bgColor}
      resize='none'
      id={id}
      readOnly={id === 'finalURLs' ? true : false}
      maxH='200pxju'
      maxWidth='100%'
    />
  )
}

export default InputArea
