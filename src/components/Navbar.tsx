
import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/AuthProvider";
import LogOut from "./Logout";
import type { ListItemProps } from "../types/Types";
import logoOne from '../assets/logos/logo_one.svg';


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { auth } = useContext(AuthContext);
  const isLoggedIn = auth.status === "loggedIn";

  return (
      <div>
        <div className='w-full px-4 lg:px-10 xl:px-16 py-4 flex items-center'>

            <img src={logoOne} alt='My Logo' className="h-15 w-auto mr-3" />

            <nav id='navbarCollapse'
              className={`${open ? "block" : "hidden"} lg:flex items-center space-x-6 flex-grow sm:hidden`}
            >
              <ListItem NavLink='/elearning'>E-Learning</ListItem>
              <ListItem NavLink='/#'>Blog</ListItem>
              <ListItem NavLink='/#'>About</ListItem>
              <div className='flex-grow'></div> 
              
              <div className='hidden lg:flex items-center space-x-6 justify-end'>
                <ListItem NavLink='/#'>Contact</ListItem>

                {isLoggedIn && (
                  <ListItem NavLink='/dashboard'>Dashboard</ListItem>
                )}

                {isLoggedIn ? ( <LogOut isVisible={true} /> ) : (
                  <>
                  <ListItem NavLink='/login'>Login</ListItem>
                    <Link to='/signup' className='btn-nav block mt-2 lg:mt-0 lg:inline-block'>Sign up</Link>
                  </>
                )}            
              </div>
            </nav>
          <button
            type='button'
            aria-label='Toggle-menu'
            onClick={() => setOpen(!open)}
            className='lg:hidden flex flex-col space-y-1 ml-auto'
          >
            <span className='w-6 h-0.5 bg-[#6DAE81]'></span>
            <span className='w-6 h-0.5 bg-[#6DAE81]'></span>
            <span className='w-6 h-0.5 bg-[#6DAE81]'></span>
          </button> 
        </div>

        {open && (
          <div className='lg:hidden px-4 pb-4 space-y-2 bg-[#fdfdfd]'>
            <ListItem NavLink='/#'>E-Learning</ListItem>
            <ListItem NavLink='/#'>Blog</ListItem>
            <ListItem NavLink='/#'>About</ListItem>
            
            <ListItem NavLink='/#'>Contact</ListItem>
            <ListItem NavLink='/login'>Login</ListItem>
            
            <Link to='/signup' className='btn-nav block'>Sign up</Link>
          </div>
        )}

      </div>
    
  );
};

export default Navbar

const ListItem = ({ children, NavLink }: ListItemProps) => {
  return (
     <Link to={NavLink} className='link-nav block px-2 py-1 hover:text-[#6DAE81] lg:inline-block'>
        {children}
    </Link>
  );
};