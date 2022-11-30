import React from 'react'
import { Button, VStack, FormControl, Input, FormLabel, InputGroup, InputRightElement, FormHelperText, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios';
import {useHistory} from 'react-router';


const SignUp = () => {
    const [show, setShow] = useState(false);
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading]  = useState(false);
    const toast = useToast();
    const history = useHistory();

    const handleClick = ()=>setShow(!show);
    const postDetails = (pics)=> {
        setLoading(true);
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
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
    const submitHandler = async ()=>{
        setLoading(true);
        if (!name || !email || !password ) {
            toast({
              title: "Please Fill All Fields",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            setLoading(false);
            return;
        }

        //store into mongoDB

        try{
              const {data} = await axios.post('http://localhost:5000/api/user', {
                name: name,
                email: email,
                password: password,
                pic: pic,
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
            localStorage.setItem('userInfo',JSON.stringify(data));
            setLoading(false);
            history.push('/chats');
        }catch(error)
        {
            toast({
                title:"Error",
                description: "Request Failed",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
        }
    };



    return (
    <VStack spacing="5px">
        <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder='Enter Your Full Name'
            onChange={(e)=>setName(e.target.value)}
            >
            </Input>
        </FormControl> 

        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter Your Email'
            onChange={(e)=>setEmail(e.target.value)}
            >
            </Input>
        </FormControl> 

        <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
            <Input 
            type={show ? "text" : "password"}
            placeholder='Enter Your Password'
            onChange={(e)=>setPassword(e.target.value)}
            >
            </Input>
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>  

        {/* <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>

            <Input 
            placeholder='Enter Your Password'
            onChange={(e)=>setPassword(e.target.value)}
            >
            </Input>
            
        </FormControl>   */}


        <FormControl id="pic" isRequired>
            <FormLabel> 
                Upload Your Picture
            </FormLabel>
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
                <FormHelperText>This must be a clearly identificable photo of yourself.</FormHelperText>
        </FormControl>

        

        <Button
            colorScheme="blue"
            width="100%"
            style={{marginTop: 15}}
            onClick={submitHandler}
            isLoading={loading}
            >
                Sign Up
            </Button>







    </VStack>
    );
};

export default SignUp
