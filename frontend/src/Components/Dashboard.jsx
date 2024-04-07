import React, { useEffect } from 'react'
import Appbar from './Appbar'
import { Balance } from './Balance'
import { Users } from './User'
import { useNavigate} from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  
   useEffect(()=>{
    try{
      if(!localStorage.token){
        navigate('/signin')
      }
    }
    catch(error){
      navigate('/')
    }
   },[])
   

   
    
  return (
    <div>
        <Appbar />
        <div className='m-8 mx-6'>
            <Balance/>
            <Users />
        </div>
    </div>
  )
}

export default Dashboard
