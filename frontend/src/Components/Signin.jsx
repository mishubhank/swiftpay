import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast,Toaster } from 'sonner'

function Signin() {
  const isSmallScreen = window.innerWidth <= 600; 
  const position = isSmallScreen ? 'bottom-right' : 'top-right';

  const navigate = useNavigate();
  const [username ,setUsername] = useState('');
  const [password ,setPassword] = useState('');
  const [error ,setError] = useState('');
    try{
        useEffect(()=>{
            if(localStorage.token){
                navigate("/dashboard");
            }
    },[])
    }
    catch(error){
        navigate("/");
    }
  
  return (
    <div className='w-screen h-screen  flex justify-center items-center bg-gray-400 p-4'>
      <div className='bg-white rounded-lg shadow-md p-8'>

        <h2 className='text-3xl font-semibold mb-5 text-center '>Sign In</h2>
        <p className='text-gray-600 mb-6 text-center'>Enter your credentials to access your account</p>
        <form className='space-y-2'>


          <div className='flex flex-col'>
            <label className='text-gray-700 text-start font-medium'>Email</label>
            <input onChange={(e)=>{setUsername(e.target.value)}} type='email' className='mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none' placeholder='johndoe@gmail.com' required />
          </div>


          <div className='flex flex-col'>
          <label className='text-gray-700 text-start font-medium'>Password</label>
            <input onChange={(e)=>{setPassword(e.target.value)}} type='password' className='mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none' placeholder='********' required />
          </div>

  
          <div>{error && <p className='text-red-500 text-sm text-center '>{error}</p>}</div>
          

          <button onClick={async()=>{ 
              if (username.trim().length < 6) {
                setError('Username must be at least 6 characters long');
                return;
            }
            
            if (password.trim().length < 6) {
                setError('Password must be at least 6 characters long');
                return;
            }
            try{
            const response = await axios.post('http://localhost:3000/api/v1/user/signin',{
                username,
                password
            });
         
            localStorage.setItem("token", response.data.token);
            const firstName = response.data.firstName;
            const lastName = response.data.lastName;
            localStorage.setItem("firstName", firstName);
            localStorage.setItem("lastName", lastName);
            navigate('/dashboard');
            
            toast.success('Login Successfully', {
              position,
                style: {
                    background: '#00cc00', 
                    color: '#FFFFFF',      
                }
            });
            <Toaster/>
        
        }
        catch(error){
            setError(error.response.data.message);
        }
          }} 
          type='button' className='w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg focus:outline-none'>Sign In</button>


        </form>
        <div className='mt-4 text-gray-700 text-center'>
          Don't have an account ?{' '}
          <span className='text-black cursor-pointer underline' onClick={() => navigate('/signup')}>Sign Up</span>
        </div>
      </div>
    </div>
  );
}

export default Signin;
