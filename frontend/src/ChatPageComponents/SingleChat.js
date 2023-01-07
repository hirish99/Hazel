import {React, useState, initialState, useEffect} from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Center, Text, VStack, Box, Spacer,Container, Flex, HStack, FormControl, Input,useToast, useEditable} from '@chakra-ui/react';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';
import io from "socket.io-client"

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = () => {
  const {selectedChat, user, setSelectedChat} =  ChatState();
  
  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();

  const toast = useToast();

  const fetchMessages= async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        },
      };

      setLoading(true);

      const {data} = await axios.get(`/api/message/${selectedChat._id}`, config);
      setMessages(data);
      setLoading(false);

      socket.emit("join_chat", selectedChat._id);
    }
    catch(error) {

    }
  }

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on('connection', (userData)=>{
      socket.join(userData._id);
      console.log(userData._id);
      socket.emit("connected");
    })

    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat])

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved)=>{
    if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id)
    {
      //give notification
    }
    else {
      setMessages([...messages,newMessageRecieved]);
    }
  });
  });



  





  const sendMessage = async (event) => {
    if (event.code==="Enter" && newMessage) {
      try {
        const config = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
          },
        };

        const {data} = await axios.post('/api/message',
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        )

        console.log(data);

        socket.emit("new_message", data);

        setNewMessage("");
        setMessages([...messages,data]);
      }
      catch (error) {
        toast({
          title:"Error Occurred!",
          description:"Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true
        })
      }
    }
  }

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

  }

  return (
    <>
    
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        d="flex"
        w="100%"
        alignItems="center"
        justifyContent="space-between">

        <Center>Chat</Center>
      </Box>

      {selectedChat && 
      <>
      <Box
      d="flex"
      flexDir="column"
      justifyContent={"space-between"}
      p={1}
      bg="#E8E8E8"
      w="100%"
      h="90%"
      borderRadius="lg"
      overflowY="auto"
      >
          <Box>
            {!loading && <ScrollableChat messages={messages} />}
          </Box>

          
          

          
      </Box>
      <Box
          d="flex"
          h="auto"
          w="100%"
          >
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
            <Input
              variant="filled"
              bg="#E8E8E8"
              placeholder="Enter a message..."
              onChange={typingHandler}
              value={newMessage}

            >
            </Input>
            </FormControl>

          </Box>

      </>
      
      }
      
      

      {!selectedChat && <Flex
      d="flex"
      flexDir="row"
      justify='center'
      bg="#E8E8E8"
      w="100%"
      h="100%"
      borderRadius="lg"
      overflowY="hidden">

          <Center>
            <Text fontSize="3xl" fontFamily="Work sans">
                    Click on a user to start chatting
            </Text>
          </Center>

      </Flex>}
    </>


    
  )
}

export default SingleChat
