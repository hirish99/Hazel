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
  } from '@chakra-ui/react';

  import SidebarWithHeader from "./SidebarWithHeader";

  import {useHistory} from 'react-router';

  import axios from 'axios';
  import { SmallCloseIcon } from '@chakra-ui/icons';
  import { useState} from 'react'

  import {useToast} from '@chakra-ui/react';

  import { ChatState } from "../Context/ChatProvider";


const Settings = () => {
    const { email, setEmail, possibleProjects, possibleSkills, possibleinterests, user, setUser } = ChatState();

    const [pickerItems, setPickerItems] = React.useState(possibleinterests);
    const [interests, setSelectedItems] = React.useState((JSON.parse(localStorage.getItem("userInfo")).interests).map((x)=>({"value":x,"label":x})));


    const [pic, setPic] = useState(JSON.parse(localStorage.getItem("userInfo")).pic);
    const [inputName, setInputName] = useState(JSON.parse(localStorage.getItem("userInfo")).name);
    const [inputMajor, setInputMajor] = useState(JSON.parse(localStorage.getItem("userInfo")).major);

    const [inputProjectBlurb, setInputProjectBlurb] = useState(JSON.parse(localStorage.getItem("userInfo")).projectblurb);




    const [pickerItems1, setPickerItems1] = React.useState(possibleProjects);
    const [projects, setSelectedItems1] = React.useState((JSON.parse(localStorage.getItem("userInfo")).projectinterests).map((x)=>({"value":x,"label":x})));

    const [pickerItems2, setPickerItems2] = React.useState(possibleSkills);
    const [skills, setSelectedItems2] = React.useState((JSON.parse(localStorage.getItem("userInfo")).skills).map((x)=>({"value":x,"label":x})));


    
    const history = useHistory();

    const toast = useToast();





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

    const submitHandler = async () => {
        //console.log(inputName);
        //console.log(pic);
        //console.log(inputMajor);
        //console.log(interests.map(element => element.value));
        //console.log(projects.map(element => element.value));
        //console.log(inputProjectBlurb);
        //console.log(skills.map(element => element.value));


        const name = inputName;
        const major = inputMajor;
        const bioBlurb = inputProjectBlurb;


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

             
                const {data} = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/user/update`, {
                name: name,
                email: email,
                pic: pic,
                major: major,
                interests: interests.map(element => element.value),
                projectinterests: projects.map(element => element.value),
                projectblurb: bioBlurb,
                skills: skills.map(element => element.value)

                }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization:`Bearer ${user.token}`
                }
                })  

                  toast({
                      title:"Update Successful",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                      position: "bottom"
                  });

                  localStorage.setItem("userInfo", JSON.stringify(data));
                  setUser(data);


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
          //console.log(data.url.toString());
        })
        .catch((err) => {
          //console.log(err);
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

    <SidebarWithHeader >

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
          Edit User Profile
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
        
        <FormControl id="Name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="First Last"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={inputName}
            onChange={(e)=>setInputName(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
        <FormLabel>Major</FormLabel>
        <Select placeholder='Select Major'
        value={inputMajor}
        onChange={(e)=>setInputMajor(e.target.value)}
        >
            <option>Computer Science</option>
            <option>Data Science</option>
            <option>Natural Sciences</option>
            <option>Engineering</option>
            <option>Humanities</option>
        </Select>
        </FormControl>


            <CUIAutoComplete
          label="Please choose some of your interests (not related to DataScience)"
          placeholder="Type a Interest"
          onCreateItem={handleCreateItem}
          items={pickerItems}
          selectedItems={interests}
          onSelectedItemsChange={(changes) =>
            handleSelectedItemsChange(changes.selectedItems)
          }/>

        <CUIAutoComplete
          label="Please choose some of interests you would enjoy working on a project on"
          placeholder="Type a Project Interest"
          onCreateItem={handleCreateItem1}
          items={pickerItems1}
          selectedItems={projects}
          onSelectedItemsChange={(changes) =>
            handleSelectedItemsChange1(changes.selectedItems)
          }/>

        <FormControl isRequired>
            <FormLabel>Bio Blurb</FormLabel>
            <Textarea
            placeholder="Bio Goes Here"
            _placeholder={{ color: 'gray.500' }}
            value={inputProjectBlurb}
            type="text"
            onChange={(e)=>setInputProjectBlurb(e.target.value)}
          />
            <FormHelperText>Introduce yourself and elaborate on the project ideas you would be interested in. </FormHelperText>
        </FormControl>

        <CUIAutoComplete
          label="Please choose any skills you may already have"
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
            onClick={submitHandler}
            >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
    </SidebarWithHeader>
  )
}

export default Settings
