import React, { useState } from 'react'
import Heading from '../components/Heading'
import Input from '../components/Input'
import Buton from '../components/Buton'
import Foot from '../components/Foot'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {  redirect, useNavigate } from 'react-router-dom'
 import 'react-toastify/dist/ReactToastify.css';


// import { redirect } from 'react-router-dom'
 
const Signup = () => {
   const [firstName,setfirstName]=useState("");
  const [LastName,setLastName]=useState("");
  const [username,setUserName]=useState("");
  const [password,setPassword]=useState(""); 
  const [singIn,setsignIn]=useState(false);
    const navigate = useNavigate();
    const handleSign=async ()=>{
   if(!firstName.length||!username.length||!LastName.length||!password.length){
  toast.error("Enter all Fields",{
    theme:"dark"
     
  })
   console.log("fdfdf")
    return ;
   }
   try {
 const response= await axios.post('http://localhost:3000/api/v1/user/signup',{
  username,
  firstName,
  LastName,
  password

 })

 localStorage.setItem('token',response.data.token);
   navigate('/Home');
 setsignIn(true);

} catch{
 toast.error("Error Notification !", {
        position: "top-left"
        
      });
return ;

}

    }

  return (
    
    <div className=" flex flex-col 
     
    h-screen items-center justify-center bg-gray-600 ">
    <ToastContainer autoClose={3000} />
    <div> <Heading text ={"Signup"}/>
{/* <div className= "text-2xl font-semibold  text-white" >Start Signup </div> */}
    <Input onChange={e=>{setfirstName(e.target.value)}} Main={" First Name"} Placeholder={"Bradd "}/>
     <Input onChange={e=>{setLastName(e.target.value)}} Main={" Last Name"} Placeholder={"Pitt"}/>
       <Input onChange={e=>setUserName(e.target.value)} Main={"Username"} Placeholder={"Tyler Durden"}/>
      <Input  onChange={e=>{setPassword(e.target.value)}}Main={"Password"} Placeholder={"wedonttalkabout@it"}/> 



    <Buton onClick={handleSign} button={"Signup"}></Buton>
    
   <Foot 
        text="Already a User?" // Text for the footer
        to="/signin" // Route for the Link component
        linktext="Sign In" // Text for the Link component
      /> 
  
            
</div>
</div>
  )
}

export default Signup