import { Flex, Heading, Button } from "@chakra-ui/react"
import { getToken } from "../../helpers/token"
import { Link, useHistory } from "react-router-dom"

function Dekstop(props) {
  const history = useHistory()
  return (
    <Flex
      as="nav"
      bg="white"
      px={["4", "16", "36"]}
      py="3"
      justify="space-between"
      pos="fixed"
      direction="row"
      boxShadow="md"
      w="full"
    >
      <Flex direction="column" alignSelf="center">
        <Link to="/">
          <Heading color="blue.500">gdc.</Heading>
        </Link>
      </Flex>
      <Flex alignSelf="center">
        {getToken() && (
          <Link to="/dashboard">
            <Button variant="outline" colorScheme="blue" size="sm" fontSize="xs">
              Dashboard
            </Button>
          </Link>
        )}
        {!getToken() && (
          <>
            <Button variant="outline" colorScheme="blue" size="sm" fontSize="xs" onClick={() => history.push("signin")}>
              Sign In
            </Button>
            <Button
              ml="4"
              display={["none", "flex"]}
              size="sm"
              fontSize="xs"
              colorScheme="blue"
              onClick={() => history.push("signup")}
            >
              Sign Up
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  )
}

export default Dekstop
