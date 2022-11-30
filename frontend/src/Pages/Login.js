import React from 'react'
import { Button, VStack, FormControl, Input, FormLabel, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import axios from 'axios';
import {useHistory} from 'react-router';

const Login = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [show,setShow] = useState();
    const [loading, setLoading]  = useState(false);
    const toast = useToast();
    const history = useHistory();



    const handleClick = ()=>setShow(!show);
    const submitHandler = async ()=>{
        setLoading(true);


        try{
            const {data} = await axios.post('http://localhost:5000/api/user/login', {
              email: email,
              password: password,
            }, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }) 


          toast({
              title:"Login Successful",
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
              description: "Login Failed",
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

        <FormControl id="email_login" isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter Your Email'
            onChange={(e)=>setEmail(e.target.value)}
            >
            </Input>
        </FormControl> 

        <FormControl id="password_login" isRequired>
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

        {/* <FormControl id="password_login" isRequired>
                <FormLabel>Password</FormLabel>
            <Input 
            placeholder='Enter Your Password'
            onChange={(e)=>setPassword(e.target.value)}
            >
            </Input>
            

        </FormControl>   */}

        <Button
            colorScheme="blue"
            width="100%"
            style={{marginTop: 15}}
            onClick={submitHandler}
            isLoading={loading}
            >
               Log In
            </Button>

        <Button
        colorScheme="red"
        width="100%"
        style={{marginTop: 15}}
        onClick={()=>{
          setEmail("guest@ucsb.edu");
          setPassword("ucsb");
        }}
        >
            Guest Log In
        </Button>
    </VStack>
    );
};

export default Login
