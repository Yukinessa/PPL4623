import {
  Flex,
  Text,
  Box,
  SimpleGrid,
  Button,
  Stack,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react"
import { useState, useContext } from "react"
import { StateContext } from "../store"
import { useEffect } from "react"
import { getUsers } from "../api/user"
import { PuzzleIcon } from "@heroicons/react/outline"
import { useForm } from "react-hook-form"
import Joi from "joi"
import { joiResolver } from "@hookform/resolvers/joi"
import { storeAppointment } from "../api/appointment"
import { SuccessModal } from "../components/molecules/modal"
import dayjs from "dayjs"

function RequestAppointment(props) {
  const { requestModal, setRequestModal, setSuccessModal } = props
  const [state] = useContext(StateContext)
  const publisherId = requestModal.publisherId
  const schema = Joi.object({
    date: Joi.date().required(),
    time: Joi.string().required(),
    activity: Joi.string().required(),
    information: Joi.string().required(),
    projectId: Joi.allow(null),
  })
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      projectId: null,
    },
  })

  const closeModal = () => {
    setValue("date", "")
    setValue("time", "")
    setValue("activity", "")
    setValue("information", "")
    setValue("projectId", null)
    setRequestModal({ isOpen: false, publisherId: "", publisher: "" })
  }

  const onSubmit = async (data) => {
    const times = data.time.split(":")
    const meetDate = dayjs(data.date).hour(times[0]).minute(times[1])
    setRequestModal({ ...requestModal, isLoading: true })
    const result = await storeAppointment({
      ...data,
      meetDate,
      publisherId: publisherId,
      designerId: state.currentUser.id,
    })
    console.log(result)
    if (result.success) {
      setRequestModal({ ...requestModal, isOpen: false, isLoading: false })
      setSuccessModal({ isOpen: true })
    }
  }
  return (
    <Flex direction="column">
      <Modal onClose={closeModal} isOpen={requestModal.isOpen}>
        <ModalOverlay />
        <ModalContent p="1">
          <ModalHeader color="gray.600">Request Appoinment</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody pb="5">
            <form>
              <Stack spacing="2" mt="6">
                <FormControl>
                  <Stack direction="row" color="gray.600" fontSize="sm">
                    <FormLabel fontSize="sm" color="gray.600" w="25%">
                      Publisher
                    </FormLabel>
                    <Stack direction="column" w="75%">
                      <Input type="text" value={requestModal.publisher} readOnly />
                      <Text fontSize="sm" color="red.500"></Text>
                    </Stack>
                  </Stack>
                </FormControl>
                <FormControl>
                  <Stack direction="row" color="gray.600" fontSize="sm">
                    <FormLabel fontSize="sm" color="gray.600" w="25%">
                      Date
                    </FormLabel>
                    <Stack direction="column" w="75%">
                      <Input type="date" {...register("date")} isInvalid={errors.meetDate} />
                      <Text fontSize="sm" color="red.500">
                        {errors.date?.message}
                      </Text>
                    </Stack>
                  </Stack>
                </FormControl>
                <FormControl>
                  <Stack direction="row" color="gray.600" fontSize="sm">
                    <FormLabel fontSize="sm" color="gray.600" w="25%">
                      Time
                    </FormLabel>
                    <Stack direction="column" w="75%">
                      <Input type="time" {...register("time")} isInvalid={errors.meetDate} />
                      <Text fontSize="sm" color="red.500">
                        {errors.time?.message}
                      </Text>
                    </Stack>
                  </Stack>
                </FormControl>
                <FormControl>
                  <Stack direction="row" color="gray.600" fontSize="sm">
                    <FormLabel fontSize="sm" color="gray.600" w="25%">
                      Activity
                    </FormLabel>
                    <Stack direction="column" w="75%">
                      <Input type="text" {...register("activity")} isInvalid={errors.activity} />
                      <Text fontSize="sm" color="red.500">
                        {errors.activity?.message}
                      </Text>
                    </Stack>
                  </Stack>
                </FormControl>
                <FormControl>
                  <Stack direction="row" color="gray.600" fontSize="sm">
                    <FormLabel fontSize="sm" color="gray.600" w="25%">
                      Project
                    </FormLabel>
                    <Stack direction="column" w="75%">
                      <Select
                        placeholder="Select Project"
                        {...register("projectId")}
                        isInvalid={errors.projectId}
                      ></Select>
                      <Text fontSize="sm" color="red.500">
                        {errors.projectId?.message}
                      </Text>
                    </Stack>
                  </Stack>
                </FormControl>
                <FormControl>
                  <Stack direction="row" color="gray.600" fontSize="sm">
                    <FormLabel fontSize="sm" color="gray.600" w="25%">
                      Information
                    </FormLabel>
                    <Stack direction="column" w="75%">
                      <Textarea fontSize="sm" {...register("information")} isInvalid={errors.information} />
                      <Text fontSize="sm" color="red.500">
                        {errors.information?.message}
                      </Text>
                    </Stack>
                  </Stack>
                </FormControl>
              </Stack>
            </form>
            <Flex mt="6" justify="end">
              <Button
                isLoading={requestModal.isLoading}
                onClick={handleSubmit(onSubmit)}
                size="md"
                fontSize="sm"
                px="6"
                colorScheme="blue"
              >
                Submit
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

function Publisher() {
  const [users, setUsers] = useState({ data: [], isLoading: false, error: null })
  const [requestModal, setRequestModal] = useState({ isOpen: false, publisherId: "" })
  const [successModal, setSuccessModal] = useState({ isOpen: false })
  useEffect(() => {
    const GetPubsliher = async () => {
      setUsers({ ...users, isLoading: true })
      const result = await getUsers({ role: "publisher" })
      if (result.success) {
        setUsers({ ...users, data: result.data, isLoading: false })
      }
    }
    GetPubsliher()
    return () => {
      setUsers({ data: [], isLoading: false, error: null })
    }
  }, [])
  return (
    <Flex direction="column">
      <Text color="gray.700" fontSize="2xl" fontWeight="medium">
        Publisher
      </Text>
      <Box mt="4">
        <Flex direction="column" minH="70vh">
          <SimpleGrid columns={[1, 2, 3]} spacing={["5", "6"]}>
            {!users.isLoading &&
              users.data.map((user) => (
                <Box key={user.id} boxShadow="md" borderRadius="lg" bg="white" overflow="hidden" p={["4", "6"]}>
                  <Flex direction="column">
                    <Stack direction="row" spacing="2" alignItems="center">
                      <Icon as={PuzzleIcon} w="8" h="8" color="blue.400" />
                      <Text fontWeight="semibold" as="h4" color="gray.600" fontSize="lg" textTransform="capitalize">
                        {user.name}
                      </Text>
                    </Stack>
                    <Text mt="1" color="gray.500" fontSize="sm" fontWeight="medium">
                      {user.email}
                    </Text>
                    <Button
                      onClick={() => setRequestModal({ isOpen: true, publisherId: user.id, publisher: user.name })}
                      mt="6"
                      size="sm"
                      fontSize="xs"
                      colorScheme="blue"
                    >
                      Request
                    </Button>
                  </Flex>
                </Box>
              ))}
          </SimpleGrid>
        </Flex>
      </Box>
      <RequestAppointment
        requestModal={requestModal}
        setRequestModal={setRequestModal}
        setSuccessModal={setSuccessModal}
      />
      <SuccessModal
        successModal={successModal}
        setSuccessModal={setSuccessModal}
        title="Request Success"
        message="Wait until publisher accept your appointment request, you can see at appointment menu"
        redirect="/appointment"
      />
    </Flex>
  )
}

export default Publisher
