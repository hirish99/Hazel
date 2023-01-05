import React from 'react'
import { Flex, Box, Heading, Text, Link } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import SidebarWithHeader from './SidebarWithHeader'

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

const BlogPostReplacement = ({projectInfo}) => 
{
  
}


const BlogPost = ({ title, summary, image, link }) => (
  <Box p={5} shadow="md" borderWidth="1px">
    <Heading as="h3" size="lg">{title}</Heading>
    <Box mt={4}>
      <img src={image} alt={title} />
    </Box>
    <Text mt={4}>{summary}</Text>
    <Link href={link} mt={4}>Read More</Link>
  </Box>
)

const BlogPostPage = () => (
  <SidebarWithHeader >
    <Flex justifyContent="center" mt={4}>
      <Box width={['100%', '80%', '60%', '40%']}>
        <BlogPost
          title="Blog Post 1"
          summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          image="http://res.cloudinary.com/dzz3nkuyy/image/upload/v1672472117/pbfqetm6nefxme5zejl1.jpg"
          link="/blog/post1"
        />
        <BlogPost
          title="Blog Post 2"
          summary="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          image="http://res.cloudinary.com/dzz3nkuyy/image/upload/v1672472117/pbfqetm6nefxme5zejl1.jpg"
          link="/blog/post2"
        />
        <BlogPost
          title="Blog Post 3"
          summary="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          image="http://res.cloudinary.com/dzz3nkuyy/image/upload/v1672472117/pbfqetm6nefxme5zejl1.jpg"
          link="/blog/post3"
        />
      </Box>
    </Flex>
  </SidebarWithHeader>
)

export default BlogPostPage
