import React from 'react'

const Input = ({Main ,Placeholder,onChange}) => {
  return (
    <>
      <h3 className="text-black-300 font-mono text-2xl  pt-3 " >{Main}</h3>
      <input onChange={onChange} className="placeholder:italic placeholder:text-slate-400 block bg-white w-60 border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm font-mono" placeholder={Placeholder} type="text" name="search"/>
    </>
  )
}

export default Input