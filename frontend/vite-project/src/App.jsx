import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Send from './pages/Send';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
function App() {


  return (
    <>
   <BrowserRouter>
    <Routes>
  
  <Route path='/signup' element ={<Signup/>}/>
   <Route path='/signin' element={<Signin/>}/>
   <Route path='/send' element={<Send/>}/>
   <Route path='/home' element={<Home/>}/>


    </Routes> 
   </BrowserRouter>
    </>
  )
}

export default App
