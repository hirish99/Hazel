import React, { useEffect, useState } from 'react'
import { Flex,  Heading, Text, Link, Button, WrapItem, Wrap, IconButton, Form, useToast} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  Tag,
  CloseButton,
  HStack
} from '@chakra-ui/react'
import { AddIcon} from '@chakra-ui/icons'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import SidebarWithHeader from './SidebarWithHeader'
import { motion, useAnimation } from "framer-motion";
import {
  Box,
  Center,
  Stack,
  Avatar,
  useColorModeValue,
  Image
} from '@chakra-ui/react';

import axios from "axios"
import { ChatState } from '../Context/ChatProvider'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'

import { useHistory } from 'react-router-dom'

import io from "socket.io-client";
const ENDPOINT = "https://hazel1-dec15cd7c072.herokuapp.com";
var socket;




const BlogPostPage = () => {

  const [school, setSchool] = useState("");
  const [club, setClub] = useState(JSON.parse(localStorage.getItem("userInfo")).club);

  const history = useHistory();
  const [projectList, setProjectList] = useState([]);
  const {user, setUser,possibleSkills, possibleProjects, chats, setChats, setSelectedChat } = ChatState();

  const [selectedTopic, setSelectedTopic] = useState();

  const [projectName, setProjectName] = useState();
  const [topic, setTopic] = useState();
  const [projectDescription, setProjectDescription] = useState();


  const [pickerItems2, setPickerItems2] = React.useState(possibleSkills);
  const [skills, setSelectedItems2] = React.useState([]);



  const [pic, setPic] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();


  const handleCreateItem2 = (item) => {
    setPickerItems2((curr) => [...curr, item]);
    setSelectedItems2((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange2 = (selectedItems2) => {
    //console.log(selectedItems2);
    if (selectedItems2) {
      setSelectedItems2(selectedItems2);
    }
  };



  const postDetails = (pics)=> {
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.size > 1000000) {
      toast({
        title: "Image Larger than 1MB! Servers Can't Handle Yet!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dzz3nkuyy");
      fetch("https://api.cloudinary.com/v1_1/dzz3nkuyy/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          //console.log(data.url.toString());
        })
        .catch((err) => {
          //console.log(err);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  };

  const createProject = async () => {

    const project = {
      "projectName": projectName,
      "projectTopic": topic,
      "projectDescription": projectDescription,
      "skillsNeeded": skills.map(element => element.value),
      "pic": pic,
    }
    if (projectName.length>30){
      toast({
        title: "Project Name Too Large",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (!projectName || !topic || !projectDescription || !project.skillsNeeded || !pic) {
      toast({
        title: "Please Fill All Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try{
      
      //console.log(project);

      const config = {
        headers: {
          Authorization:`Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`
        },
      };

      const {data} = await axios.post(`https://hazel1-dec15cd7c072.herokuapp.com/api/project`, project, config);

      fetchProjects();
      
      onClose();
    }
    catch(error)
    {
      //console.log(error);
    }

  }

  const fetchProjects = async () => {
    try {
      setUser(JSON.parse(localStorage.getItem("userInfo")));
      const config = {
        headers: {
          Authorization:`Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`
        },
      };

      const {data} = await axios.get(`https://hazel1-dec15cd7c072.herokuapp.com/api/project/?search=`, config);

      setProjectList(data);

      //console.log("Hello");
  }



  catch(err){
    //console.log(err);
/*      toast({
      title: "API Call to Search Failed",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-center",u
    })  */
  }

  }


  const accessChat = async (userId) => {

    try{

      
      
      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
      };

      const {data} = await axios.post(`https://hazel1-dec15cd7c072.herokuapp.com/api/chat`, {userId}, config);




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

  

  useEffect(()=>{

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


    fetchProjects();

  },[]);



  const createAvatar = (id, creator, createdAt) => {
    return (
    <Stack mt={6} direction={'row'} spacing={4} align={'center'}justify='space-between' >
      <Stack direction={'row'} spacing={0} fontSize={'sm'} >
      <Avatar
        src={creator.pic}
        alt={'Author'}
      />
      <Box p={3}>
      <Text fontWeight={600}>{creator.name}</Text>
      </Box>
        
      </Stack>
      <Flex>
        {JSON.parse(localStorage.getItem("userInfo"))._id !== creator._id &&  <Button onClick={()=>{accessChat(creator._id)}}>
        Message
      </Button>}
     
      {JSON.parse(localStorage.getItem("userInfo"))._id === creator._id && <CloseButton p ={5} onClick={()=>{handleDelete(id)}}></CloseButton>}
      </Flex>
      
      
    </Stack>
    )
  }
  const createDate = (str) => { 
    var year = str.split('-')[0];
    var month = parseInt(str.split('-')[1].slice(0,2))-1;
    var day = str.split('-')[2].slice(0,2);
  
    return (Date(year, month, day));
  }
  const createSingleProjectFromJson=(projectJSON)=>{
    var title = projectJSON.projectName;
    var topic = projectJSON.projectTopic;
    var pic = projectJSON.pic;
    var blurb = projectJSON.projectDescription;
    var avatar = createAvatar(projectJSON._id, projectJSON.creator, projectJSON.createdAt);
    var skillsN = projectJSON.skillsNeeded;
    
    return (singleProject(title, topic, pic, blurb, avatar, skillsN))
  }

  const createTagsFromInterests=(skills) =>{
    var a =  skills.map((x) => (
      <Tag variant="solid" colorScheme={"teal"} m={1}>
        {" "}
        {x}{" "}
      </Tag>
    )) 
    

    return a
  }

  const handleDelete=async(projectId)=>{
    try {



      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`
        },
      };

      const {data} = await axios.post(`https://hazel1-dec15cd7c072.herokuapp.com/api/project/delete`,{_id: projectId}, config);

      fetchProjects();

      //console.log(data);

  }
  catch(err){
    console.log(err);
    toast({
      title: "Delete Failed",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-center",
    })
  }
  }

  const singleProject=(title, topic, pic, blurb, avatar, skillsN)=>{
    return (
    <Center py={6}>
          <Box
            maxW={'445px'}
            maxH={'590px'}
            h="590px"
            w={'100%'}
            bg={"white"}
            boxShadow={'2xl'}
            rounded={'md'}
            p={6}
            overflow={'hidden'}>
            <Box
              h={'210px'}
              bg={'gray.100'}
              mt={-6}
              mx={-6}
              mb={6}
              pos={'relative'}
              overflowY="hidden"
              backgroundImage={pic}
              >
       

        
              
              
              <Stack direction='row' spacing={6}>
          

          </Stack>

            </Box>
            <Stack>
              <Text
                color={'green.500'}
                textTransform={'uppercase'}
                fontWeight={800}
                fontSize={'sm'}
                letterSpacing={1.1}>
                {topic}
              </Text>
              <Heading
                color={'gray'}
                fontSize={'2xl'}
                fontFamily={'body'}>
                {title}
              </Heading>
              <Text color={'gray.500'} overflowY='auto' h="140px" maxH="140px">
                {blurb}
              </Text>
              

            </Stack>
            <Box
            h='60px'
            maxH="60px"
            overflowY="auto"
            >
            {createTagsFromInterests(skillsN)}
            </Box>
            {avatar}
          </Box>
        </Center>
    )
  }
  const createProjectWraps=(projectArray)=>{
    return projectArray.map((x) => (<WrapItem key={x._id}>{createSingleProjectFromJson(x)}</WrapItem>));
  }
  const AddProjectButton=() => {

    return (
      <>
        <IconButton mb={5} icon={<AddIcon></AddIcon>} colorScheme='teal' onClick={onOpen}>
        </IconButton>

      </>
    )
  }
  

  const filterCriteria = (x) => {

    if (!selectedTopic || selectedTopic==='')
    {
        return (school==null || x.creator.school === school) && (club== null || x.creator.club === club)
    }
    return (x.projectTopic === selectedTopic) && (school==null ||school.length==0 ||x.creator.school === school) && (club== null || club.length==0 || x.creator.club === club)
  }


  return (
    <>
    
   
    <SidebarWithHeader >
    

    <Flex
          d="flex"
          flexDir="column"
          justifyContent={"space-between"}
          p={10}
          bg="white"
          w="100%"
          h="90%"
          borderRadius="lg"
    
    >
<AddProjectButton></AddProjectButton>
    <FormControl >
        <Select placeholder='Select Topic To Filter'
        onChange={(e)=>setSelectedTopic(e.target.value)}
        mb={3}
        >
          {possibleProjects.map((x)=>(
          
          <option>{x.value}</option>))}
        </Select>
        </FormControl>
        
        
        <Select placeholder='Select School'
        onChange={(e)=>setSchool(e.target.value)}
        mb={3}
        >
            <option>University of California, Santa Barbara</option>
            <option>University of Illinois, Urbana-Champaign</option>
            <option>Independent</option>
        </Select>

        <Select placeholder='Select Club'
        onChange={(e)=>setClub(e.target.value)}
        mb={3}
        >
          {school === "University of California, Santa Barbara"
          &&
          <>
          <option>Data Science UCSB</option>
          <option>No Affiliation</option>
          </>
          }
          {school === "University of Illinois, Urbana-Champaign"
          &&
            <>
            <option>ACM UIUC SIGPwny</option>
            <option>ACM UIUC SIGAIDA</option>
            <option>ACM UIUC SIGMobile</option>
            <option>ACM UIUC GameBuilders</option>
            <option>ACM UIUC SIGGRAPH</option>
            <option>ACM UIUC SIGMusic</option>
            <option>Illinois Design Challenge</option>
            <option>No Affiliation</option>
            </>
          }
          {school === "Independent"
          &&
            <option>No Affiliation</option>
          }





        </Select>


        
        </Flex>
    
    



    <div style={{width:'100%'}}>
      <Wrap spacing="20px" justify="center">
        {createProjectWraps(projectList.filter(x=>filterCriteria(x)))}
      </Wrap>
    </div>
  </SidebarWithHeader>

  <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Project</ModalHeader>
            <ModalBody pb={6}>


              <FormControl>
                <FormLabel>Project Name</FormLabel>
                <Input  onChange={(e)=>{setProjectName(e.target.value)}} id='projectName' placeholder='Provide your project name...' />
              </FormControl>

              <FormControl isRequired>
        <FormLabel>Topic</FormLabel>
        <Select placeholder='Select Topic'
        onChange={(e)=>setTopic(e.target.value)}
        >
          {possibleProjects.map((x)=>(
          
          <option>{x.value}</option>))}
        </Select>

        
        </FormControl>

            <FormControl>
              <FormLabel>Project Description</FormLabel>
                <Textarea
                  placeholder="Bio Goes Here"
                  _placeholder={{ color: 'gray.500' }}
                  type="text"
                  onChange={(e)=>{setProjectDescription(e.target.value)}}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Project Image</FormLabel>
                <Input
                type="file"
                p={1.5}
                accept="image/*"
                sx={{
                    "::file-selector-button": {
                        borderRadius: 2,
                        mr: 3,
                        justifyContent: "center",
                    },
                    }}
                onChange={(e)=>postDetails(e.target.files[0])}
                />
              </FormControl>
            </ModalBody>


            <Center>
            <Box w="90%">
            <CUIAutoComplete
          label="Select Skills You Need"
          placeholder="Type a Skill"
          onCreateItem={handleCreateItem2}
          items={pickerItems2}
          selectedItems={skills}
          onSelectedItemsChange={(changes) =>
            handleSelectedItemsChange2(changes.selectedItems)
          }/>
          </Box>
          </Center>
  
            <ModalFooter>
              <Button onClick={()=>createProject()} colorScheme='blue' mr={3}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal> 
</>
  )
}





















export default BlogPostPage


