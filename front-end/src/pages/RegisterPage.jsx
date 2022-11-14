import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Image,
  useDisclosure,
  Container,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Axios from "axios";
import * as Yup from "yup";
import { Form, Field, ErrorMessage, Formik } from "formik";
const url = `http://localhost:2000/users/register`;

export default function RegisterPage() {
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const registerSchema = Yup.object().shape({
    username: Yup.string().required("required field"),
    email: Yup.string().required("required field").email("Invalid input"),
    phoneNumber: Yup.string().required("required field"),
    password: Yup.string()
      .required("required field")
      .min(8, "minimum 8 characters"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/,
    //   {
    //     excludeEmptyString: true,
    //     message:
    //       "at least one uppercase letter, one lowercase, one number or special character",
    //   }
    // ),
    confirmPassword: Yup.string().required(),
  });
  const onRegister = async (data) => {
    try {
      const result = await Axios.post(url, data);
      console.log(result);
      alert(result.data);
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
  };

  const AlertComp = () => {
    return (
      <Alert show="false" status="success">
        <AlertIcon />
        Register Success
      </Alert>
    );
  };

  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerSchema}
        onSubmit={(values, action) => {
          console.log(values);
          onRegister(values);
        }}
      >
        {(props) => {
          console.log(props);
          return (
            <Flex>
              {show ? <AlertComp /> : null}
              <Container
                justifyContent="space-between"
                display="flex"
                w="-webkit-max-content"
                alignContent=""
              >
                <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
                  <Flex
                    minH={"100vh"}
                    align={"center"}
                    justify={"center"}
                    // bg={useColorModeValue("gray.50", "gray.800")}
                  >
                    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                      <Stack align={"center"}>
                        <Heading fontSize={"4xl"} textAlign={"center"}>
                          Sign up
                        </Heading>
                        <Text fontSize={"lg"} color={"gray.600"}>
                          to enjoy all of our cool features ✌️
                        </Text>
                      </Stack>
                      <Box
                        rounded={"lg"}
                        // bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                      >
                        <Stack spacing={4}>
                          <Form>
                            <Box>
                              <FormControl id="username" isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input as={Field} type="text" name="username" />
                              </FormControl>
                            </Box>

                            <FormControl id="email" isRequired>
                              <FormLabel>Email address</FormLabel>
                              <Input type="email" as={Field} name="email" />
                            </FormControl>
                            <FormControl id="phoneNumber" isRequired>
                              <FormLabel>Phone Number</FormLabel>
                              <Input
                                type="text"
                                as={Field}
                                name="phoneNumber"
                              />
                            </FormControl>
                            <HStack>
                              <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                  <Input
                                    name="password"
                                    as={Field}
                                    type={showPassword ? "text" : "password"}
                                  />
                                  <InputRightElement h={"full"}>
                                    <Button
                                      variant={"ghost"}
                                      onClick={() =>
                                        setShowPassword(
                                          (showPassword) => !showPassword
                                        )
                                      }
                                    >
                                      {showPassword ? (
                                        <ViewIcon />
                                      ) : (
                                        <ViewOffIcon />
                                      )}
                                      <ErrorMessage
                                        name="password"
                                        component="div"
                                        style={{ color: "red" }}
                                      ></ErrorMessage>
                                    </Button>
                                  </InputRightElement>
                                </InputGroup>
                              </FormControl>
                              <FormControl id="confirmPassword" isRequired>
                                <FormLabel>Confirm Password</FormLabel>
                                <InputGroup>
                                  <Input
                                    name="confirmPassword"
                                    as={Field}
                                    type={
                                      showConfirmPassword ? "text" : "password"
                                    }
                                  />
                                  <InputRightElement h={"full"}>
                                    <Button
                                      variant={"ghost"}
                                      onClick={() =>
                                        setShowConfirmPassword(
                                          (showConfirmPassword) =>
                                            !showConfirmPassword
                                        )
                                      }
                                    >
                                      {showConfirmPassword ? (
                                        <ViewIcon />
                                      ) : (
                                        <ViewOffIcon />
                                      )}
                                    </Button>
                                  </InputRightElement>
                                </InputGroup>
                              </FormControl>
                            </HStack>
                            <Stack spacing={10} pt={2}>
                              <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={"blue.400"}
                                color={"white"}
                                // type="submit"
                                onClick={onOpen}
                                _hover={{
                                  bg: "blue.500",
                                }}
                              >
                                Sign up
                              </Button>
                              <AlertDialog
                                isOpen={isOpen}
                                leastDestructiveRef={cancelRef}
                                onClose={onClose}
                              >
                                <AlertDialogOverlay>
                                  <AlertDialogContent>
                                    <AlertDialogHeader
                                      fontSize="lg"
                                      fontWeight="bold"
                                    >
                                      Sign Up
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                      Are you sure? You can't undo this action
                                      afterwards.
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                      <Button ref={cancelRef} onClick={onClose}>
                                        Cancel
                                      </Button>
                                      <Button
                                        colorScheme="red"
                                        onClick={isOpen}
                                        ml={3}
                                        type="submit"
                                      >
                                        Submit
                                      </Button>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialogOverlay>
                              </AlertDialog>
                            </Stack>
                            <Stack pt={6}>
                              <Text align={"center"}>
                                Already a user?{" "}
                                <Link color={"blue.400"} href="/login">
                                  Login
                                </Link>
                              </Text>
                            </Stack>
                          </Form>
                        </Stack>
                      </Box>
                    </Stack>
                  </Flex>
                </Stack>
              </Container>
              <Flex flex={1}>
                <Image
                  alt={"Login Image"}
                  objectFit={"inherit"}
                  src={
                    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
                  }
                />
              </Flex>
            </Flex>
          );
        }}
      </Formik>
    </div>
  );
}
