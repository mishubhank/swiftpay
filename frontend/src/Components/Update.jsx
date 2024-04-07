import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster,toast } from 'sonner';

function Update() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const updateData = async () => {

    const isSmallScreen = window.innerWidth <= 600; 
    const position = isSmallScreen ? 'bottom-right' : 'top-right';

      if (!password.trim() && !firstName.trim() && !lastName.trim()) {
        setMessage('Please fill in at least one field to update');
        return;
      }
      if (firstName.length < 2 || firstName.length > 20) {
        setMessage('First name must be between 2 and 20 characters');
        return;
      }
      if (lastName.length < 2 || lastName.length > 20) {
        setMessage('Last name must be between 2 and 20 characters');
        return;
      }
      if (password.length < 6) {
        setMessage('Password must be at least 6 characters long');
        return;
      }
    
        try {
            const response = await axios.put("http://localhost:3000/api/v1/user/", {
                firstName,
                lastName,
                password,
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            setMessage(response.data.message);
            toast.success('Updated Successfully', {
              position,
              style: {
                  background: '#00cc00', 
                  color: '#FFFFFF',      
              }
          });
          <Toaster/>
            localStorage.setItem("firstName", firstName);
            localStorage.setItem("lastName", lastName);
        } catch (error) {
            console.log("Something went wrong", error);
        }
};

useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate('/signin')
    }else{
      navigate('/update')
    }
},[])
  return (
    <div className='w-screen h-screen  flex justify-center items-center bg-gray-400 p-4'>
      <div className='bg-white rounded-lg shadow-md p-8 w-96'>
        <h2 className='text-2xl font-semibold mb-5 text-center '>Update Details</h2>

        <form className='space-y-2'>
          <div className='flex flex-col'>
            <label className='text-gray-700 text-start font-medium'>FirstName</label>
            <input onChange={(e) => setFirstName(e.target.value)} type='text' className='mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none' placeholder='John' required/>
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-700 text-start font-medium'>LastName</label>
            <input onChange={(e) => setLastName(e.target.value)} type='text' className='mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none' placeholder='Doe' required/>
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-700 text-start font-medium'>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type='password' className='mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none' placeholder='********' required/>
          </div>
          {message && <p className='text-red-500 text-sm text-center '>{message}</p>}
         
          <button type='button' onClick={updateData} className='w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg focus:outline-none'>Update</button>
          <button type='button' onClick={()=>{navigate('/profile')}} className='w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded-lg focus:outline-none'>Go Back</button>
        </form>
      </div>
    </div>
  );
}

export default Update;
