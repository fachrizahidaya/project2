import { Box, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

const url = "http://localhost:2000/users/verification";

export const VerificationPage = () => {
  const [msg, setMsg] = useState("Loading...");
  const params = useParams();

  const verifyToken = async () => {
    try {
      console.log(params.token);
      const res = await Axios.get(url, {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      });
      setMsg(res.data);
    } catch (err) {
      setMsg("Verification Failed");
    }
  };

  useEffect(() => {
    verifyToken();
  });

  return (
    <div>
      <Heading>Verification Page</Heading>
      <Box textAlign="center" py={10} px={6}>
        <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Verification Success
        </Heading>
        <Text color={"gray.500"}>
          Proceed Sign In to your Account.
        </Text>
      </Box>
      <Heading>{msg}</Heading>
    </div>
  );
};
