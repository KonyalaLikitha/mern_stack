import React, { useState } from 'react'
import { Stack, TextInput } from '@mantine/core'; 
import { data } from 'react-router-dom';
import Service from '../../utils/http';
import { useEffect } from 'react';
export const Urlsortner = () => {
   const service = new Service();
    const [data, setData] = useState({});
    const [shorturl, setShorturl] = useState("");
    const handlesubmit = async () => {
      try{
        console.log(data);
        const response = await service.post("s",data);
        console.log(response);
        setShorturl(`https://url-shortener-bootcamp.onrender.com/api/s/${response.shortCode}`);
      }
      catch(error){
        console.error("api did not work", error.message);
      
      } 
    }
    useEffect(() => {
       console.log(`Short URL is ${shorturl}`);
   }, [shorturl])

  
  return (
    <>
    {shorturl && shorturl.length>0? <p>{shorturl}</p> :

    <Stack
      h={500}
      bg="var(--mantine-color-body)"
      align="center"
      justify="center"
      gap="xl"
      >
       
      <TextInput
        label="original url"
        withAsterisk
        description="enter original url"
        placeholder="enter orginal url"
        onChange={(event) => 
          setData({ ...data, originalUrl: event.target.value })} 
        w = "20%"
      />
    <TextInput
      label="customize url"
      description="enter custom url"
      placeholder="enter custom url"
      onChange={(event) => 
        setData({ ...data, customUrl: event.target.value })
      } 
      w = "20%"
      />
    <TextInput
      label="title"
      description="enter  url title "
      placeholder="enter title"
      onChange={(event) => 
        setData({ ...data, title: event.target.value })} 
        w = "20%"
    />
    
    <button variant="filled" color="green" onClick={handlesubmit}>Generate and shorten URL</button>
    </Stack>
 }
    </>
  )
}
  

