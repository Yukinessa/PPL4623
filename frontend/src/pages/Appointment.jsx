import { Link, useLocation } from "react-router-dom"
import {
  Flex,
  Text,
  Box,
  Tabs,
  TabList,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Badge,
  Stack,
  Skeleton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { StateContext } from "../store"
import { useState, useContext, useEffect } from "react"
import { getAppointments, getAppointment, changeStatusAppointment } from "../api/appointment"
import { utcToLocal } from "../helpers/date"

const useQuery = () => new URLSearchParams(useLocation().search)
const status = {
  pending: {
    display: "Pending",
    status: "pending",
    color: "orange",
  },
  accepted: {
    display: "Accepted",
    status: "accepted",
    color: "purple",
  },
  done: {
    display: "Done",
    status: "done",
    color: "green",
  },
  refused: {
    display: "Refused",
    status: "refused",
    color: "red",
  },
}
const initAppointment = {
  id: "",
  meetDate: "",
  status: "pending",
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

function DetailAppointment(props) {
  const { detailModal, setDetailModal, appointment, setAppoinment, user, setQuery, query } = props
  const closeModal = () => {
    setDetailModal({ isOpen: false })
    setAppoinment({ ...appointment, data: { ...initAppointment } })
  }
  const updateStatus = async (status = "accepted") => {
    setDetailModal({ ...detailModal, isLoading: true })
    const result = await changeStatusAppointment({ id: appointment.data.id, status })
    if (result.success) {
      setDetailModal({ ...detailModal, isLoading: false })
      setQuery({ ...query, tab: 0 })
      closeModal()
    }
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
              <Stack direction="column" spacing={4}>
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
                    Status
                  </Text>
                  <Flex w="70%">
                    <Badge variant="subtle" colorScheme={status[appointment.data.status].color}>
                      {appointment.data.status}
                    </Badge>
                  </Flex>
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
          <ModalFooter mt="4">
            {user.role === "publisher" && appointment.data.status === "pending" && (
              <Flex>
                <Button
                  mr="2"
                  onClick={() => updateStatus("refused")}
                  isDisabled={detailModal.isLoading}
                  colorScheme="gray"
                  size="sm"
                >
                  Refuse
                </Button>
                <Button
                  onClick={() => updateStatus("accepted")}
                  isDisabled={detailModal.isLoading}
                  colorScheme="blue"
                  size="sm"
                >
                  Accept
                </Button>
              </Flex>
            )}
            {appointment.data.status === "accepted" && (
              <Flex>
                <Button
                  onClick={() => updateStatus("done")}
                  isDisabled={detailModal.isLoading}
                  colorScheme="blue"
                  size="sm"
                >
                  Done
                </Button>
              </Flex>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

function Appointment() {
  const [state] = useContext(StateContext)
  const menus = [
    {
      display: "All",
      status: "",
    },
    ...Object.values(status),
  ]
  const [appointments, setAppoinments] = useState({ data: [], isLoading: false })
  const [appointment, setAppoinment] = useState({ data: { ...initAppointment }, isLoading: false })
  const [query, setQuery] = useState({ tab: 0 })
  const [detailModal, setDetailModal] = useState({ isOpen: false, isLoading: false })

  useEffect(() => {
    const GetAppointments = async () => {
      setAppoinments({ ...appointments, isLoading: true })
      const currentUser =
        state.currentUser.role === "publisher"
          ? { publisherId: state.currentUser.id }
          : { designerId: state.currentUser.id }
      const result = await getAppointments({ status: menus[query.tab].status, ...currentUser })
      if (result.success) {
        setAppoinments({ data: result.data, isLoading: false })
      }
    }
    GetAppointments()
    return () => {
      setAppoinments({ data: [], isLoading: false })
    }
  }, [query])

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
        Appointment
      </Text>
      <Box bg="white" mt="4" px={[4, 5, 6]} py={8}>
        <Flex direction="column" minH="70vh">
          <Flex direction="column" mt={2}>
            <Tabs overflowX="auto">
              <TabList>
                {menus.map((menu, index) => (
                  <Link to={`/appointment?tab=${index}`} key={index}>
                    <Box
                      minW="16"
                      p="4"
                      borderBottom={
                        parseInt(useQuery().get("tab")) === index || (useQuery().get("tab") === null && index === 0)
                          ? "2px"
                          : "none"
                      }
                      borderBottomColor={
                        parseInt(useQuery().get("tab")) === index || (useQuery().get("tab") === null && index === 0)
                          ? "blue.500"
                          : ""
                      }
                      position="relative"
                      mb="-2px"
                      onClick={() => setQuery({ ...query, tab: index.toString() })}
                    >
                      <Text
                        color={
                          parseInt(useQuery().get("tab")) === index || (useQuery().get("tab") === null && index === 0)
                            ? "blue.500"
                            : "gray.600"
                        }
                        fontSize="sm"
                        fontWeight="semibold"
                        textAlign="center"
                      >
                        {menu.display}
                      </Text>
                    </Box>
                  </Link>
                ))}
              </TabList>
            </Tabs>
            <Flex overflowX="auto" overflowY="hidden" direction="column" mt="8">
              {appointments.isLoading && (
                <Stack spacing={6}>
                  {[...Array(6)].map((e, i) => (
                    <Stack key={i}>
                      <Skeleton startColor="gray.100" endColor="gray.200" height="30px" />
                    </Stack>
                  ))}
                </Stack>
              )}
              {!appointments.isLoading && (
                <Table variant="simple" size="md" mb={4}>
                  <Thead>
                    <Tr color="gray.100" borderTop="1px">
                      <Th fontSize="14px" fontWeight="semibold" color="gray.500">
                        DATE
                      </Th>
                      <Th fontSize="14px" fontWeight="semibold" color="gray.500">
                        TIME
                      </Th>
                      <Th fontSize="14px" fontWeight="semibold" color="gray.500">
                        NAME
                      </Th>
                      <Th fontSize="14px" fontWeight="semibold" color="gray.500">
                        ACTIVITY
                      </Th>
                      <Th fontSize="14px" fontWeight="semibold" color="gray.500">
                        STATUS
                      </Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {appointments.data.map((appointment, index) => (
                      <Tr key={index} fontSize="sm" color="gray.600">
                        <Td fontWeight="medium">{utcToLocal(appointment.meetDate, "DD MMMM YYYY")}</Td>
                        <Td fontWeight="medium">{utcToLocal(appointment.meetDate, "hh:mm A")}</Td>
                        <Td>
                          {state.currentUser.role !== "designer"
                            ? appointment.designer.name
                            : appointment.publisher.name}
                        </Td>
                        <Td>{appointment.activity}</Td>
                        <Td>
                          <Badge variant="subtle" colorScheme={status[appointment.status].color}>
                            {appointment.status}
                          </Badge>
                        </Td>
                        <Td>
                          <Button
                            variant="unstyled"
                            size="sm"
                            _focus={{ boxShadow: "none" }}
                            onClick={() => OpenDetailModal(appointment.id)}
                          >
                            <Text fontWeight="semibold" color="blue.500">
                              Detail
                            </Text>
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                  <Tfoot></Tfoot>
                </Table>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <DetailAppointment
        setQuery={setQuery}
        query={query}
        detailModal={detailModal}
        setDetailModal={setDetailModal}
        appointment={appointment}
        setAppoinment={setAppoinment}
        user={state.currentUser}
      />
    </Flex>
  )
}

export default Appointment
