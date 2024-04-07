import React, { useState } from 'react'
import {useSearchParams, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import Appbar from './Appbar';

function  SendMoney(){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [amount,setAmount] =useState();
    const firstName = searchParams.get("firstName");
    const lastName = searchParams.get("lastName");
    const id = searchParams.get("id");
  

    const initiateTransfer = async () => {
        if (!navigator.onLine) {
            toast.error("Please check your internet connection", {
                position,
                style: {
                    background: '#FF0000',
                    color: '#FFFFFF',
                }
            });
          }
        const isSmallScreen = window.innerWidth <= 600; 
        const position = isSmallScreen ? 'bottom-right' : 'top-right';
            if (amount > 0) {
                const response = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                    to: id,
                    amount
                }, {
                    headers: {
                        Authorization:"Bearer " + localStorage.getItem("token")
                    }
                });
                // console.log(response.data.message);
    
                if (response.data.message === "Transaction Successful") {
                    navigate('/dashboard')
                    toast.success("Transaction Successful", {
                        position,
                        style: {
                            background: '#00cc00',
                            color: '#FFFFFF',
                        }
                    });
                    <Toaster/>
                } else {
                    toast.error(response.data.message, {
                        position,
                        style: {
                            background: '#FF0000',
                            color: '#FFFFFF',
                        }
                    });
                }
            } else {
                toast.error("Invalid Amount. Please enter a positive value.", {
                    position,
                    style: {
                        background: '#FF0000',
                        color: '#FFFFFF',
                    }
                });
            }
        
    };
    
    return <div className='h-full w-full'>
        <Appbar/>
        <div className="flex justify-center mt-24">
        <div className=" flex flex-col justify-center">
            <div className="border h-min text-card-foreground w-96 pt-4 pb-3 px-4 space-y-8  bg-white shadow-lg rounded-lg">
                <div className="flex flex-col space-y-1.5 px-6 py-3 pb-1">
                <h2 className="text-3xl font-bold text-center pt-2">Send Money</h2>
                </div>
                <div className="px-6">
                <div className="flex items-center space-x-4 mx-auto">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">{firstName[0]}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{firstName} {lastName}</h3>
                </div>
                <div className="space-y-4 py-6">
                    <div className="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="amount">
                        Amount (in Rs)
                    </label>
                    <input
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                        min='1'
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                    />
                    </div>
                    <button onClick={initiateTransfer} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">Initiate Transfer</button>
                    <button onClick={()=>{navigate('/dashboard')}}className='justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-gray-800 text-white'>Go Back</button>
                </div>
                </div>
        </div>
      </div>
    </div>
    </div>
}

export default SendMoney
