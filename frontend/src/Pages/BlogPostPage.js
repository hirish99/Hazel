import React from 'react'
import { Flex,  Heading, Text, Link, Button, WrapItem, Wrap, IconButton, Form} from '@chakra-ui/react'
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

import { useIsomorphicLayoutEffect } from 'framer-motion'


const BlogPostPage = () => {

    const projectList2 = 
  [{
    "projectName": "First Project",
    "projectTopic": "Bananas and Eggs",
    "projectDescription": "A project description should go here",
    "projectImage": "https://img.freepik.com/free-vector/vector-ripe-yellow-banana-bunch-isolated-white-background_1284-45456.jpg?w=2000",
    "skillsNeeded": [
        "The skills you need go here"
    ],
    "creator": {
        "_id": "63afe6b81c31a430afc6abc3",
        "name": "Hirish Chandrasekaran",
        "email": "hirish@ucsb.edu",
        "password": "$2a$10$5EhkNP8gFiPo0UlRlrieteWYcFYi2CrjIlFrjfMTSkCtWf0gwb8OW",
        "pic": "http://res.cloudinary.com/dzz3nkuyy/image/upload/v1672472117/pbfqetm6nefxme5zejl1.jpg",
        "isAdmin": false,
        "major": "Computer Science",
        "interests": [
            "videogames",
            "anime",
            "entrepreneurship",
            "soccer"
        ],
        "projectinterests": [
            "politics",
            "computervision",
            "artificialintelligence"
        ],
        "projectblurb": "Hi! I am Hirish! I am interested in working on a project involving predicting FIFA results!",
        "skills": [
            "python"
        ],
        "__v": 0
    },
    "_id": "63b9e4f55fe9b79785fd23cf",
    "createdAt": "2023-01-06T21:32:37.078Z",
    "updatedAt": "2023-01-06T21:32:37.078Z",
    "__v": 0
  }]
  var str = projectList[0].createdAt
  console.log(createDate(str))
  const blogPostWithImage=(title, pic)=> {
    return (
      createPage(projectList)
    );
  }

  return (
    createPage(projectList)
  )
}


function createAvatar(creator, createdAt){
  return (
  <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
    <Avatar
      src={creator.pic}
      alt={'Author'}
    />
    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
      <Text fontWeight={600}>{creator.name}</Text>
    </Stack>
    <Button>
      Message
    </Button>
  </Stack>
  )
}

function createDate(str){
  var year = str.split('-')[0];
  var month = parseInt(str.split('-')[1].slice(0,2))-1;
  var day = str.split('-')[2].slice(0,2);

  return (Date(year, month, day));
}

function createSingleProjectFromJson(projectJSON){
  var title = projectJSON.projectName;
  var topic = projectJSON.projectTopic;
  var pic = projectJSON.projectImage;
  var blurb = projectJSON.projectDescription;
  var avatar = createAvatar(projectJSON.creator, projectJSON.createdAt);
  
  return (singleProject(title, topic, pic, blurb, avatar))
}

function singleProject(title, topic, pic, blurb, avatar){
  return (
  <Center py={6}>
        <Box
          maxW={'445px'}
          w={'full'}
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
            >
            
            <Image
              src={
                pic
              }
              layout={'fill'}
            />
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
            <Text color={'gray.500'}>
              {blurb}
            </Text>
          </Stack>
          {avatar}
        </Box>
      </Center>
  )
}

function createProjectWraps(projectArray){
  return projectArray.map((x) => (<WrapItem>{createSingleProjectFromJson(x)}</WrapItem>));
  
}

function AddProjectButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
      <IconButton icon={<AddIcon></AddIcon>} colorScheme='teal' onClick={onOpen}></IconButton>
      {createProjectCreateModal(initialRef, finalRef, isOpen, onClose)}
    </>
  )
}

function createProjectCreateModal(initialRef, finalRef, isOpen, onClose){
  return(
  <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Project Name</FormLabel>
              <Input ref={initialRef} id='projectName' placeholder='Provide your project name...' />
            </FormControl>
            <FormControl>
              <FormLabel>Project Topic</FormLabel>
              <Input ref={initialRef} placeholder='Give a topic...' />
  
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Project Image</FormLabel>
              <Input ref={initialRef} type="file" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={saveProjectDetails('test')} colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

function saveProjectDetails(projectName){
  console.log(projectName)
  return('')
}



function createPage(projectArray){
  return (
    
    <SidebarWithHeader >
      <AddProjectButton></AddProjectButton>
      <div style={{width:'100%'}}>
        <Wrap spacing="20px" justify="center">
          {console.log(projectArray)};{createProjectWraps(projectArray)}
        </Wrap>
      </div>
    </SidebarWithHeader>
  )
}

export default BlogPostPage


const projectList = 
  [{
    "projectName": "First Project",
    "projectTopic": "Bananas and Eggs",
    "projectDescription": "A project description should go here",
    "projectImage": "https://img.freepik.com/free-vector/vector-ripe-yellow-banana-bunch-isolated-white-background_1284-45456.jpg?w=2000",
    "skillsNeeded": [
        "The skills you need go here"
    ],
    "creator": {
        "_id": "63afe6b81c31a430afc6abc3",
        "name": "Hirish Chandrasekaran",
        "email": "hirish@ucsb.edu",
        "password": "$2a$10$5EhkNP8gFiPo0UlRlrieteWYcFYi2CrjIlFrjfMTSkCtWf0gwb8OW",
        "pic": "http://res.cloudinary.com/dzz3nkuyy/image/upload/v1672472117/pbfqetm6nefxme5zejl1.jpg",
        "isAdmin": false,
        "major": "Computer Science",
        "interests": [
            "videogames",
            "anime",
            "entrepreneurship",
            "soccer"
        ],
        "projectinterests": [
            "politics",
            "computervision",
            "artificialintelligence"
        ],
        "projectblurb": "Hi! I am Hirish! I am interested in working on a project involving predicting FIFA results!",
        "skills": [
            "python"
        ],
        "__v": 0
    },
    "_id": "63b9e4f55fe9b79785fd23cf",
    "createdAt": "2023-01-06T21:32:37.078Z",
    "updatedAt": "2023-01-06T21:32:37.078Z",
    "__v": 0
  },
  {
    "projectName": "Second Project",
    "projectTopic": "Pancakes",
    "projectDescription": "A project description about pancakes",
    "projectImage": "https://img.freepik.com/free-vector/vector-ripe-yellow-banana-bunch-isolated-white-background_1284-45456.jpg?w=2000",
    "skillsNeeded": [
        "The skills you need go here"
    ],
    "creator": {
        "_id": "63afe6b81c31a430afc6abc3",
        "name": "Connor Levenson",
        "email": "hirish@ucsb.edu",
        "password": "$2a$10$5EhkNP8gFiPo0UlRlrieteWYcFYi2CrjIlFrjfMTSkCtWf0gwb8OW",
        "pic": "http://res.cloudinary.com/dzz3nkuyy/image/upload/v1672472117/pbfqetm6nefxme5zejl1.jpg",
        "isAdmin": false,
        "major": "Computer Science",
        "interests": [
            "videogames",
            "anime",
            "entrepreneurship",
            "soccer"
        ],
        "projectinterests": [
            "politics",
            "computervision",
            "artificialintelligence"
        ],
        "projectblurb": "Hi! I am Hirish! I am interested in working on a project involving predicting FIFA results!",
        "skills": [
            "python"
        ],
        "__v": 0
    },
    "_id": "63b9e4f55fe9b79785fd23cf",
    "createdAt": "2023-01-06T21:32:37.078Z",
    "updatedAt": "2023-01-06T21:32:37.078Z",
    "__v": 0
  }]