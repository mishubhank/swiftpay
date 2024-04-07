import React from 'react'
import { Link } from 'react-router-dom'

const Foot = ({text,linktext,to  }) => {
  return (
    
    <div className='flex'  >
    <div  className='text-gray-400 font-thin mr-2'>{text}</div>
    
<Link  to={to}>{linktext} </Link>
    
    </div>
  )
  
}

export default Foot


