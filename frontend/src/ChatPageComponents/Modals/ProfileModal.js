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
  VStack,
  Box,
  useColorModeValue,
  Flex,
  Avatar,
  Stack,
  Heading,
  Wrap,
  Tag,



} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();


  const createTagsFromInterests=(interests, skills) =>{
    var a =  skills.map((x) => (
      <Tag variant="solid" colorScheme={"teal"}>
        {" "}
        {x}{" "}
      </Tag>
    )) 
    var b= 
    interests.map((x) => (
      <Tag variant="solid" colorScheme={"green"}>
        {" "}
        {x}{" "}
      </Tag>
    ));

    return [...a, ...b]
  }


  const SocialProfileWithImage= (id, name, image, email, interests,skills, projectblurb) =>{
    return (
   

      <VStack py={10}>
        <Box
          maxW={"270px"}
          w={"300px"}
          h="500px"
          l="10px"
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
 
        >
          <Image
            h={"120px"}
            w={"full"}
            src={
              "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            }
            objectFit={"cover"}
          />
          <Flex justify={"center"} mt={-12}>
            <Avatar
              size={"xl"}
              src={image}
              alt={"Author"}
              css={{
                border: "2px solid white"
              }}
            />
          </Flex>
  
          <Box p={6}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                {name}
              </Heading>
              <Text color={"gray.500"}>{email}</Text>
            </Stack>
  
            <Stack direction={"row"} justify={"center"} spacing={6}></Stack>

            <Box p={3}   boxShadow='base' h="150px"  rounded='md' bg='white' overflowY='auto' maxHeight="70px">
              <Center>
            <Wrap>{createTagsFromInterests(interests, skills)}</Wrap>
            </Center>
            </Box>
  
            <Box p={2} mt={2} h="150px" boxShadow='base' rounded='md' bg='white' overflowY='auto' maxHeight="130px">
             {projectblurb}
            </Box>




  

          </Box>


        </Box>
    

        

      </VStack>

        );
  }

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="xs" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
        <Center>
         
          </Center>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
            w="100%"
          >
            <Center>
            {SocialProfileWithImage(user._id, user.name, user.pic, user.email, user.interests,user.skills, user.projectblurb)}
            
            </Center>
            
          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;