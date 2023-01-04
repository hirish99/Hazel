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


const GroupChatModal = ({children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading]  = useState(false);
  const toast = useToast();

  const {user, chats, setChats} = ChatState();
  
  const onCloseHelper = () => {
    onClose();
    setSearchResult([]);
  }

  const handleGroup = () => {

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

      const {data} = await axios.get(`http://localhost:5000/api/user?search=${search}`, config);
      console.log(data);
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

  const handleSubmit = () => {
    
  }



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
              {loading? <div>Loading</div> : (
                  searchResult?.slice(0,4).map(user => (
                    <UserListItem key={user._id} user={user} handleFunction={(user)=>handleGroup(user)}/>
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
