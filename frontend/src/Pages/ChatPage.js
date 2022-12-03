import axios from 'axios'
import React from 'react'
import '../chatstyle.css';
import { useEffect, useState} from 'react';
import { Container, Box, Text} from '@chakra-ui/react';


const ChatPage = () => {
  const [chats, setChats] = useState([]);

  /*
  const fetchChats= async () => {
    //You cannot directly call the API in the use effect so you 
    //create a new async function to use await.
    //We are utilizing the functions we wrote on the backend here:
    const data = await axios.get("/api/chat");
    //console.log(data)
    setChats(data)
    console.log(chats)
  }

    <div>
    {chats.map((chat) => (
      <div key={chat._id}>{chat.chatName}</div>
    ))}
  </div>
  */

  useEffect(() => {
    axios.get('/api/chat')
    .then(res => setChats(res.data))
    .catch(err => console.log(err));
  }, [])
  
  return (
    <span className = "chatstyle">
    <Container maxW='xl' centerContent>
      <Box
    d='flex'
    justifyContent='flex-start'
    textAlign="center"
    bgGradient="linear(to-t, orange.200, pink.500)"
    //bgGradient="linear(to-t, #FF0080, pink.500)"
    p={3}
    w="100%"
    m = "15px 0 15px 0"
    borderRadius="xl"
    >
      <Text color="white" fontSize='8xl'noOfLines={1}
      >
        

      </Text>

      {chats.map((chat) => (
      <Text key={chat._id}>{chat.chatName}</Text>
    ))}
    </Box>

    
    
    </Container>
    </span>
    
  );
};

export default ChatPage
