import { Flex, Text } from "@chakra-ui/react"

function Footer() {
  const year = new Date().getFullYear()
  return (
    <Flex as="footer" direction="column" bg="white" px={["4", "16", "36"]} pt="8" pb="6">
      <Text textAlign="center" fontSize="sm" fontWeight="semibold" color="gray.600">
        &copy; {year} Game Developer Connect. All Right Reserved.
      </Text>
    </Flex>
  )
}

export default Footer
