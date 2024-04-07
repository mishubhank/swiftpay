import React, { useState ,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast,Toaster } from 'sonner';

function Signup() {

  const isSmallScreen = window.innerWidth <= 600; 
   const position = isSmallScreen ? 'bottom-right' : 'top-right';

    const navigate = useNavigate();
    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(()=>{
        try{
            if(localStorage.token){
                navigate("/dashboard");
               
            }
        }
        catch(error){
            navigate('/');
        }
    },[])

  return (
    <div className='w-screen h-screen  flex justify-center items-center bg-gray-400'>
      <div className=' bg-white rounded-lg shadow-md p-8'>
        <h2 className='text-3xl font-semibold mb-5 text-center'>Sign Up</h2>
        <p className='text-gray-600 mb-5 text-center'>Enter your information to create account</p>
        <form className='space-y-3'>


          <div className='flex flex-col'>
            <label className='text-gray-700 text-start font-medium'>First Name</label>
            <input onChange={(e)=>setFirstName(e.target.value)} id='firstName' type='text' className='mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none' placeholder='John' required/>
          </div>


          <div className='flex flex-col'>
            <label className='text-gray-700 text-start font-medium'>Last Name</label>
            <input onChange={(e)=>{setLastName(e.target.value)}} id='lastName' type='text' className='mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none' placeholder='Doe' required/>
          </div>


          <div className='flex flex-col'>
            <label className='text-gray-700 text-start font-medium'>Email</label>
            <input onChange={(e)=>setUsername(e.target.value)} id='username' type='email' className='mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none' placeholder='johndoe@gmail.com' required/>
          </div>



          <div className='flex flex-col'>
          <label className='text-gray-700 text-start font-medium'>Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} id='password' type='password' className='mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none' placeholder='********' required/>
          </div>

            <div>
          {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
          </div>

          <button onClick={async()=>{
            try {
                      if (firstName.trim().length < 2) {
                        setError('First name must be at least 2 characters long');
                        return;
                    }
                    
                    if (lastName.trim().length < 2) {
                        setError('Last name must be at least 2 characters long');
                        return;
                    }
                    
                    if (username.trim().length < 6) {
                        setError('Username must be at least 6 characters long');
                        return;
                    }
                    
                    if (password.trim().length < 6) {
                        setError('Password must be at least 6 characters long');
                        return;
                    }
                    
                const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                    username,
                    firstName,
                    lastName,
                    password
                });
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("firstName", firstName);
                localStorage.setItem("lastName", lastName);
                navigate('/dashboard'); 
                toast.success('Account Created !', {
                  position,
                    style: {
                        background: '#00cc00', 
                        color: '#FFFFFF',      
                    }
                });
                <Toaster/>
                
            } catch (error) {
                setError(error.response.data.message); 
            }
    
          }} type='button' className='w-full bg-black text-white py-2 rounded-lg focus:outline-none'>Sign Up</button>



        </form>
        <div className='mt-4 text-gray-700 text-center'>
          Already have an account ?{' '}
          <span className='text-black cursor-pointer underline' onClick={() => navigate('/signin')}>Sign In</span>
        </div>
      </div>
    </div>
  )
}

export default Signup;
