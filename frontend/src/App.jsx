import { useState } from 'react'
import {BrowserRouter ,Routes ,Route} from 'react-router-dom'
import { Toaster } from 'sonner'
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import Dashboard from './Components/Dashboard'
import SendMoney from './Components/SendMoney'
import Profile from './Components/Profile'
import Update from './Components/Update'
import Redirect from './Components/Redirect'

function App() {

  return (
    <div className=''>
    <BrowserRouter>
    <Routes>
      <Route path ="/signup" element={<Signup/>} />
      <Route path ="signin" element={<Signin/>} />
      <Route path ="/dashboard" element={<Dashboard/>} />
      <Route path ="/send" element={<SendMoney/>} />
      <Route path ="/profile" element={<Profile/>} />
      <Route path ="/update" element={<Update/>} />
      <Route path="/" element={<Redirect to="/signin" />} />
    </Routes>
    </BrowserRouter>
    <Toaster/>
    </div>
  )
}

export default App
