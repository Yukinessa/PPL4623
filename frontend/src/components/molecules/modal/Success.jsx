import { Flex, Modal, ModalOverlay, ModalContent, ModalBody, Stack, Icon, Text, Button } from "@chakra-ui/react"
import { useHistory } from "react-router-dom"
import { CheckCircleIcon } from "@heroicons/react/outline"

function SuccessModal(props) {
  const { successModal, setSuccessModal, redirect, title, message } = props
  const history = useHistory()
  const onClose = () => {
    setSuccessModal({ ...successModal, isOpen: false })
    history.push(redirect)
  }
  return (
    <Flex>
      <Modal isOpen={successModal.isOpen}>
        <ModalOverlay />
        <ModalContent px="2" py="4" borderRadius="xl">
          <ModalBody>
            <Stack spacing="4" mt="8" align="center" textAlign="center">
              <Icon as={CheckCircleIcon} w="24" h="24" color="teal.400" />
              <Text fontWeight="bold" color="gray.600" fontSize="2xl">
                {title}
              </Text>
              <Text color="gray.600" fontSize="md">
                {message}
              </Text>
            </Stack>
            <Button mt="8" mb="2" w="full" colorScheme="blue" size="md" onClick={onClose}>
              Next
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default SuccessModal
