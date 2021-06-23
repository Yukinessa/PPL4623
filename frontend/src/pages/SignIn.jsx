import { useState } from "react"
import {
  Flex,
  Stack,
  Image,
  Alert,
  AlertIcon,
  FormControl,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  InputRightElement,
  HStack,
  Checkbox,
  Text,
  Button,
  Box,
} from "@chakra-ui/react"

import { MailIcon, LockClosedIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/outline"
import Joi from "joi"
import { useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import { Link, useHistory } from "react-router-dom"
import { signIn } from "../api/auth"
import { setToken } from "../helpers/token"
import LoginImage from "../assets/register.png"

function SignIn() {
  const history = useHistory()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().required(),
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: joiResolver(schema),
  })
  const setEmpty = () => {
    setValue("email", "")
    setValue("password", "")
  }
  const onSubmit = async (data) => {
    setError(null)
    setLoading(true)
    const result = await signIn(data)
    console.log(result)
    if (result.success) {
      setLoading(false)
      setToken(Math.random().toString(36).substring(2))
      setEmpty()
      history.push("/dashboard")
    } else {
      setLoading(false)
      if (result.error.code === 404) {
        setError("User not found")
        return
      }
      if (result.error.code === 460) {
        setError("Wrong password")
        return
      }
    }
  }

  return (
    <Flex px="4" minH="100vh" direction="column" justifyContent="center" alignItems="center">
      <Stack direction={["column", "row"]} w="full" maxW="container.lg">
        <Flex w="full" display={["none", "flex"]}>
          <Image src={LoginImage} />
        </Flex>
        <Flex w={["full", "unset"]} direction="column" alignSelf="center">
          <Box minW={["full", "sm"]} py={["4", "6"]} px={["4", "6", "8"]} borderWidth="1px" borderRadius="lg">
            <Stack direction="column">
              <Flex direction="column" align="center" mb="6">
                <Text fontSize="md" color="gray.500">
                  Sign in into your account
                </Text>
              </Flex>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                  {error && (
                    <Alert size="sm" status="error">
                      <AlertIcon />
                      <Text color="gray.600" fontSize="sm">
                        {error}
                      </Text>
                    </Alert>
                  )}
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={MailIcon} color="gray.500" />
                      </InputLeftElement>
                      <Input type="text" placeholder="Email" {...register("email")} isInvalid={errors.email} />
                    </InputGroup>
                    <Text fontSize="sm" color="red.500">
                      {errors.email?.message}
                    </Text>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={LockClosedIcon} color="gray.500" />
                      </InputLeftElement>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...register("password")}
                        isInvalid={errors.password}
                      />
                      <InputRightElement cursor="pointer" onClick={() => setShowPassword(!showPassword)}>
                        <Icon as={showPassword ? EyeOffIcon : EyeIcon} color="gray.500" />
                      </InputRightElement>
                    </InputGroup>
                    <Text fontSize="sm" color="red.500">
                      {errors.password?.message}
                    </Text>
                  </FormControl>
                  <HStack justify="space-between">
                    <Checkbox colorScheme="blue">
                      <Text fontSize="sm" color="gray.500">
                        Remember Me
                      </Text>
                    </Checkbox>
                    <Link to="#">
                      <Text fontSize="sm" fontWeight="semibold" color="blue.400">
                        Forget Password?
                      </Text>
                    </Link>
                  </HStack>
                </Stack>
                <Button
                  mt="8"
                  w="full"
                  fontSize="sm"
                  colorScheme="blue"
                  onClick={handleSubmit(onSubmit)}
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  type="submit"
                >
                  Sign In
                </Button>
              </form>
            </Stack>
            <Stack direction="column" mt="8" spacing={6} w="full">
              <Box borderBottom="1px" borderColor="inherit" />
              <Stack direction="row" alignSelf="center">
                <Text fontSize="sm" color="gray.500">
                  Dont have an account ?
                </Text>
                <Text
                  as="button"
                  fontSize="sm"
                  fontWeight="semibold"
                  color="blue.400"
                  onClick={() => history.push("/signup")}
                >
                  Sign Up
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default SignIn
