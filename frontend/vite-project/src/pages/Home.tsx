import React, { useEffect, useState } from 'react'
import Heading from '../components/Heading'
import axios from 'axios'
import Buton from '../components/Buton'
import {  useNavigate } from 'react-router-dom'

const Home = () => { 
 const navigate=useNavigate();
 

 const [users,setusers]=useState([]);
 const [filter,setFilter]=useState("");

 useEffect(()=>{
 
  if(!localStorage.token){
    navigate('/Signin');
return   
}
  



 },[]);
  useEffect(()=>{
    axios.get('http://localhost:3000/api/v1/user/bulk?filter='+filter,{

     }).then(response=>{
setusers(response.data.user);// what is this ?? 
     })


  },[filter]); 
  return (


    <div  className='  bg-gray-600 pl-10 w-full'   >
    <Heading text={"Search User" }/>    
  <input  onChange={(e)=>{
    setFilter(e.target.value);
  }} className="placeholder:italic placeholder:text-slate-400 block bg-white w-2/5 border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm font-mono  " placeholder="Enter Reciever name..." type="text" name="search"/>
  <div>
            {users.map(user => <User user={user} />)}
        </div>


    </div>
  )
}
function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Buton onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }}button ={"Send Money"} />
        </div>
    </div>
}
export default Home;