import * as React from "react";
import * as ReactDOMClient from "react-dom/client";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { ChatState } from '../Context/ChatProvider'
import {
  Container,
  Grid,
  GridItem,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Image,
  Tag,
  Badge,
  StarIcon,
  Link,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import {
  Heading,
  Avatar,
  Center,
  Flex,
  Stack,
  Button,
  useColorModeValue
} from "@chakra-ui/react";

import SidebarWithHeader from "./SidebarWithHeader";

import { useEffect ,useState } from "react";
import axios from 'axios';

const Explore = () => {

  const [samples, setSamples] =  useState([]);

  const createTagsFromInterests=(interests) =>{
    return interests.map((x) => (
      <Tag variant="solid" colorScheme="teal">
        {" "}
        {x}{" "}
      </Tag>
    ));
  }



  const createOneProfile=(singleUserJSON)=> {
    return SocialProfileWithImage(
      singleUserJSON.name,
      singleUserJSON.pic,
      singleUserJSON.email,
      singleUserJSON.interests,
      singleUserJSON.projectblurb
    );
  }

  const createProfileWraps=(userJSON) =>{
    return userJSON.map((x) => (<WrapItem>{createOneProfile(x)}</WrapItem>));
  }

  const SocialProfileWithImage= (name, image, email, interests, projectblurb) =>{
    return (
   
      <Center py={6}>
        <Box
          maxW={"270px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Image
            h={"120px"}
            w={"full"}
            src={
              "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            }
            objectFit={"cover"}
          />
          <Flex justify={"center"} mt={-12}>
            <Avatar
              size={"xl"}
              src={image}
              alt={"Author"}
              css={{
                border: "2px solid white"
              }}
            />
          </Flex>
  
          <Box p={6}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                {name}
              </Heading>
              <Text color={"gray.500"}>{email}</Text>
            </Stack>
  
            <Stack direction={"row"} justify={"center"} spacing={6}></Stack>
  
            <Wrap>{createTagsFromInterests(interests)}</Wrap>
  
            <Box p={3}>
              <Text>{projectblurb}</Text>
            </Box>
  
            <Button
              w={"full"}
              mt={8}
              bg={useColorModeValue("#151f21", "gray.900")}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg"
              }}
            >
              Message
            </Button>
          </Box>
        </Box>
      </Center>

        );
  }

  useEffect(() => {

    const fetchMembers = async () =>
    {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization:`Bearer ${user.token}`
        },
      };
      const {data} = await axios.get(`http://localhost:5000/api/user?search=`, config);
      setSamples(data);
    }


    fetchMembers().catch(console.error);

  },[]);

  return (
    <SidebarWithHeader >
    <div style={{width:'100%'}}>
      <Wrap spacing="20px" justify="center">
      {console.log(samples)};{createProfileWraps(samples)}
    </Wrap>
    </div>
    </SidebarWithHeader>
  )
}

export default Explore