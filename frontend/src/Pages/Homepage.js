import React from 'react'
import { Container, Box, Text,Tabs,TabList,Tab,TabPanel,TabPanels} from '@chakra-ui/react'
import SignUp from './SignUp';
import Login from './Login';

const Homepage = () => {
  return <Container maxW='xl' centerContent>
    {/* <Box
    d='flex'
    justifyContent='flex-start'
    textAlign="center"
    //bgGradient="linear(to-t, orange.200, pink.500)"
    bgGradient='linear(to-t, #7928CA, #FF0080)'
    //bgGradient='linear(to-t, #7928CA, orange.200)'
    p={8}
    opacity="0.99"
    w="100%"
    m = "20px 0 15px 0"
    borderRadius="xl"
    >
      <Text color="white" fontSize='8xl'noOfLines={1}
      >Hazel

      </Text>
    </Box> */}

    <Box
    d="flex"
    justifyContent='flex-start'
    textAlign="center"
    bgGradient="linear(to-t, orange.200, pink.500)"
    //bgGradient='linear(to-t,  #C9C789,   #C9C789)'
    opacity="0.9"
    p={3}
    w="100%"
    m = "15px 0 15px 0"
    borderRadius="xl"
    >
      <Text color="white" fontSize='8xl'noOfLines={1}
      >Hazel

      </Text>
    <Tabs variant='soft-rounded'  isFitted >
      <TabList>
        <Tab color="white" _selected={{  bg: 'blue.500' }}>Login</Tab>
        <Tab color="white" _selected={{ bg: 'blue.500' }}>Sign Up</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Login/>
        </TabPanel>
        <TabPanel>
          <SignUp/>
        </TabPanel>
      </TabPanels>
      </Tabs>
    </Box>
    
  </Container>;
};

export default Homepage