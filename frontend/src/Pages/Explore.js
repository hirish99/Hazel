import * as React from "react";
import * as ReactDOMClient from "react-dom/client";
import { Box, ChakraProvider, VStack } from "@chakra-ui/react";
import { CUIAutoComplete } from 'chakra-ui-autocomplete'
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
  useColorModeValue,
  useToast
} from "@chakra-ui/react";

import SidebarWithHeader from "./SidebarWithHeader";

import { useEffect ,useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";

import io from "socket.io-client";
const ENDPOINT = "https://hazel.herokuapp.com";
var socket;

const Explore = () => {


  const toast = useToast();
  const history = useHistory();
  

  const { possibleSkills, possibleinterests,setSelectedChat,setChats, user, setUser,chats } = ChatState();



  useEffect(() => {

    setUser(JSON.parse(localStorage.getItem("userInfo")));


    if (user)  {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on('connection', (userData)=>{
      socket.join(userData._id);
      //console.log(userData._id);
      socket.emit("connected");
    });
  }

    const fetchMembers = async () =>
    {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization:`Bearer ${user.token}`
        },
      };
      const {data} = await axios.get(`https://hazel.herokuapp.com/api/user?search=`, config);
      setSamples(data);
    }


    fetchMembers().catch(console.error);
  },[]);
  const accessChat = async (userId) => {

    



    try{
      
      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
      };

      const {data} = await axios.post(`https://hazel.herokuapp.com/api/chat`, {userId}, config);



      if (!chats.find((c) => c._id === data._id))
      {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);

      socket.emit("update_chat", data);



  


    }
    catch(error)
    {
        toast({
          title: "Error fetching the chat",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "botton-left",
        })
    }

    history.push("/chats");
  }

  const [pickerItems, setPickerItems] = React.useState(possibleinterests);
  const [interestsP, setSelectedItems] = React.useState([]);

  const [pickerItems2, setPickerItems2] = React.useState(possibleSkills);
  const [skillsP, setSelectedItems2] = React.useState([]);



  const handleCreateItem = (item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleCreateItem2 = (item) => {
    setPickerItems2((curr) => [...curr, item]);
    setSelectedItems2((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  const handleSelectedItemsChange2 = (selectedItems2) => {
    if (selectedItems2) {
      setSelectedItems2(selectedItems2);
    }
  };





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
      singleUserJSON._id,
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

  const SocialProfileWithImage= (id, name, image, email, interests,skills, projectblurb) =>{
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

            <Box p={3}    h="150px"  rounded='md' bg='white' overflowY='auto' maxHeight="70px">
              <Center>
            <Wrap>{createTagsFromInterests(interests, skills)}</Wrap>
            </Center>
            </Box>
  
            <Box p={2} mt={2} h="150px" rounded='md' bg='white' overflowY='auto' maxHeight="130px">
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
              onClick={() => accessChat(id)}
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
              Message Me
            </Button>
            </Center>
      </Box>

        

      </VStack>

        );
  }




  const filterCriteria = (sample) => {
    let needle = skillsP.map(element => element.value);
    let needle1 = interestsP.map(element => element.value);

    let haystack = sample.skills;
    let haystack1 = sample.interests;

    return ((needle.length===0 || needle.every(i => haystack.includes(i))) && (needle1.length===0 || needle1.every(i => haystack1.includes(i))));
  }


  return (
    <SidebarWithHeader >
    <div style={{width:'100%'}}>

    <Box 
          d="flex"
          flexDir="column"
          justifyContent={"space-between"}
          p={10}
          bg="white"
          w="100%"
          h="90%"
          borderRadius="lg"
    
    >

    
    <CUIAutoComplete
          label="Filter by Interest"
          placeholder="Type a Interest"
          onCreateItem={handleCreateItem}
          items={pickerItems}
          selectedItems={interestsP}
          onSelectedItemsChange={(changes) =>
            handleSelectedItemsChange(changes.selectedItems)
          }/>

    <CUIAutoComplete
          label="Filter by Skill"
          placeholder="Type a Skill"
          onCreateItem={handleCreateItem2}
          items={pickerItems2}
          selectedItems={skillsP}
          onSelectedItemsChange={(changes) =>
            handleSelectedItemsChange2(changes.selectedItems)
          }/>
      </Box>




      <Wrap spacing="20px" justify="center" p={1}>
        {createProfileWraps(samples.filter(sample=>filterCriteria(sample)))}
    </Wrap>
    </div>
    </SidebarWithHeader>
  )
}

export default Explore