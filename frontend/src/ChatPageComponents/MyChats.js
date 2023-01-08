import { Spacer, useToast, VStack } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import React from 'react'
import {ChatState} from "../Context/ChatProvider";
import axios from 'axios';
import {Flex, Text, Button, Box, HStack, Stack, Center } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import GroupChatModal from './Modals/GroupChatModal';
import {Tooltip,Icon, Modal, Input,useDisclosure, ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody} from '@chakra-ui/react'
import UserListItem from './UserListItem';
import {SearchIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom';
import { Avatar, AvatarGroup } from '@chakra-ui/react';
import io from "socket.io-client"

const ENDPOINT = "http://localhost:5000";
var socket;

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  /*Importing Search*/
  const {selectedChat, setSelectedChat, chats, setChats, user, setUser} = ChatState();
  const onCloseHelper=()=> {
    onClose();
    setSearchResult([]);
  }
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Search Empty",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-center",
      })
    }

    try {

        const config = {
          headers: {
            Authorization:`Bearer ${user.token}`
          },
        };

        const {data} = await axios.get(`http://localhost:5000/api/user?search=${search}`, config);

        setSearchResult(data);

        console.log(data);

    }
    catch(err){
      console.log(err);
      toast({
        title: "API Call to Search Failed",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-center",
      })
    }

  }

  const accessChat = async (userId) => {
    console.log(userId);



    try{
      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
      };

      const {data} = await axios.post("http://localhost:5000/api/chat", {userId}, config);



      if (!chats.find((c) => c._id === data._id))
      {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);

      socket.emit("update_chat", data);

      onClose();
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
}



  /*Importing Search*/

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const toast = useToast();

  const history = useHistory();

  const getSender = (users) => {
    console.log("PROBLEM")
    console.log(loggedUser)
    console.log("PROBLEM")
    return users[0]._id === JSON.parse(localStorage.getItem("userInfo"))._id ? users[1].name : users[0].name;
  }

  const getIndex  = (users) => {
    return users[0]._id === JSON.parse(localStorage.getItem("userInfo"))._id ? 1: 0;
  }

  useEffect(() => {
  socket = io(ENDPOINT);
  socket.emit("setup", user);
  socket.on('connection', (userData)=>{
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });
});

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization:`Bearer ${user.token}`,
        },
      };
      const {data} = await axios.get(`http://localhost:5000/api/chat/fetch`, config);
      setChats(data);
    }
    catch(error)
    {
      /*
      console.log(user);
      console.log(error);
      toast({
        title: "Error Occurred!",
        description: "Reload Page - API Issue",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      */
    }
  }

  useEffect(() => {
    socket.on("update_chat_recieved", (newChatCreated)=>{

    console.log(newChatCreated);
    fetchChats();


        
    })
  });

  useEffect(()=>{
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    setUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [])

  return (
    <>
    
    <Flex
    d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
    flexDir="column"
    alignItems="center"
    p={3}
    bg="white"
    w={{ base: "100%", md: "34%" }}
    borderRadius="lg"
    borderWidth="1px"
    h='100%'
  >
    <Box
      pb={3}
      px={3}
      fontSize={{ base: "28px", md: "30px" }}
      d="flex"
      w="100%"
      alignItems="center"
      justifyContent="space-between"
    >
      
      <Flex
      justifyContent={"space-between"}
      alignContent="center"
      >
      

      
      

     

      <span>

    
      <Button
          d="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          ml={0}
          rightIcon={<SearchIcon />}onClick={onOpen}>
            <Text d={{ base: "none", md: "flex" }}>
              User
              </Text>
          </Button>
          </span>


          <GroupChatModal>
          <Button
          d="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
          >
            <Text d={{ base: "none", md: "flex" }}>
                Group
              </Text>
          </Button>
        </GroupChatModal>


      

        </Flex>
      </Box>

      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="auto"
      >
        {chats ? (
            <Stack overflowY='scroll'>
                {chats.map((chat)=>(
                  <Flex
                  onClick={()=>setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat===chat ?  "#38B2AC":"#E8E8E8"}
                  color={selectedChat===chat?"white":"black"}
                  px={3}
                  py={3}
                  borderRadius="lg"
                  key={chat._id}
                  justifyContent="space-between"
                  >
                    <Text
                     py={3}
                    >
                      {/* {!chat.isGroupChat?(
                        getSender(loggedUser, chat.users)
                      ):(chat.chatName)} */}
                      {console.log(chat)}
                      {!chat.isGroupChat?(getSender(chat.users)):(chat.chatName)}
                    </Text>



                    {!chat.isGroupChat &&
                    <Avatar name={chat.users[getIndex(chat.users)].name} src={chat.users[getIndex(chat.users)].pic} />}

                    {chat.isGroupChat &&
                    <AvatarGroup>
                        {(chat.users).map((u)=>(<Avatar name={u.name} src={u.pic} />))}
                    </AvatarGroup>
                    }


                  </Flex>
                ))}
            </Stack>
        ):(
            <ChatLoading />
        )}
      </Box>
    </Flex>


    <Modal size="lg" onClose={onCloseHelper} isOpen={isOpen} isCentered>
        <ModalOverlay />
          <ModalContent>
          <ModalHeader
            d="flex"
            justifyContent="center"
          >
           <Center> <Text> Message User</Text></Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box d="flex" pb={2}>
              <Input
              placeholder="Search by name or email"
              mr={2}
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              />
              <Button width="100%" colorScheme="blue" style={{marginTop: 15}} onClick={handleSearch}>Go</Button>
            </Box>

            {false ? <ChatLoading/> : 
              (
                searchResult?.map(user=> (
                  <UserListItem key={user._id} user={user} handleFunction={()=>accessChat(user._id)}
                  />
                ))
              )
            }

          </ModalBody>
          </ModalContent>
      </Modal>

    </>
  );
}

export default MyChats
