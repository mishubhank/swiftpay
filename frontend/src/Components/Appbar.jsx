import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';

function Appbar() {
    const navigate = useNavigate();
    const [dropDown, setDropDown] = useState(false);
    const [name,setName]=useState('');
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const storedName = localStorage.getItem('firstName');
                if (storedName) {
                    setName(storedName);
                }
            } catch (error) {
                console.error("Some Error Occurred", error);
            }
        };

        fetchDetails(); 
    }, []); 


  return (
     <div className="shadow h-14 flex justify-between">
         <div className="flex flex-col justify-center h-full ml-4">
           
            <div className='cursor-pointer'><img src={logo} onClick={()=>{navigate('/dashboard')}}  className='h-28 fill-gray-800'/></div>
           
        </div>
        <div className="flex">
            <button onClick={()=>{setDropDown(!dropDown)}}   className="rounded-full h-10 w-10 bg-red-400 flex justify-center mr-4 my-auto">
                <div className="flex flex-col justify-center h-full text-xl">
                {name && <p>{name[0].toUpperCase()}</p>}
                </div>
                </button>
        </div>
        {dropDown && (
                <div className='absolute w-32 h-24 bg-slate-200 right-0 top-14 rounded-md p-4 py-2 text-white'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <button onClick={()=>{navigate('/profile')}} className='bg-slate-800 w-28 py-1.5 rounded-md my-auto'>Profile</button>
                        <button onClick={()=>{localStorage.clear(); navigate('/signin')}} className='bg-slate-800 w-28 py-1.5 rounded-md my-auto'>Logout</button>
                    </div>
                </div>
            )}
    </div>
  )
}

export default Appbar
