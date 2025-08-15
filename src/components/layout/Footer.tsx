import React from 'react'
import logoOne from '../../assets/logos/logo_one.svg';

const Footer = () => {
  return (
    <div className='flex flex-col items-center justify-center px-6 m-5 max-w-7xl md:flex-row'>
        {/* Logo */}
        <div className='mb-6 md:mb-0'>
          <img src={logoOne} alt='My Logo' className='w-auto mr-3 h-17'/>
        </div>

        {/* Links */}
        <div className='flex space-x-16 text-sm text-black '>
          <div className='flex flex-col space-y-2'>
            <a href='/elearning' >E-Learning</a>
            <a href="/blog" >Blog</a>
            <a href="/about" >About</a>
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