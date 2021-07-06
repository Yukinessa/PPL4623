import { useContext } from "react"
import { Stack, Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react"
import { ViewGridIcon, ClipboardListIcon, DesktopComputerIcon, CubeIcon, LogoutIcon } from "@heroicons/react/outline"
import { Link, useLocation } from "react-router-dom"
import { StateContext } from "../../store"

const menus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: ViewGridIcon,
    roles: ["publisher", "designer"],
  },
  {
    name: "Publisher",
    path: "/publisher",
    icon: DesktopComputerIcon,
    roles: ["designer"],
  },
  {
    name: "Appointment",
    path: "/appointment",
    icon: ClipboardListIcon,
    roles: ["publisher", "designer"],
  },
  {
    name: "Project",
    path: "/project",
    icon: CubeIcon,
    roles: ["designer"],
  },
  {
    name: "Logout",
    path: "/logout",
    roles: ["publisher", "designer"],
    icon: LogoutIcon,
  },
]

const SidebarLink = (props) => {
  const { pathname } = useLocation()
  const { role } = props
  return (
    <Stack spacing="1" w="full" py="2" px="2">
      {menus.map((menu, index) => (
        <Stack key={index}>
          {menu.roles.indexOf(role) > -1 && (
            <Link to={menu.path}>
              <HStack
                px="4"
                py="2"
                fontWeight={menu.path === pathname ? "semibold" : "medium"}
                color={menu.path === pathname ? "blue.500" : "gray.600"}
                _hover={{
                  background: "gray.50",
                }}
              >
                <Icon as={menu.icon} mr="2" />
                <Text fontSize="sm">{menu.name}</Text>
              </HStack>
            </Link>
          )}
        </Stack>
      ))}
    </Stack>
  )
}

const Sidebar = (props) => {
  const [state] = useContext(StateContext)
  return (
    <Flex pos="fixed" w="17%" h="full" bg={"white"} overflow="auto" {...props}>
      <VStack w="full">
        <Stack w="full" direction="row" pt="12" px="7" spacing="0" alignItems="self-start">
          <Stack direction="column" spacing="0">
            <Text fontSize="md" color="gray.600" fontWeight="bold">
              {state.currentUser.name}
            </Text>
            <Text fontSize="sm" fontWeight="normal" textTransform="capitalize" color="gray.500">
              {state.currentUser.role}
            </Text>
          </Stack>
        </Stack>
        <SidebarLink role={state.currentUser.role} />
      </VStack>
    </Flex>
  )
}

export default Sidebar
