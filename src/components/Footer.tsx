import React from 'react'
import logoOne from '../assets/logos/logo_one.svg';

const Footer = () => {
  return (
    <div className='max-w-7xl m-5 px-6 flex flex-col md:flex-row items-center justify-center'>
        {/* Logo */}
        <div className='mb-6 md:mb-0'>
          <img src={logoOne} alt='My Logo' className='h-17 w-auto mr-3'/>
        </div>

        {/* Links */}
        <div className='flex space-x-16 text-sm text-black '>
          <div className='flex flex-col space-y-2'>
            <a href='/elearning' >E-Learning</a>
            <a href="#" >Blog</a>
            <a href="#" >About</a>
          </div>
          <div className='flex flex-col space-y-2'>
            <a href="#" >Contact</a>
            <a href="#" >Glossary</a>
            <a href="#" >Privacy and Terms</a>
          </div>
        </div>
    </div>
  )
}

export default Footer