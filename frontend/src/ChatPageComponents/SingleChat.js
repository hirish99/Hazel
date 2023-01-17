import {React, useState, initialState, useEffect} from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Center, Text, VStack, Box, Button,  Spacer,Container, Flex, HStack, FormControl, Input,useToast, ModalFooter,useEditable,useDisclosure,Modal,ModalOverlay,ModalBody,ModalContent,ModalHeader,ModalCloseButton} from '@chakra-ui/react';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';
import io from "socket.io-client"
import { SearchIcon, ViewIcon, ArrowLeftIcon } from '@chakra-ui/icons'
import MyChats from './MyChats';
import { Drawer, DrawerOverlay,DrawerContent, DrawerHeader,DrawerCloseButton}from '@chakra-ui/react';


const ENDPOINT = "https://hazel.herokuapp.com";
var socket, selectedChatCompare;

const SingleChat = () => {
  const {selectedChat, user, setSelectedChat} =  ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
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
      //console.log(userData._id);
      socket.emit("connected");
    });
  });

    
    useEffect(() => {
      fetchMessages();
  
      selectedChatCompare = selectedChat;
      // eslint-disable-next-line
    }, [selectedChat]);

  useEffect(() => {
    socket.on("message_recieved", (newMessageRecieved)=>{
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id)
      {
        //give notification
      }
      else {
        setMessages([...messages,newMessageRecieved]);
      }
    })});
    
 



  





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

        //console.log(data);

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

      <>


      <Drawer isOpen={isOpen} onClose={onClose}
      placement='left'
      >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Chat List</DrawerHeader>
        <DrawerCloseButton />
        <Box
        w="100%"
        l="100%">
        <MyChats></MyChats>
        </Box>
        


      </DrawerContent>
      </Drawer>
      </>
    
      <Flex
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        d="flex"
        w="100%"
        alignItems="center"
        justifyContent="space-between">
        
        <Button
          d="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          ml={0}
          leftIcon={<ArrowLeftIcon />}
          onClick={onOpen}
          >
          
            <Text d={{ base: "none", md: "flex" }}>
              Chats
              </Text>
          </Button>


        <Center>{!selectedChat && <Text>Chat</Text>}{selectedChat && selectedChat.users.length>2 && selectedChat.chatName}{(selectedChat && selectedChat.users.length<=2)&&((selectedChat.users.filter(u=>u.name !== JSON.parse(localStorage.getItem("userInfo")).name)).map(s=>(s.name)))}</Center>
        <Button
          d="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          ml={0}
          rightIcon={<ViewIcon />}>
            <Text d={{ base: "none", md: "flex" }}>
              Info
              </Text>
          </Button>
      </Flex>

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
