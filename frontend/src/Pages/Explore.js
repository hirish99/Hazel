import * as React from "react";
import * as ReactDOMClient from "react-dom/client";
import { Box, ChakraProvider, VStack } from "@chakra-ui/react";
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


  const createTagsFromInterests=(interests, skills) =>{
    var a =  skills.map((x) => (
      <Tag variant="solid" colorScheme={"teal"}>
        {" "}
        {x}{" "}
      </Tag>
    )) 
    var b= 
    interests.map((x) => (
      <Tag variant="solid" colorScheme={"green"}>
        {" "}
        {x}{" "}
      </Tag>
    ));

    return [...a, ...b]
  }



  const createOneProfile=(singleUserJSON)=> {
    return SocialProfileWithImage(
      singleUserJSON.name,
      singleUserJSON.pic,
      singleUserJSON.email,
      singleUserJSON.interests,
      singleUserJSON.skills,
      singleUserJSON.projectblurb
    );
  }

  const createProfileWraps=(userJSON) =>{
    return userJSON.map((x) => (<WrapItem>{createOneProfile(x)}</WrapItem>));
  }

  const SocialProfileWithImage= (name, image, email, interests,skills, projectblurb) =>{
    return (
   

      <VStack py={10}>
        <Box
          maxW={"270px"}
          w={"300px"}
          h="500px"
          l="10px"
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

            <Box p={3}   boxShadow='base' h="150px"  rounded='md' bg='white' overflowY='auto' maxHeight="70px">
              <Center>
            <Wrap>{createTagsFromInterests(interests, skills)}</Wrap>
            </Center>
            </Box>
  
            <Box p={2} mt={2} h="150px" boxShadow='base' rounded='md' bg='white' overflowY='auto' maxHeight="130px">
             {projectblurb}
            </Box>




  

          </Box>


        </Box>
        <Box bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        
        w='100%' p={4} color='white'>
          <Center>

          
        <Button
              w={"90%"}
              bg={useColorModeValue("#151f21", "gray.900")}
              justify="bottom"
              align="bottom"
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg"
              }}
            >
              Message
            </Button>
            </Center>
      </Box>

        

      </VStack>

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


  const filterCriteria = (sample) => {
    let needle = ["Tensorflow"];
    let needle1 = ["Trump"];

    if (needle.length ==0 && needle1.length == 0)
      return true;
    

    let haystack = sample.skills;
    let haystack1 = sample.interests;

    return needle.every(i => haystack.includes(i)) && needle1.every(i => haystack1.includes(i));
  }


  return (
    <SidebarWithHeader >
    <div style={{width:'100%'}}>
      <Wrap spacing="20px" justify="center" p={1}>
        {createProfileWraps(samples.filter(sample=>filterCriteria(sample)))}
    </Wrap>
    </div>
    </SidebarWithHeader>
  )
}

export default Explore