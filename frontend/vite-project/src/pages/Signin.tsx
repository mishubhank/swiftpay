import React, { useState } from 'react';
import Heading from '../components/Heading';
import Input from '../components/Input';
import Foot from '../components/Foot';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Buton from '../components/Buton';
import axios from 'axios';

const Signin = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
const [singIn,setsignIn]=useState(false);
 const handleIn = async () => {
  if (!username.trim() || !password.trim()) { // Check if fields are empty or contain only whitespace
    toast.error('Fill in all fields', {
      theme: 'dark'
    });
    return;
  
  return ;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
        username,
        password
      });
   
    localStorage.setItem('token',response.data.token);
      navigate('/Home');
      console.log("validdd");
    } catch (error) {
      toast.error('Invalid User', {
        theme: 'dark'
      });
      return;
    }
  };

  return (
    
    <div className="flex flex-col h-screen items-center justify-center bg-gray-600">
      <Heading text={'SignIn'} />
      <Input onChange={(e) => setUserName(e.target.value)} Main={'Username'} Placeholder={'tyler'} />
      <Input onChange={(e) => setPassword(e.target.value)} Main={'Password'} Placeholder={'wedonttalkabout@it'} />
      <Buton onClick={handleIn} button={'Signin'} />
      <Foot text={'Dont have an Accout?'} linktext={'Signup'} to={'/Signup'} />
     <ToastContainer/>
    </div>
  );
};

export default Signin;
