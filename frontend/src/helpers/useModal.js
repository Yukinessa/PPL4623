import React from "react"
import { Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton } from "@chakra-ui/react"

const useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleModal = () => setIsOpen(!isOpen)

  const renderModal = ({ component, title, size = "md" }) => (
    <Flex direction="column">
      <Modal onClose={toggleModal} isOpen={isOpen} size={size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="gray.600">{title}</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          {component}
        </ModalContent>
      </Modal>
    </Flex>
  )

  return { toggleModal, renderModal }
}

export default useModal
