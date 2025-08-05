
import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/AuthProvider";
import LogOut from "./Logout";
import type { ListItemProps } from "../types/Types";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { auth } = useContext(AuthContext);
  const isLoggedIn = auth.status === "loggedIn";

  return (
      <div className='bg-[#fdfdfd] text-black'>
        <div className='w-full px-4 lg:px-16 py-4 flex items-center'>
          
          <div className='flex items-center space-x-8 w-1/3'>
            <div className='text-xl font-bold'>Logo</div>
            <nav
              id='navbarCollapse'
              className={`${open ? "block" : "hidden"} lg:flex space-x-6`}
            >
              <ListItem NavLink='/elearning'>E-Learning</ListItem>
              <ListItem NavLink='/#'>Blog</ListItem>
              <ListItem NavLink='/#'>About</ListItem>
            </nav>
          </div>

          <div className='flex-grow'></div> 
          
          <div className='hidden lg:flex items-center space-x-6 justify-end w-1/4'>
            <ListItem NavLink='/#'>Contact</ListItem>

            {isLoggedIn && (
              <ListItem NavLink='/dashboard'>Dashboard</ListItem>
            )}

            {isLoggedIn ? ( <LogOut isVisible={true} /> ) : (
              <>
               <ListItem NavLink='/login'>Login</ListItem>
                <Link to='/signup' className='bg-[#6DAE81] text-white px-4 py-2 rounded hover:bg-white hover:text-black transition'>Sign up</Link>
              </>
            )}            
          </div>

          <button
           type='button'
           aria-label='Toggle-menu'
           onClick={() => setOpen(!open)}
           className='lg:hidden flex flex-col space-y-1'
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
            
            <Link to='/signup' className='block bg-[#6DAE81] text-white px-4 py-2 rounded hover:bg-white hover:text-black transition'>Sign up</Link>
          
          </div>
        )}

      </div>
    
  );
};

export default Navbar

const ListItem = ({ children, NavLink }: ListItemProps) => {
  return (
     <Link to={NavLink} className='text-black hover:text-[#6DAE81]'>
        {children}
    </Link>
  );
};