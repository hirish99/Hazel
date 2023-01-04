import { Spacer, useToast } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import React from 'react'
import {ChatState} from "../Context/ChatProvider";
import axios from 'axios';
import {Flex, Text, Button, Box, HStack, Stack, Center } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import GroupChatModal from './Modals/GroupChatModal';

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const {selectedChat, setSelectedChat, chats, setChats, user, setUser} = ChatState();

  const toast = useToast();

  const getSender = (users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  }

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
      console.log(user);
      console.log(error);
       toast({
        title: "Error Occurred!",
        description: "Failed to load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
       });
    }
  }

  useEffect(()=>{
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    setUser(JSON.parse(localStorage.getItem("userInfo")));
    if (user)
    {
      fetchChats();
    }
  }, [ ])

  return (
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

      <HStack
      justifyContent={"space-between"}
      alignContent="center"
      >

      
      <Center>My Chats</Center>
      
      <GroupChatModal>
        <Button
        d="flex"
        fontSize={{ base: "17px", md: "10px", lg: "17px" }}
        rightIcon={<AddIcon />}
        >
          <Text d={{ base: "none", md: "flex" }}>
              New Group Chat
            </Text>
        </Button>
      </GroupChatModal>

        </HStack>
      </Box>

      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
            <Stack overflowY='scroll'>
                {chats.map((chat)=>(
                  <Box
                  onClick={()=>setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat===chat ?  "#38B2AC":"#E8E8E8"}
                  color={selectedChat===chat?"white":"black"}
                  px={3}
                  py={3}
                  borderRadius="lg"
                  key={chat._id}
                  >
                    <Text>
                      {/* {!chat.isGroupChat?(
                        getSender(loggedUser, chat.users)
                      ):(chat.chatName)} */}
                      {!chat.isGroupChat?(getSender(chat.users)):(chat.chatName)}
                    </Text>

                  </Box>
                ))}
            </Stack>
        ):(
            <ChatLoading />
        )}
      </Box>
    </Flex>
  );
}

export default MyChats
