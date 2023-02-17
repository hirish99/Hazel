import React, { useState } from 'react'




import {
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  useToast,
  Link,
  Button
} from '@chakra-ui/react';

import { GoogleLogin } from '@react-oauth/google';

import CryptoJS from 'crypto-js'

import jwt_decode from "jwt-decode";

import {useHistory} from 'react-router';

import { useEffect} from 'react';
import axios from 'axios';

import { ChatState } from "../Context/ChatProvider";


const Hero = () => {
    const history = useHistory();
    const toast = useToast();

    const { email, setEmail } = ChatState();

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
      // Update the document title using the browser API
        emailCheck1();
    });


    const emailCheck1 = async (email) => {
      try{




        const {data} = await axios.get(`https://hazel.herokuapp.com/api/user/emaillookup1`, {
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })

        console.log(data);


          if (data.accept === "1")
          {

              localStorage.setItem("userInfo", JSON.stringify(data)); 
              history.push('/explore');
          }
          else
          {
            setEmail(email);
            //User doesn't exist in the database yet (REGISTER THEM!!!)
            history.push('/signup');
          }

          
      }
      catch(err)
      {
          //console.log(err);
      }
  }


    const encrypt = (text, key) => {
      const hash = CryptoJS.SHA256(key);
      const ciphertext = CryptoJS.AES.encrypt(text, hash, {
        mode: CryptoJS.mode.ECB,
      });
      return ciphertext.toString();
    };

    

    const emailCheck = async (email) => {
        try{




          const {data} = await axios.post(`https://hazel.herokuapp.com/api/user/emaillookup`, {
            hash:  encrypt(email, 'h73jd7asbkfasfy7asdf')
          }, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          })


            if (data.accept === "1")
            {

                localStorage.setItem("userInfo", JSON.stringify(data)); 
                history.push('/explore');
            }
            else
            {
              setEmail(email);
              //User doesn't exist in the database yet (REGISTER THEM!!!)
              history.push('/signup');
            }

            
        }
        catch(err)
        {
            //console.log(err);
        }
    }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}>
              Connect with
            </Text>
            <br />{' '}
            <Text color={'red.400'} as={'span'}>
              Hazel
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            Hazel allows you to find other peers with interests and skills you desire while giving others access to your own skills.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
{/*             <Button
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={() => login()}
              >
              DataScience UCSB
            </Button> */}

            <Link href="https://hazel.herokuapp.com/login">
            

                <Button colorScheme='blue' onClick={()=>{setRedirect(true)}}>
                Log In/Sign Up</Button>
            </Link>


                

            {/* <GoogleLogin
                onSuccess={credentialResponse => {
                    var decoded = jwt_decode(credentialResponse.credential);
                    if (decoded.email_verified) 
                    {
                      //if (decoded.hd === "ucsb.edu")
                      //if (decoded.hd === "ucsb.edu")
                      if (true)
                      {


                        emailCheck(decoded.email);
                      }
                      else {
                        toast({
                          title: "UCSB Domains Only",
                          status: "error",
                          duration: 5000,
                          isClosable: true,
                          position: "bottom",
                        });
                      }
                    }
                }}
                onError={() => {
                    //console.log('Login Failed');
                }}
                useOneTap
/>; */}
{/*             <Button rounded={'full'}>Alpha Version</Button> */}
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://res.cloudinary.com/dzz3nkuyy/image/upload/v1672128306/background_k90z0t.jpg'
          }
        />
      </Flex>
    </Stack>
  )
}

export default Hero
