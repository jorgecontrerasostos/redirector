import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { Icon } from '@chakra-ui/react'

const GithubIcon = () => {
  return (
    <motion.div whileHover={{ scale: 1.2 }}>
      <Icon as={FaGithub} boxSize={8} />
    </motion.div>
  )
}

export default GithubIcon
