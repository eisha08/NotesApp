import React, { useEffect, useState } from 'react'
import logo from '../images/logo.png'
import { FaRegUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Header = () => {

    const [greeting, setGreeting] = useState("");

    useEffect(() => {
      const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) {
          return "Good Morning 🌞";
        } else if (hour < 18) {
          return "Good Afternoon ☀️";
        } else {
          return "Good Evening 🌙";
        }
      };
  
      setGreeting(getGreeting());
    }, []);

  return (
    <div className='flex flex-row justify-between bg-[#F7EFC5]' >
        <div className='flex flex-row space-x-2 px-2 py-2'>
            <span className=''><img className='h-20 w-20' src={logo} alt="" /></span>
            <span className='text-3xl font-semibold py-4'>Noted!</span>
            
        </div>
        <div className='flex flex-row space-x-8  px-4 py-10 text-xl font-mono '>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/allpaste'>Notes</NavLink>
            
            
           
        </div>
        <div className='flex flex-col space-x-2 py-4 px-4'>
            <span className='text-xl font-semibold'>
               {greeting} 
            </span>
            <span className='flex flex-row space-x-1 px-2'>
                <span className='py-1 text-xl'><FaRegUserCircle /></span>
                <span className='text-xl'>Username</span>
            </span>
        </div>
    </div>
  )
}

export default Header