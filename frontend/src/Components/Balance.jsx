import { useEffect, useState } from "react"
import axios from "axios"

export const Balance = () => {
    const [balance,setBalance]= useState(0);

    useEffect(() => {
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
    fetchBalance();
    },[])
    
    const [name,setName]=useState('');
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const storedName = localStorage.getItem('firstName')
                // +" "+ localStorage.getItem('lastName');
                if (storedName) {
                    setName(storedName);
                }
            } catch (error) {
                console.error("Some Error Occurred", error);
            }
        };

        fetchDetails(); 
    }, []); 


    return <div> 

        <div className="font-bold text-2xl pb-8">Welcome {name && <span>{name}</span>}</div>


        <div className="flex">
        <div className="font-bold text-xl">
        Available Balance : 
        </div>
        <div className="font-bold ml-2 text-xl">
            {balance && <p>Rs {balance}</p>}
        </div>
    </div>
    </div>
}