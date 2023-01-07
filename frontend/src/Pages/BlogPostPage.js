import React from 'react'
import { Flex,  Heading, Text, Link } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import SidebarWithHeader from './SidebarWithHeader'
import {
  Box,
  Center,
  Stack,
  Avatar,
  useColorModeValue,
  Image
} from '@chakra-ui/react';


const BlogPostPage = () => {

    const projectList = 
  [{
    "_id": "63b4b9aeb16e46e68439bed7",
    "projectName": "Counting Beans",
    "projectTopic": "politics",
    "projectDescription": "Creatine and Beans",
    "skillsNeeded": ["python","tensorflow"],
    "creator": 
        {
            "_id": "63afe6b81c31a430afc6abc3",
            "name": "Hirish Chandrasekaran",
            "email": "hirish@ucsb.edu",
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
    "createdAt": "2023-01-03T23:26:38.223Z",
    "updatedAt": "2023-01-03T23:26:38.223Z",
    "__v": 0
  }]

  const blogPostWithImage=()=> {
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
                'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
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
              Blog
            </Text>
            <Heading
              color={'gray'}
              fontSize={'2xl'}
              fontFamily={'body'}>
              Boost your conversion rate
            </Heading>
            <Text color={'gray.500'}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
              et ea rebum.
            </Text>
          </Stack>
          <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
            <Avatar
              src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
              alt={'Author'}
            />
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text fontWeight={600}>Achim Rolle</Text>
              <Text color={'gray.500'}>Feb 08, 2021 · 6min read</Text>
            </Stack>
          </Stack>
        </Box>
      </Center>
    );
  }






  return (
    <div>
        <SidebarWithHeader >
        {blogPostWithImage()}
   
  </SidebarWithHeader>
    </div>
  )
}

export default BlogPostPage

