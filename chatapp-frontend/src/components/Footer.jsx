import React from 'react'
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className='w-screen h-max p-2 flex justify-center gap-2 bg-teal-800 absolute bottom-0 z-20'>
        <FaGithub size={25} color='white' href='https://github.com/Alejandra-Villalobos/'/>
        <FaLinkedin size={25} color='white' href='https://www.linkedin.com/in/alejandra-villalobos-558972203/'/>
    </div>
  )
}

export default Footer