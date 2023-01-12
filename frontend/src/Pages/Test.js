import React, { useEffect } from 'react'
import axios from 'axios'

const Test = () => {

    const testF = async()=>{
        try{
          console.log("POST");
            const {data} = await axios.get(`localhost:5000/api/user/emaillookup`, {
            }, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            })

            console.log("POST");
              
          }
          catch(err)
          {
              //console.log(err);
          }
    }



    useEffect(()=>{
        testF();
    })
  return (
    <div>
      
    </div>
  )
}

export default Test
