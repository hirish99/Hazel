import React, { useContext, useState } from 'react'
import { Box, Flex,Tooltip, Button, Stack, Menu, MenuButton, Center, MenuList, MenuItem, MenuDivider, Portal, Modal, Input, Toast, useToast } from '@chakra-ui/react'
import { Icon ,Text, Grid,Spacer} from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { Avatar } from '@chakra-ui/react'
import { ChatState } from '../Context/ChatProvider'
import ProfileModal from './Modals/ProfileModal'
import { useHistory } from 'react-router-dom'
import { useDisclosure, ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody } from '@chakra-ui/react'
import axios from 'axios'
import ChatLoading from './ChatLoading'
import UserListItem from './UserListItem'

const SideDrawer = () => {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const accessChat = (userId) => {
      console.log(userId);
  }

  const onCloseHelper=()=> {
    onClose();
    setSearchResult([]);
  }

  const { user } = ChatState();

  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();


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
        <Tooltip label="Search Users To Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <Stack
            direction='row'>
              <Icon as={SearchIcon} />
            </Stack>
          </Button>
        </Tooltip>
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
          </MenuList>
        </Menu>
      </Flex>

      <Modal size="lg" onClose={onCloseHelper} isOpen={isOpen} isCentered>
        <ModalOverlay />
          <ModalContent>
          <ModalHeader
            fontSize="40px"
            d="flex"
            justifyContent="center"
          >
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
              <Button width="100%" style={{marginTop: 15}} onClick={handleSearch}>Go</Button>
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
