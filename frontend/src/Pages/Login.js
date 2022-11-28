import React from 'react'
import { Button, VStack, FormControl, Input, FormLabel, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState } from 'react'


const Login = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [show,setShow] = useState();

    const handleClick = ()=>setShow(!show);
    const submitHandler = ()=>{};

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
