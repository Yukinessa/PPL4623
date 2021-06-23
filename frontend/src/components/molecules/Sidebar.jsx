import { Stack, Divider, Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react"
import { ViewGridIcon, ClipboardListIcon, DesktopComputerIcon, CubeIcon, LogoutIcon } from "@heroicons/react/outline"
import { Link, useLocation } from "react-router-dom"

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

const SidebarLink = () => {
  const { pathname } = useLocation()
  return (
    <Stack spacing="1" w="full" py="6" px="2">
      {menus.map((menu, index) => (
        <Link to={menu.path} key={index}>
          <HStack
            px="4"
            py="2"
            fontWeight="medium"
            color={menu.path === pathname ? "blue.500" : "gray.600"}
            _hover={{
              background: "gray.50",
            }}
          >
            <Icon as={menu.icon} mr="2" />
            <Text fontSize="sm" fontWeight="semibold">
              {menu.name}
            </Text>
          </HStack>
        </Link>
      ))}
    </Stack>
  )
}

const Sidebar = (props) => {
  return (
    <Flex pos="fixed" w="17%" h="full" bg={"white"} overflow="auto" {...props}>
      <VStack w="full">
        <Divider />
        <SidebarLink />
      </VStack>
    </Flex>
  )
}

export default Sidebar
