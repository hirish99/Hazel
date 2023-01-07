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
  Center
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="sm" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
        <Center>
          <ModalHeader
            fontSize="40px"
            d="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          </Center>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Center>
            <Image
              src={user.pic}
              alt={user.name}
            />
            </Center>
            <Center>
            <Text
              fontSize={{ base: "28px", md: "30px" }}
            >
              Email: {user.email}
            </Text>
            </Center>
            
          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;