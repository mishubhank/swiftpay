import React, { useEffect, useState } from 'react'
import Heading from '../components/Heading'
import Input from '../components/Input'
import { useLocation, useNavigate } from 'react-router-dom';
import Buton from '../components/Buton';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';
const Send = () => {
  const navigate=useNavigate(); 

   useEffect(()=>{
  if(!localStorage.token){
    navigate('/signin');
   return ;
  }

  },[]);
  const location =useLocation();
  const params=new URLSearchParams(location.search);
  const userid= params.get('id');
  const user=params.get('name')
  const [amount,setAmount]=useState(0);
  const transfer= async()=>{

 


  if(!amount){
    toast.error('Enter amount',{
      theme:"dark"
    }) 
  }
  
  try{
    console.log(user);
   // parseInt(amount);
  await axios.post('http://localhost:3000/api/v1/account/transfer ',{
  to:userid,
  amount},{
     headers:{
      Authorization:"Bearer" +localStorage.getItem('token')
     }
  

  })
  toast.success('Money send successfulyy')




  }
catch(error){
  console.log(userid);
  toast.error("not enough balance");
  return ;
}


  }
  
  return (
  
    <div className='bg-gray-600 flex flex-col  h-screen justify-center items-center  ' >
  <Heading text={"Send Money"}/>  
  
<div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">a</span>
</div>
  
<Input   Main={"Enter Reciever's Name"} Placeholder={'moonpie...'} onChange={(e)=>{
  setAmount(e.target.value);
}}/>
<Buton onClick={transfer} button={"Send"}/>
 <ToastContainer/>
    
    </div>
  )
}

export default Send