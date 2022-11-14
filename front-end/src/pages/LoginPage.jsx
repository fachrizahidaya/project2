import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalHeader,
  FormControl,
  FormLabel,
  ModalCloseButton,
  Input,
  Flex,
  Stack,
  Heading,
  Box,
  useColorModeValue,
  Text,
  Link,
  Checkbox,
} from "@chakra-ui/react";
import Axios from "axios";
import { login } from "../redux/userSlice";
import { Navigate } from "react-router-dom";
const url = `http://localhost:2000/users/login`;

export const LoginPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const usernameEmail = useRef("");
  const password = useRef("");
  const dispatch = useDispatch();
  const [move, setMove] = useState(false);

  const onLogin = async () => {
    try {
      const user = {
        data: usernameEmail.current.value,
        password: password.current.value,
      };
      console.log(user);
      const result = await Axios.post(url, user);
      console.log(result.data);
      dispatch(login(result.data.user));
      localStorage.setItem("token", result.data.token);
      setMove(true);
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
  };

  return move ? (
    <Navigate to="/" replace={true} />
  ) : (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box rounded={"lg"} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Username/Email</FormLabel>
                <Input type="text" ref={usernameEmail} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" ref={password} />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  {/* <Checkbox>Remember me</Checkbox> */}
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  onClick={onLogin}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};
