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
import SideDrawer from "../ChatPageComponents/SideDrawer";

// add major to each person -  add a filter button that
// people can filter by

const Explore = () => {


/* const samples = [
  {
    _id: "63afa1681c28e81e755fa0dc",
    name: "Connor Levenson",
    email: "clevenson@ucsb.edu",
    password: "$2a$10$Dx50n6s2g1l.8jmm/THxE.GiwpWxqo7wQuE7u01a6lKZzY9jnMMwW",
    pic:
      "https://res.cloudinary.com/dzz3nkuyy/image/upload/v1672202058/dcfgeabl7xfqe2vdibmi.jpg",
    isAdmin: false,
    major: "Data Science",
    interests: ["Golf", "Trump", "Joe Biden", "Football"],
    projectinterests: ["Beef", "Cooking"],
    projectblurb: "I like golf and trump and this relates to beef and cooking",
    skills: ["Octave", "React"],
    __v: 0
  },
  {
    _id: "63afa26da39e0d08aba40e3a",
    name: "Kennard Peters",
    email: "kennardpeters@ucsb.edu",
    password: "$2a$10$5n0ahhFFtNKcWyEurxgfYej4LswRcKru9/3aj2UB6LpRa8TNRwKMG",
    pic:
      "https://res.cloudinary.com/dzz3nkuyy/image/upload/v1672202058/dcfgeabl7xfqe2vdibmi.jpg",
    isAdmin: false,
    major: "Financial Math",
    interests: ["Tennis", "Biden"],
    projectinterests: ["Creatine", "Beans"],
    projectblurb:
      "I like tennis and biden and this relates to creatine and beans",
    skills: ["Python", "Swift"],
    __v: 0
  }
]; */


const [samples, setSamples] =  useState([]);

const fetchMembers = async () =>
{
  try{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        Authorization:`Bearer ${user.token}`
      },
    };
    const {data} = await axios.get(`http://localhost:5000/api/user?search=`, config);
    console.log(data);
    setSamples(data);
  }
  catch (error)
  {
    console.log(error);
  }
}

useEffect(() => {
  fetchMembers();

},[]);

const imURL =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ";


  function SocialProfileWithImage(name, image, email, interests, projectblurb) {
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
  
  //function
  
  function createOneProfile(singleUserJSON) {
    return SocialProfileWithImage(
      singleUserJSON.name,
      singleUserJSON.pic,
      singleUserJSON.email,
      singleUserJSON.interests,
      singleUserJSON.projectblurb
    );
  }
  
  function createProfileWraps(userJSON) {
    return userJSON.map((x) => <WrapItem>{createOneProfile(x)}</WrapItem>);
  }
  
  function createTagsFromInterests(interests) {
    return interests.map((x) => (
      <Tag variant="solid" colorScheme="teal">
        {" "}
        {x}{" "}
      </Tag>
    ));
  }


  const {user} = ChatState();



  return (
    <SidebarWithHeader >
    <div style={{width:'100%'}}>
    {user && <SideDrawer displaySearch={false}/>}
      <Wrap spacing="20px" justify="center">
      {console.log(samples)};{createProfileWraps(samples)}
    </Wrap>
    </div>
    </SidebarWithHeader>
  )
}

export default Explore