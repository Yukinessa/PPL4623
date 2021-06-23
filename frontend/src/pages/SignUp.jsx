import { useState } from "react";
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
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

import {
  MailIcon,
  LockClosedIcon,
  EyeIcon,
  EyeOffIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useHistory } from "react-router-dom";
import LoginImage from "../assets/register.png";

function SignUp() {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(8).required(),
    acceptTerms: Joi.boolean().required(),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    resolver: joiResolver(schema),
  });
  const setEmpty = () => {
    setValue("name", "");
    setValue("email", "");
    setValue("password", "");
  };

  return (
    <Flex
      px="4"
      minH="100vh"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack direction={["column", "row"]} w="full" maxW="container.lg">
        <Flex w="full" display={["none", "flex"]}>
          <Image src={LoginImage} />
        </Flex>
        <Flex direction="column" alignSelf="center">
          <Box
            minW={["full", "sm"]}
            py={["4", "6"]}
            px={["4", "6", "8"]}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Stack direction="column">
              <Flex direction="column" align="center" mb="6">
                <Text fontSize="md" color="gray.500">
                  Create an account
                </Text>
              </Flex>
              <form>
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
                        <Icon as={UserCircleIcon} color="gray.500" />
                      </InputLeftElement>
                      <Input
                        type="text"
                        placeholder="Name"
                        {...register("name")}
                        isInvalid={errors.name}
                      />
                    </InputGroup>
                    <Text fontSize="sm" color="red.500">
                      {errors.name?.message}
                    </Text>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={MailIcon} color="gray.500" />
                      </InputLeftElement>
                      <Input
                        type="text"
                        placeholder="Email"
                        {...register("email")}
                        isInvalid={errors.email}
                      />
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
                      <InputRightElement
                        cursor="pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon
                          as={showPassword ? EyeOffIcon : EyeIcon}
                          color="gray.500"
                        />
                      </InputRightElement>
                    </InputGroup>
                    <Text fontSize="sm" color="red.500">
                      {errors.password?.message}
                    </Text>
                  </FormControl>
                  <RadioGroup size="md" defaultValue="designer">
                    <Stack spacing={5} direction="row" color="gray.600" px="1">
                      <Radio colorScheme="blue" value="designer">
                        <Text fontSize="sm">Designer</Text>
                      </Radio>
                      <Radio colorScheme="blue" value="publisher">
                        <Text fontSize="sm">Publisher</Text>
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <HStack justify="space-between" px="1">
                    <Checkbox {...register("acceptTerms")} colorScheme="blue">
                      <Text fontSize="sm" color="gray.500">
                        Accept all of the terms and conditions
                      </Text>
                    </Checkbox>
                  </HStack>
                </Stack>
                <Button
                  mt="8"
                  w="full"
                  fontSize="sm"
                  colorScheme="blue"
                  isDisabled={isLoading || !watch("acceptTerms")}
                  isLoading={isLoading}
                  type="submit"
                >
                  Sign Up
                </Button>
              </form>
            </Stack>
            <Stack direction="column" mt="8" spacing={6} w="full">
              <Box borderBottom="1px" borderColor="inherit" />
              <Stack direction="row" alignSelf="center">
                <Text fontSize="sm" color="gray.500">
                  Already have an account ?
                </Text>
                <Text
                  as="button"
                  fontSize="sm"
                  fontWeight="semibold"
                  color="blue.400"
                  onClick={() => history.push("/signin")}
                >
                  Sign In
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Flex>
      </Stack>
    </Flex>
  );
}

export default SignUp;
