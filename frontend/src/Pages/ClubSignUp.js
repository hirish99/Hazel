import React from 'react'
import { CUIAutoComplete } from 'chakra-ui-autocomplete'

import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    FormHelperText,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Textarea,
    Image,
    InputGroup,
    InputRightElement,
  } from '@chakra-ui/react';

  import {useHistory} from 'react-router';

  import Compressor from 'compressorjs';

  import axios from 'axios';
  import { SmallCloseIcon } from '@chakra-ui/icons';
  import { useState} from 'react'

  import {useToast} from '@chakra-ui/react';

  import { ChatState } from "../Context/ChatProvider";

  import CryptoJS from 'crypto-js'

const ClubSignUp = () => {
    const { possibleProjects, possibleSkills, possibleinterests } = ChatState();

    const [pickerItems, setPickerItems] = React.useState(possibleinterests);
    const [interests, setSelectedItems] = React.useState([]);

    const [pickerItems1, setPickerItems1] = React.useState(possibleProjects);
    const [projects, setSelectedItems1] = React.useState([]);

    const [pickerItems2, setPickerItems2] = React.useState(possibleSkills);
    const [skills, setSelectedItems2] = React.useState([]);
    const [show, setShow]= useState(false);

    const [bioBlurb, setBioBlurb] = useState();
    
    const history = useHistory();
    const [pic, setPic] = useState("https://res.cloudinary.com/dzz3nkuyy/image/upload/v1674615286/DataScience_iwglly.png");
    const toast = useToast();

    const [name, setName] = useState();
    const [major, setMajor] = useState();
    const [clubemail, setClubemail] = useState();
    const [clubpass, setClubpass] = useState();

   



    const handleCreateItem = (item) => {
      setPickerItems((curr) => [...curr, item]);
      setSelectedItems((curr) => [...curr, item]);
    };

    const handleCreateItem1 = (item) => {
      setPickerItems1((curr) => [...curr, item]);
      setSelectedItems1((curr) => [...curr, item]);
    };

    const handleCreateItem2 = (item) => {
      setPickerItems2((curr) => [...curr, item]);
      setSelectedItems2((curr) => [...curr, item]);
    };

    const handleSelectedItemsChange = (selectedItems) => {
      //console.log(selectedItems);
      if (selectedItems) {
        setSelectedItems(selectedItems);
      }
    };

    const handleSelectedItemsChange1 = (selectedItems1) => {
      //console.log(selectedItems1);
      if (selectedItems1) {
        setSelectedItems1(selectedItems1);
      }
    };

    const handleSelectedItemsChange2 = (selectedItems2) => {
      //console.log(selectedItems2);
      if (selectedItems2) {
        setSelectedItems2(selectedItems2);
      }
    };

    const clearImage = ()  => {
        setPic("");
    }


    const encrypt = (text, key) => {
      const hash = CryptoJS.SHA256(key);
      const ciphertext = CryptoJS.AES.encrypt(text, hash, {
        mode: CryptoJS.mode.ECB,
      });
      return ciphertext.toString();
    };

    const submitHandler = async () => {
  /*       //console.log(name);
        //console.log(email);
        //console.log(pic);
        //console.log(major);
        //console.log(interests.map(element => element.value));
        //console.log(projects.map(element => element.value));
        //console.log(bioBlurb);
        //console.log(skills.map(element => element.value)); */


        if (!name || !major || !pic || !bioBlurb || interests.length==0 || projects.length==0 || skills.length==0) {
            toast({
                title: "Please Fill All Fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
              return;
        }

        

        try{

            
                const {data} = await axios.post(`https://hazel.herokuapp.com/api/user`, {

                name: name,

                pic: pic,
                major: major,
                interests: interests.map(element => element.value),
                projectinterests: projects.map(element => element.value),
                projectblurb: bioBlurb,
                skills: skills.map(element => element.value)

                }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                })  

                  toast({
                      title:"Registration Successful",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                      position: "bottom"
                  });

                  localStorage.setItem("userInfo", JSON.stringify(data));
                  history.push('/explore');


        }
        catch(err){
            //console.log(err);
        } 


    }

    const postDetails = (file)=> {
    if (file === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (file.size > 1000000) {
      toast({
        title: "Image Larger than 1MB! Servers Can't Handle Yet!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (file.type === "image/jpeg" || file.type === "image/png") {
      new Compressor(file, {
        quality: 0.6,
    
        // The compression process is asynchronous,
        // which means you have to access the `result` in the `success` hook function.
        success(result) {
          const formData = new FormData();
    
          // The third parameter is required for server
          formData.append('file', result, result.name);
          formData.append("upload_preset", "chat-app");
          formData.append("cloud_name", "dzz3nkuyy");

          // Send the compressed image file to server with XMLHttpRequest.
          fetch("https://api.cloudinary.com/v1_1/dzz3nkuyy/image/upload", {
          method: "post",
          body: formData,
            })
              .then((res) => res.json())
              .then((data) => {
                setPic(data.url.toString());
                //console.log(data.url.toString());
              })
              .catch((err) => {
                //console.log(err);
              });
        },
          error(err) {
            console.log(err.message);
          },
        });
      }
      else {
            toast({
              title: "Please Select an Image!",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            return;
      }
    };



  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Club/Event Creation Portal
        </Heading>
        <FormControl id="userIcon" isRequired>
          <FormLabel>Club/Event Banner</FormLabel>
          <Stack direction={['column']} spacing={6}>
            <Center>
              <Image src={pic}>
               
              </Image>
            </Center>
            <Center w="full">
            <Input
                type="file"
                p={1.5}
                accept="image/*"
                sx={{
                    "::file-selector-button": {
                        borderRadius: 2,
                        mr: 3,
                        justifyContent: "center",
                    },
                    }}
                onChange={(e)=>postDetails(e.target.files[0])}
                />
            </Center>
          </Stack>
          <FormHelperText>Icon may take a while to render. Please refrain from updating more than once.</FormHelperText>
        </FormControl>
        
        <FormControl id="Club Name" isRequired>
          <FormLabel>Club Name</FormLabel>
          <Input
            placeholder="First Last"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            onChange={(e)=>setName(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
        <FormLabel>University</FormLabel>
        <Select placeholder='School'
        onChange={(e)=>setMajor(e.target.value)}
        >
            <option>University of California, Santa Barbara</option>
            <option>University of Illinois, Urbana-Champaign</option>
        </Select>
        </FormControl>

        <FormControl isRequired>
            <FormLabel>Club Bio</FormLabel>
            <Textarea
            placeholder="Bio Goes Here"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            onChange={(e)=>setBioBlurb(e.target.value)}
          />
        </FormControl>

        <CUIAutoComplete
          label="Please choose or add any skills the club deems valuable"
          placeholder="Type a Skill"
          onCreateItem={handleCreateItem2}
          items={pickerItems2}
          selectedItems={skills}
          onSelectedItemsChange={(changes) =>
            handleSelectedItemsChange2(changes.selectedItems)
          }/>



        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={()=>{submitHandler()}}
            >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}

export default ClubSignUp
