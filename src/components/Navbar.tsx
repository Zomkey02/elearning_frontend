
import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/AuthProvider";
import LogOut from "./Logout";
import LogoTwo from "../assets/logos/logo_two.svg";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { auth } = useContext(AuthContext);
  const isLoggedIn = auth.status === "loggedIn";

  return (
      <div className="w-full">
        <div className='flex items-center w-full py-4 mx-auto max-w-7xl'>
          {/* LOGO */}
          <Link to="/" className='flex items-center mr-4'>
            <img src={LogoTwo} alt="Logo" className='w-auto sm:h-6 md:h-7 lg:h-9 xl:h-12'/>
          </Link>
          
          {/* DESKTOP NAV-Links */}
          <div className='w-full'>
            <nav id='navbarCollapse'
              className={`${open ? "block" : "hidden"} lg:flex justify-between w-full sm:hidden`}
            >
              {/* left nav links */}
              <div className='items-center hidden gap-4 lg:flex'>
                <Link to='/elearning' className='link-nav'>E-Learning</Link>
                <Link to='/blog' className='link-nav'>Blog</Link>
                <Link to='/about' className='link-nav'>About</Link>
              </div>

              {/* right nav links */}
              <div className='items-center hidden gap-4 lg:flex'>
                <Link to='/contact' className='link-nav'>Contact</Link>

                {isLoggedIn && (
                  <Link to='/dashboard' className='link-nav'>Dashboard</Link>
                )}

                {isLoggedIn ? ( <LogOut isVisible={true} /> ) : (
                  <>
                  <Link to='/login' className='link-nav'>Login</Link>
                    <Link to='/signup' className='btn-nav'>Sign up</Link>
                  </>
                )}            
              </div>
            </nav>
          </div>
            
          {/* MOBILE toggle button */}  
          <button
            type='button'
            aria-label='Toggle-menu'
            onClick={() => setOpen(!open)}
            className='flex flex-col ml-auto space-y-1 lg:hidden'
          >
            <span className='w-6 h-0.5 bg-[#6DAE81]'></span>
            <span className='w-6 h-0.5 bg-[#6DAE81]'></span>
            <span className='w-6 h-0.5 bg-[#6DAE81]'></span>
          </button> 
        </div>
        {/* MOBILE NAV links */}  
        {open && (
          <div className='pb-4 space-y-2 lg:hidden'>
            <Link to='/elearning' className='link-nav'>E-Learning</Link>
            <Link to='/blog' className='link-nav'>Blog</Link>
            <Link to='/about' className='link-nav'>About</Link>
            
            <Link to='/contact' className='link-nav'>Contact</Link>

            {isLoggedIn && (
              <Link to='/dashboard' className='link-nav'>Dashboard</Link>
            )}

            {isLoggedIn ? ( <LogOut isVisible={true} /> ) : (
              <>
                <Link to='/login' className='link-nav'>Login</Link>
                <Link to='/signup' className='btn-nav'>Sign up</Link>
              </>
            )}       
          </div>
        )}

      </div>
    
  );
};

export default Navbar
