import { useColorMode, Switch } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const SwitchColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <motion.div whileHover={{ scale: 1.2 }}>
      <Switch
        isChecked={colorMode === 'dark'}
        onChange={toggleColorMode}
        colorScheme='customSwitchColors'
        boxSize={6}
      />
    </motion.div>
  )
}

export default SwitchColorMode
