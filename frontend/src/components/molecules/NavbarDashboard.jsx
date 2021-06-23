import { Link } from "react-router-dom"
import { useRef } from "react"
import {
  Heading,
  Flex,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  Icon,
} from "@chakra-ui/react"
import { Sidebar } from "./"
import { MenuAlt2Icon } from "@heroicons/react/outline"

function MobileNavbarDashboard() {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const btnRef = useRef()
  return (
    <>
      <IconButton
        aria-label="Navigation Menu"
        variant="ghost"
        display={["flex", null, "none"]}
        onClick={onToggle}
        ref={btnRef}
        _focus={{ boxShadow: "none" }}
      >
        <Icon as={MenuAlt2Icon} h="6" w="6" color="gray.600" />
      </IconButton>
      <Drawer size="xs" isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef} placement="left">
        <DrawerOverlay zIndex="overlay" />
        <DrawerContent zIndex="drawer">
          <DrawerBody p={0}>
            <Sidebar w="full" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

function Navbar() {
  return (
    <Flex as="nav" pos="fixed" align="center" w="full" py="2" px={[4, 6, 8]} bg={"white"} boxShadow="base">
      <Flex w="full" align="center" justify="space-between">
        <Flex align="center">
          <Link to="/">
            <Heading color="blue.500">gdc.</Heading>
          </Link>
        </Flex>
        <Flex>
          <MobileNavbarDashboard />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Navbar
