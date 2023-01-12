import React, { ReactNode, useContext, useEffect } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { BellIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'

import ProfileModal from '../ChatPageComponents/Modals/ProfileModal';
import { ChatIcon } from '@chakra-ui/icons';

import { ChatState } from '../Context/ChatProvider';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LinkItems = [
  { name: 'Explore', icon: FiCompass,linkto: '/explore'  },
  { name: 'Chat', icon: ChatIcon, linkto: '/chats'},
  { name: 'Projects', icon: FiTrendingUp,linkto: '/projects' },
  { name: 'Settings', icon: FiSettings ,linkto: '/profile' },
];

const SidebarWithHeader = ({children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="1">
        {children}
      </Box>
    </Box>
    </div>
  )
}

export default SidebarWithHeader






const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl"  fontWeight="bold">
          Hazel
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} linkto={link.linkto}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children,linkto, ...rest }) => {
  return (
    <Link href={linkto} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

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
            
            </Text>
            <Text>
            Social: chandra_hirish
            </Text>
            <Text>
            If you'd like to give any sort of feedback as well please dont hesitate. Thank you! If you'd like you can submit an issue on the github as well for bugs/features (https://github.com/hirish99/mern-chat-app).
            </Text>

          </ModalBody>
          <ModalFooter></ModalFooter>

        
        </ModalContent>
      </Modal>
    </>
  )
}




const MobileNav = ({ onOpen, ...rest }) => {

  const {user, setUser} = ChatState();



  const logoutHandler = async () => {
    localStorage.removeItem('userInfo');
    try{
    const {data} = await axios.get(`http://localhost:5000/logout`, {
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
      }
      catch(error){
        console.log(error);
      }

  }




  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontWeight="bold">
        Hazel
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        
        <Flex alignItems={'center'} >

        <Menu>
          <MenuButton as={Button} variant="ghost" rightIcon={<ChevronDownIcon/>}>
            <Avatar size='sm' cursor='pointer' name={JSON.parse(localStorage.getItem("userInfo")).name} src={JSON.parse(localStorage.getItem("userInfo")).pic}>
            </Avatar>
          </MenuButton>
          <MenuList >
            <ProfileModal user={JSON.parse(localStorage.getItem("userInfo"))}>
              <MenuItem>My Profile</MenuItem>
            </ProfileModal>
            
            <Link href="http://localhost:5000/logout">
            

            <MenuItem >Log Out</MenuItem>
            </Link>
            <ReturnFocus>
              <MenuItem>Report A Problem</MenuItem>
            </ReturnFocus>
          </MenuList>
        </Menu>



        </Flex>
      </HStack>
    </Flex>
  );
};