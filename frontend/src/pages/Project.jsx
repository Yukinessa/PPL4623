import {
  Flex,
  Text,
  Box,
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
  Spacer,
  Input,
  Textarea,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react"
import { StateContext } from "../store"
import { useState, useContext, useEffect } from "react"
import { getAppointments, getAppointment, changeStatusAppointment } from "../api/appointment"
import { utcToLocal } from "../helpers/date"
import { getProjects } from "../api/project"
import { PlusIcon } from "@heroicons/react/outline"
import useModal from "../helpers/useModal"
import FormCreateProject from "../components/molecules/FormCreateProject"

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

const genres = ["action", "fighting", "rpg", "adventure", "sport", "racing"]
const ageRestrictions = [3, 7, 12, 16, 18]

const ProjectForm = () => (
  <>
    <ModalBody>
      <Stack spacing="2" mt="6">
        <FormControl>
          <Stack direction="row" color="gray.600" fontSize="sm">
            <FormLabel fontSize="sm" color="gray.600" w="25%">
              Title
            </FormLabel>
            <Stack direction="column" w="75%">
              <Input type="text" placeholder="Title of the project" />
            </Stack>
          </Stack>
        </FormControl>
        <FormControl>
          <Stack direction="row" color="gray.600" fontSize="sm">
            <FormLabel fontSize="sm" color="gray.600" w="25%">
              Description
            </FormLabel>
            <Stack direction="column" w="75%">
              <Textarea placeholder="Brief description of the project" />
            </Stack>
          </Stack>
        </FormControl>
        <FormControl>
          <Stack direction="row" color="gray.600" fontSize="sm">
            <FormLabel fontSize="sm" color="gray.600" w="25%">
              Genre
            </FormLabel>
            <Stack direction="column" w="75%">
              <Select placeholder="Select the project genre">
                {genres.map((genre, id) => (
                  <option key={id} value={genre}>
                    {genre}
                  </option>
                ))}
              </Select>
            </Stack>
          </Stack>
        </FormControl>
        <FormControl>
          <Stack direction="row" color="gray.600" fontSize="sm">
            <FormLabel fontSize="sm" color="gray.600" w="25%">
              Restriction
            </FormLabel>
            <Stack direction="column" w="75%">
              <Select placeholder="Age restrictions">
                {ageRestrictions.map((age, id) => (
                  <option key={id} value={age}>
                    {age}
                  </option>
                ))}
              </Select>
            </Stack>
          </Stack>
        </FormControl>
      </Stack>
    </ModalBody>
    <ModalFooter></ModalFooter>
  </>
)

const Project = () => {
  const [state] = useContext(StateContext)
  const menus = [
    {
      display: "All",
      status: "",
    },
    ...Object.values(status),
  ]
  const [projects, setProjects] = useState({ data: [], isLoading: false })
  const [selectedProject, setSelectedProject] = useState({ data: { ...initAppointment }, isLoading: false })
  const [query, setQuery] = useState({ tab: 0 })
  const [detailModal, setDetailModal] = useState({ isOpen: false, isLoading: false })
  const { toggleModal, renderModal: RenderModal } = useModal()

  useEffect(() => {
    const GetAppointments = async () => {
      setProjects({ ...projects, isLoading: true })
      const currentUser =
        state.currentUser.role === "publisher"
          ? { publisherId: state.currentUser.id }
          : { designerId: state.currentUser.id }
      const result = await getProjects()
      if (result.success) {
        setProjects({ data: result.data, isLoading: false })
      }
    }
    GetAppointments()
    return () => {
      setProjects({ data: [], isLoading: false })
    }
  }, [query])

  const OpenDetailModal = async (appointmentId) => {
    setDetailModal({ isOpen: true })
    setSelectedProject({ ...selectedProject, isLoading: true })
    const result = await getAppointment(appointmentId)
    if (result.success) {
      setSelectedProject({ data: result.data, isLoading: false })
    }
  }

  return (
    <Flex direction="column">
      <RenderModal component={<FormCreateProject />} title="New Project" />
      <Flex direction="row">
        <Box>
          <Text color="gray.700" fontSize="2xl" fontWeight="medium">
            Project
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Button mr="2" onClick={() => toggleModal()} colorScheme="blue" size="sm">
            create new
          </Button>
        </Box>
      </Flex>
      <Box bg="white" mt="4" px={[4, 5, 6]} py={8}>
        <Flex direction="column" minH="70vh">
          <Flex direction="column" mt={2}>
            <Flex overflowX="auto" overflowY="hidden" direction="column" mt="8">
              {projects.isLoading && (
                <Stack spacing={6}>
                  {[...Array(3)].map((e, i) => (
                    <Stack key={i}>
                      <Skeleton startColor="gray.100" endColor="gray.200" height="30px" />
                    </Stack>
                  ))}
                </Stack>
              )}
              {!projects.isLoading && (
                <Table variant="simple" size="md" mb={4}>
                  <Thead>
                    <Tr color="gray.100" borderTop="1px">
                      <Th fontSize="14px" fontWeight="semibold" color="gray.500">
                        NAME
                      </Th>
                      <Th fontSize="14px" fontWeight="semibold" color="gray.500">
                        GENRE
                      </Th>
                      <Th fontSize="14px" fontWeight="semibold" color="gray.500">
                        AGE STRICT
                      </Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {projects.data.map((project, index) => (
                      <Tr key={index} fontSize="sm" color="gray.600">
                        <Td fontWeight="medium">{project.name}</Td>
                        <Td fontWeight="medium">{project.genre}</Td>
                        <Td>{project.ageStrict}</Td>
                        <Td>
                          <Button
                            variant="unstyled"
                            size="sm"
                            _focus={{ boxShadow: "none" }}
                            onClick={() => OpenDetailModal(project.id)}
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
    </Flex>
  )
}

export default Project
