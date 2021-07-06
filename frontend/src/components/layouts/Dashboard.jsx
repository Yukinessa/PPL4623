import { Box, Center, Flex, Spinner } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { NavbarDashboard, Sidebar } from "../molecules"
import { StateContext } from "../../store"
import { getCurrentUser } from "../../api/user"

function Dashboard(props) {
  const [, dispatch] = useContext(StateContext)
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const GetCurrentUser = async () => {
      const result = await getCurrentUser()
      if (result.success) {
        setLoading(false)
        dispatch({ type: "SET_CURRENT_USER", payload: result.data })
        dispatch({ type: "SET_STATUS", payload: "authenticated" })
      }
    }
    GetCurrentUser()
  }, [])
  return (
    <>
      {isLoading ? (
        <Center h="100vh">
          <Spinner thickness="5px" speed="1s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Center>
      ) : (
        <Flex direction="column">
          <Flex mt="52px">
            <Sidebar display={["none", null, "flex"]} />
            <Flex ml={["none", null, "17%"]} overflow="auto" w="full" as="main">
              <Box h="100vh" w="full" bg="gray.50" px={["3", "6"]} py="8">
                {props.children}
              </Box>
            </Flex>
          </Flex>
          <NavbarDashboard />
        </Flex>
      )}
    </>
  )
}

export default Dashboard
