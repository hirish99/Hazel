import React, { useContext, useState } from 'react'
import { Box, Flex,Tooltip, Button, Stack, Menu, MenuButton, Center, MenuList, MenuItem, MenuDivider, Portal, Modal, Input, Toast, useToast, ModalFooter } from '@chakra-ui/react'
import { Icon ,Text, Grid,Spacer} from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { Avatar } from '@chakra-ui/react'
import { ChatState } from '../Context/ChatProvider'
import ProfileModal from './Modals/ProfileModal'
import { useHistory } from 'react-router-dom'
import { useDisclosure, ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody} from '@chakra-ui/react'
import axios from 'axios'
import ChatLoading from './ChatLoading'
import UserListItem from './UserListItem'
import { checkTargetForNewValues } from 'framer-motion'


function ReturnFocus({children}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = React.useRef(null)

  return (
    <>

      <span onClick={onOpen}>{children}</span>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
            Email: hirish99@gmail.com 
            </Text>
            <Text>
            Text: 4083183662
            </Text>
            <Text>
            Social: chandra_hirish
            </Text>
            <Text>
            Please give me a description of steps to reproduce the problem and on what url/components were involved. If you'd like to give any sort of feedback as well please dont hesitate. Thank you!
            </Text>

          </ModalBody>
          <ModalFooter></ModalFooter>

        
        </ModalContent>
      </Modal>
    </>
  )
}


const SideDrawer = ({displaySearch=true}) => {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const accessChat = async (userId) => {
      //console.log(userId);
      try{
        setLoadingChat(true);
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
        setLoadingChat(false);
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

  const onCloseHelper=()=> {
    onClose();
    setSearchResult([]);
  }

  

  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
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
        setLoading(true);

        const config = {
          headers: {
            Authorization:`Bearer ${user.token}`
          },
        };

        const {data} = await axios.get(`http://localhost:5000/api/user?search=${search}`, config);

        setLoading(false);
        setSearchResult(data);
        //console.log(data);

    }
    catch(err){
      //console.log(err);
      toast({
        title: "API Call to Search Failed",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-center",
      })
    }

  }

  return (
    <>
      <Flex
      d="flex"
      alignContent={"center"} justifyContent={"space-between"}
      bg="#FEEBC8"
      w="100%"
      p="5px 10px 5px 10px"
      borderwidth="5px"
      direction="row">
        {displaySearch &&
        <Tooltip label="Search Users To Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <Stack
            direction='row'>
              <Icon as={SearchIcon} />
            </Stack>
          </Button>
        </Tooltip>
        } 
        <Text fontSize="3xl">
          Hazel
        </Text>

        <Menu>
          <MenuButton as={Button} variant="ghost" rightIcon={<ChevronDownIcon/>}>
            <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic}>
            </Avatar>
          </MenuButton>
          <MenuList bg="#FEEBC8">
            <ProfileModal user={user}>
              <MenuItem>My Profile</MenuItem>
            </ProfileModal>
            <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
            <ReturnFocus>
              <MenuItem>Report A Problem</MenuItem>
            </ReturnFocus>
          </MenuList>
        </Menu>
      </Flex>

      <Modal size="lg" onClose={onCloseHelper} isOpen={isOpen} isCentered>
        <ModalOverlay />
          <ModalContent>
          <ModalHeader
            d="flex"
            justifyContent="center"
          >
           <Center> <Text> Search Users</Text></Center>
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

            {loading ? <ChatLoading/> : 
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
  )
}

export default SideDrawer
