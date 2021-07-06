import {
  Flex,
  Text,
  Box,
  SimpleGrid,
  Stack,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Skeleton,
  Badge,
  Button,
} from "@chakra-ui/react"
import { ClipboardListIcon, ClockIcon, DesktopComputerIcon, UserIcon } from "@heroicons/react/outline"
import { StateContext } from "../store"
import { useState, useContext, useEffect } from "react"
import { getSchedules } from "../api/appointment"
import { utcToLocal } from "../helpers/date"
import { getAppointment } from "../api/appointment"

const initAppointment = {
  id: "",
  meetDate: "",
  activity: "",
  information: "",
  project: {},
  publisher: {
    name: "",
  },
  designer: {
    name: "",
  },
}

function DetailSchedule(props) {
  const { detailModal, setDetailModal, appointment, setAppoinment } = props
  const closeModal = () => {
    setDetailModal({ isOpen: false })
    setAppoinment({ ...appointment, data: { ...initAppointment } })
  }

  return (
    <Flex direction="column">
      <Modal onClose={closeModal} isOpen={detailModal.isOpen} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="gray.600">Appoinment</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody mt="2">
            {appointment.isLoading && (
              <Stack direction="column" spacing={4}>
                {[...Array(7)].map((e, i) => (
                  <Stack key={i}>
                    <Skeleton startColor="gray.100" endColor="gray.200" height="30px" />
                  </Stack>
                ))}
              </Stack>
            )}
            {!appointment.isLoading && (
              <Stack direction="column" spacing={4} p="2">
                <Stack direction="row" color="gray.600" fontSize="sm">
                  <Text fontWeight="medium" w="30%">
                    Date
                  </Text>
                  <Text w="70%">{utcToLocal(appointment.data.meetDate, "DD MMMM YYYY")}</Text>
                </Stack>
                <Stack direction="row" color="gray.600" fontSize="sm">
                  <Text fontWeight="medium" w="30%">
                    Time
                  </Text>
                  <Text w="70%">{utcToLocal(appointment.data.meetDate, "hh:mm A")}</Text>
                </Stack>
                <Stack direction="row" color="gray.600" fontSize="sm">
                  <Text fontWeight="medium" w="30%">
                    Activity
                  </Text>
                  <Text w="70%">{appointment.data.activity}</Text>
                </Stack>
                <Stack direction="row" color="gray.600" fontSize="sm">
                  <Text fontWeight="medium" w="30%">
                    Information
                  </Text>
                  <Text w="70%">{appointment.data.information}</Text>
                </Stack>
              </Stack>
            )}
          </ModalBody>
          <ModalFooter mt="2">
            <Flex>
              <Button onClick={closeModal} colorScheme="gray">
                Close
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

function Dashboard() {
  const [schedules, setSchedules] = useState({ data: [], total: 0, isLoading: false, error: null })
  const [appointment, setAppoinment] = useState({ data: { ...initAppointment }, isLoading: false })
  const [detailModal, setDetailModal] = useState({ isOpen: false, isLoading: false })
  const [state] = useContext(StateContext)
  useEffect(() => {
    const GetSchedules = async () => {
      setSchedules({ ...schedules, isLoading: false })
      const result = await getSchedules()
      if (result.success) {
        setSchedules({ ...schedules, data: result.data.appointments, total: result.data.total, isLoading: false })
      }
    }
    GetSchedules()
    return () => {
      setSchedules({ data: [], total: 0, isLoading: false, error: null })
    }
  }, [])
  const OpenDetailModal = async (appointmentId) => {
    setDetailModal({ isOpen: true })
    setAppoinment({ ...appointment, isLoading: true })
    const result = await getAppointment(appointmentId)
    if (result.success) {
      setAppoinment({ data: result.data, isLoading: false })
    }
  }
  return (
    <Flex direction="column">
      <Text color="gray.700" fontSize="2xl" fontWeight="medium">
        Dashboard
      </Text>
      <Box mt="6">
        <Flex direction="column" minH="70vh">
          <SimpleGrid columns={[1, 2]} spacing={["6", "8"]}>
            <Box boxShadow="md" borderRadius="lg" bg="white" overflow="hidden" p={["4", "6"]}>
              <Flex direction="column">
                <Stack direction="row" spacing="4" alignItems="center">
                  <Icon as={ClipboardListIcon} w="8" h="8" color="blue.400" />
                  <Text fontWeight="semibold" as="h4" color="gray.600" fontSize="lg" textTransform="capitalize">
                    Schedule Today ({schedules.total})
                  </Text>
                </Stack>
                <Stack mt="6" spacing="6">
                  {schedules.data.map((schedule) => (
                    <Box
                      key={schedule.id}
                      borderRadius="lg"
                      borderWidth="1px"
                      bg="white"
                      overflow="hidden"
                      p={["3", "5"]}
                      as="button"
                      onClick={() => OpenDetailModal(schedule.id)}
                    >
                      <Stack direction="column" spacing="2">
                        <Stack direction="row" spacing="2" alignItems="center">
                          <Icon as={ClockIcon} w="4" h="4" color="blue.500" />
                          <Text color="gray.600" fontWeight="semibold" fontSize="md">
                            {utcToLocal(schedule.meetDate, "hh:mm A")}
                          </Text>
                        </Stack>
                        <Stack direction="row" spacing="2" alignItems="center">
                          <Icon as={UserIcon} w="4" h="4" color="blue.500" />
                          <Text color="gray.600" fontSize="sm">
                            {state.currentUser.role !== "publisher" ? schedule.publisher.name : schedule.designer.name}
                          </Text>
                        </Stack>
                        <Stack direction="row" spacing="2" alignItems="center">
                          <Icon as={DesktopComputerIcon} w="4" h="4" color="blue.500" />
                          <Text color="gray.600" fontSize="sm">
                            {schedule.activity}
                          </Text>
                        </Stack>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Flex>
            </Box>
          </SimpleGrid>
        </Flex>
      </Box>
      <DetailSchedule
        detailModal={detailModal}
        setDetailModal={setDetailModal}
        appointment={appointment}
        setAppoinment={setAppoinment}
      />
    </Flex>
  )
}

export default Dashboard
