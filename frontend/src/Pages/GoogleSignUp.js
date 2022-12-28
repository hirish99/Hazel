import React from 'react'

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
  } from '@chakra-ui/react';

  import {useHistory} from 'react-router';

  import axios from 'axios';
  import { SmallCloseIcon } from '@chakra-ui/icons';
  import { useState, useEffect } from 'react'

  import {useToast} from '@chakra-ui/react';

const GoogleSignUp = () => {
    const history = useHistory();
    const [pic, setPic] = useState();
    const toast = useToast();

    const [name, setName] = useState();
    const [major, setMajor] = useState();
    const [plexp, setPlexp]=useState();
    const [mlexp, setMlexp]=useState();
    const [wdexp, setWdexp]=useState();


    useEffect(() => {
    // Update the document title using the browser API
        const user = JSON.parse(localStorage.getItem("emailInfo"));
        if (!user) {
            history.push("/");
        }
        else if (user.registered)
        {
            history.push("/explore");
        }
        else {
            history.push("/");
        }

    });

    const clearImage = ()  => {
        setPic("");
    }

    const submitHandler = async () => {
        const user = JSON.parse(localStorage.getItem("emailInfo"));
        console.log(user.email);
        console.log(name);
        console.log(major);
        console.log(plexp);
        console.log(mlexp);
        console.log(wdexp);

        if (!name || !major ||!plexp ||!mlexp ||!wdexp ||!pic) {
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


                const {data} = await axios.post('http://localhost:5000/api/user', {
                name: name,
                email: user.email,
                major: major,
                plexp: plexp,
                mlexp: mlexp,
                wdexp: wdexp,
                pic: pic,
                }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                })  

                console.log(data);

                if (data.pic === "exists")
                {
                    toast({
                        title:"Email Already Registered",
                        status: "warning",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom"
                    });
                }
                else {


                    toast({
                        title:"Registration Successful",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom"
                    });

                    localStorage.setItem('emailInfo',JSON.stringify({"email":user.email,"registered":true}));
                    history.push('/explore');
                }

        }
        catch(err){
            console.log(err);
        }


    }

    const postDetails = (pics)=> {
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dzz3nkuyy");
      fetch("https://api.cloudinary.com/v1_1/dzz3nkuyy/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
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
          User Profile Creation
        </Heading>
        <FormControl id="userIcon" isRequired>
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src={pic}>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                  onClick={clearImage}
                />
              </Avatar>
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
        
        <FormControl id="FirstNameLastName" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="First Last"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            onChange={(e)=>setName(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
        <FormLabel>Major</FormLabel>
        <Select placeholder='Select Major'
        onChange={(e)=>setMajor(e.target.value)}
        >
            <option>Computer Science</option>
            <option>Data Science</option>
            <option>Natural Sciences</option>
            <option>Engineering</option>
            <option>Humanities</option>
        </Select>
        </FormControl>

        <FormControl isRequired>
            <FormLabel>Programming Language Experience</FormLabel>
            <NumberInput max={5} min={0} onChange={(e)=>setPlexp(e)}>
                <NumberInputField/>
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <FormHelperText>Enter a number 0-5.</FormHelperText>
        </FormControl>

        <FormControl isRequired>
            <FormLabel>Machine Learning Experience</FormLabel>
            <NumberInput max={5} min={0}
            onChange={(e)=>setMlexp(e)}>
                <NumberInputField />
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <FormHelperText>Enter a number 0-5.</FormHelperText>
        </FormControl>

        <FormControl isRequired>
            <FormLabel>Website Development Experience</FormLabel>
            <NumberInput max={5} min={0}
            onChange={(e)=>setWdexp(e)}>
                <NumberInputField />
                <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <FormHelperText>Enter a number 0-5.</FormHelperText>
        </FormControl>



        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            onClick={submitHandler}
            >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}

export default GoogleSignUp