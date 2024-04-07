import React, { useState ,useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Appbar from './Appbar';
import { toast,Toaster } from 'sonner'



function Profile() {
  const navigate =useNavigate();
  const [firstName ,setFirstName]=useState('');
  const [lastName, setLastName]= useState('');
  const [username, setUsername]= useState('');
  const [balance, setBalance]= useState();


  const deleteUser = async()=>{
    try{
        await axios.delete("http://localhost:3000/api/v1/user/delete",{
          headers:{
            Authorization :"Bearer "+localStorage.getItem("token")
          }
        });
        localStorage.clear();
        navigate('/signin');
        toast.success('Account Deleted', {
          position: 'top-right',
          style: {
              background: '#FF0000', 
              color: '#FFFFFF',      
          }
      });
      <Toaster/>
    }
    catch(error){
      console.error('Error Occurred:', error);
    }
  }

  const getUsername =async()=>{
    try{
      const response = await axios.get("http://localhost:3000/api/v1/user/username",{
        headers:{
          Authorization:"Bearer "+ localStorage.getItem("token")
        }
      })
      setUsername(response.data.username);
    }
    catch(error){
      console.error('Error fetching balance:', error);
    }
  }
  
  
  const fetchBalance = async () => {
    try{
    const response =await axios.get("http://localhost:3000/api/v1/account/balance",{
    headers:{
        Authorization :"Bearer "+localStorage.getItem("token")
    }
  });
    const roundedBalance = parseFloat(response.data.balance).toFixed(2);
    setBalance(roundedBalance);
    }
  
    catch(error){
        console.error('Error fetching balance:', error);
    }
    
  }

  useEffect(() => {
    if(localStorage.getItem("token")){
    setFirstName(localStorage.getItem("firstName"));
    setLastName(localStorage.getItem("lastName"));
    fetchBalance();
    getUsername();
    }else{
      navigate('/signin')
    }

  }, []);
  
  


  


  return (
<div className='h-full w-full'>
     <Appbar/>
     <div className="flex justify-center mt-24">
    <div className=' flex flex-col justify-center items-center text-center p-2 rounded-md border-2'>
  <div className='s:w-80 sm:w-96  bg-white p-4 rounded-md px-6'>
  <div className='text-2xl font-semibold pb-8'>Your Information</div>
  <div className='flex flex-col gap-2 text-lg'>
  <div className='s:text-center sm:text-start'>Name : {firstName} {lastName}</div>
  <div className='s:text-center sm:text-start'>Email : {username && <span>{username}</span>}</div>
  <div className='s:text-center sm:text-start '>Balance : Rs{balance && <span> {balance} </span>}</div>
  </div>
  <div className='flex flex-col gap-2 mt-6'>
  <div><button onClick={()=>{navigate('/dashboard')}} type='button' className='w-full bg-gray-800 py-2 hover:bg-gray-900 text-white  rounded-lg focus:outline-none'>Go Back</button></div>
  <div><button onClick={()=>{navigate('/update')}} type='button' className='w-full bg-gray-800 py-2 hover:bg-gray-900 text-white  rounded-lg focus:outline-none'>Update Details</button></div>
  <div><button onClick={deleteUser} type='button' className='w-full bg-red-700 py-2 hover:bg-red-800 text-white  rounded-lg focus:outline-none'>Delete Account</button></div>
  </div>
  </div>
  </div>
  </div>
  </div>
  )
}

export default Profile
