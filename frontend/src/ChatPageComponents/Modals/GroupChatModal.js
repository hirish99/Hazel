import React, { useEffect, useState } from 'react'

import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Center,
  Input,
  Box,
  useToast,
  FormControl
} from "@chakra-ui/react";
import { ChatState } from '../../Context/ChatProvider';
import axios from  'axios'
import UserListItem from '../UserListItem';
import UserBadgeItem from '../UserBadgeItem';

import io from "socket.io-client"

const ENDPOINT = process.env.REACT_APP_BASE_URL;
var socket;


const GroupChatModal = ({children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading]  = useState(false);
  const toast = useToast();

  const {user, chats, setChats} = ChatState();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on('connection', (userData)=>{
      socket.join(userData._id);
      //console.log(userData._id);
      socket.emit("connected");
    });
  });
  
  const onCloseHelper = () => {
    onClose();
    setSearchResult([]);
    setSelectedUsers([]);
  }

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  }

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  }

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try{
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    }
    catch(error)
    {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration:  5000,
        isClosable: true,
        position: "bottom-left"
      });
    }
  }

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {

      const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
      };

      const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/chat/group`, {
        name: groupChatName,
        users:JSON.stringify(selectedUsers.map((u)=>u._id)),
      }, config);

      setChats([data,...chats]);
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      socket.emit("update_chat", data);
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

  };



  return (
    <>
    <span onClick={onOpen}>{children}</span>

    <Modal size="lg" onClose={onCloseHelper} isOpen={isOpen} isCentered>
        <ModalOverlay />
          <ModalContent>
          <ModalHeader
            d="flex"
            justifyContent="center"
          >
           <Center> <Text> Create Group Chat</Text></Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box d="flex" pb={2}>
              <FormControl>
                <Input
                placeholder="Chat Name"
                mr={2}
                mb={3}
                onChange={(e)=>setGroupChatName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Input
                placeholder="Search by Name or Email"
                mr={2}
                mb={3}
                onChange={(e)=>handleSearch(e.target.value)}
                />
              </FormControl>

              {selectedUsers.map(u=>(
                <UserBadgeItem key={u._id}
                user={u}
                handleFunction={()=>handleDelete(u)}/>
              ))}
              {loading? <div>Loading</div> : (
                  searchResult?.slice(0,4).map(user => (
                    <UserListItem key={user._id} user={user} handleFunction={()=>handleGroup(user)}/>
                  ))
              )}

              <Button width="100%" colorScheme="blue" style={{marginTop: 15}} onClick={handleSubmit} >Create</Button>
            </Box>

            

          </ModalBody>
          </ModalContent>
      </Modal>
      </>
  )
}

export default GroupChatModal
