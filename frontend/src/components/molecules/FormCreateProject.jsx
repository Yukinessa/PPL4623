import React from "react"
import _ from "lodash"
import { Stack, ModalBody, Textarea, FormControl, FormLabel, Input, Select, Flex, Button, Text } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import Joi from "joi"
import { joiResolver } from "@hookform/resolvers/joi"
import { storeAppointment } from "../../api/appointment"
import { SuccessModal } from "../../components/molecules/modal"
import dayjs from "dayjs"
import { GAME_AGE_RESTRICTIONS, GAME_GENRE } from "../../constants/project"
import { storeProject } from "../../api/project"

const FormCreateProject = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    genre: Joi.string().required(),
    ageStrict: Joi.number().required(),
    linkDownload: Joi.link(),
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
    setValue("name", "")
    setValue("description", "")
    setValue("genre", "")
    setValue("ageStrict", "")
    setValue("linkDownload", null)
    setRequestModal({ isOpen: false, publisherId: "", publisher: "" })
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    const result = await storeProject({ ...data })
    if (result.success) {
      setRequestModal({ ...requestModal, isOpen: false })
      setSuccessModal({ isOpen: true })
      setIsLoading(false)
    }
  }
  return (
    <ModalBody>
      <form>
        <Stack spacing="2" mt="6">
          <FormControl>
            <Stack direction="row" color="gray.600" fontSize="sm">
              <FormLabel fontSize="sm" color="gray.600" w="25%">
                Title
              </FormLabel>
              <Stack direction="column" w="75%">
                <Input type="text" placeholder="Title of the project" {...register("name")} isInvalid={errors.name} />
                <Text fontSize="sm" color="red.500">
                  {errors.name?.message}
                </Text>
              </Stack>
            </Stack>
          </FormControl>
          <FormControl>
            <Stack direction="row" color="gray.600" fontSize="sm">
              <FormLabel fontSize="sm" color="gray.600" w="25%">
                Description
              </FormLabel>
              <Stack direction="column" w="75%">
                <Textarea
                  placeholder="Brief description of the project"
                  {...register("description")}
                  isInvalid={errors.description}
                />
                <Text fontSize="sm" color="red.500">
                  {errors.description?.message}
                </Text>
              </Stack>
            </Stack>
          </FormControl>
          <FormControl>
            <Stack direction="row" color="gray.600" fontSize="sm">
              <FormLabel fontSize="sm" color="gray.600" w="25%">
                Genre
              </FormLabel>
              <Stack direction="column" w="75%">
                <Select placeholder="Select the project genre" {...register("genre")} isInvalid={errors.genre}>
                  {_.map(GAME_GENRE, (genre, id) => (
                    <option key={id} value={genre}>
                      {genre}
                    </option>
                  ))}
                </Select>
                <Text fontSize="sm" color="red.500">
                  {errors.genre?.message}
                </Text>
              </Stack>
            </Stack>
          </FormControl>
          <FormControl>
            <Stack direction="row" color="gray.600" fontSize="sm">
              <FormLabel fontSize="sm" color="gray.600" w="25%">
                Restriction
              </FormLabel>
              <Stack direction="column" w="75%">
                <Select placeholder="Age restrictions" {...register("ageStrict")} isInvalid={errors.ageStrict}>
                  {_.map(GAME_AGE_RESTRICTIONS, (age, id) => (
                    <option key={id} value={age}>
                      {age}
                    </option>
                  ))}
                </Select>
                <Text fontSize="sm" color="red.500">
                  {errors.ageStrict?.message}
                </Text>
              </Stack>
            </Stack>
          </FormControl>
          <FormControl>
            <Stack direction="row" color="gray.600" fontSize="sm">
              <FormLabel fontSize="sm" color="gray.600" w="25%">
                Link Download
              </FormLabel>
              <Stack direction="column" w="75%">
                <Input
                  type="text"
                  placeholder="Shareable link"
                  {...register("linkDownload")}
                  isInvalid={errors.linkDownload}
                />
                <Text fontSize="sm" color="red.500">
                  {errors.linkDownload?.message}
                </Text>
              </Stack>
            </Stack>
          </FormControl>
        </Stack>
      </form>
      <Flex mt="6" justify="end">
        <Button
          isLoading={isLoading}
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
  )
}

export default FormCreateProject
