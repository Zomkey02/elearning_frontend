
import { useCallback, useState } from "react";
import { NavLink } from 'react-router-dom'
import LogOut from "../Logout";
import LogoOne from "../../assets/logos/logo_one.svg";
import { useAuth } from "../../hooks/useAuth";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {isLoggedIn} = useAuth();

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
      <div className="w-full">
        <div className='flex items-center w-full py-4 mx-auto max-w-7xl'>
          {/* LOGO */}
          <NavLink to="/" className='flex items-center ml-0 mr-4' onClick={closeMenu}>
            <img src={LogoOne} alt="Logo" className='w-auto sm:h-6 md:h-10 lg:h-15 xl:h-19'/>
          </NavLink>
          
          {/* DESKTOP NAV-Links */}
          <div className='w-full'>
            <nav id='navbarCollapse'
              className={`${open ? "block" : "hidden"} lg:flex justify-between w-full sm:hidden`}
            >
              {/* left nav links */}
              <div className='items-center hidden gap-4 lg:flex'>
                <NavLink 
                  to='/elearning' 
                  className={({isActive}) =>`link-nav ${isActive ? 'border-b-2 border-primary' : ''}` }
                >E-Learning</NavLink>
                <NavLink to='/blog' className='link-nav' >Blog</NavLink> 
                <NavLink to='/about' className='link-nav' >About</NavLink>
              </div>

              {/* right nav links */}
              <div className='items-center hidden gap-4 lg:flex'>
                {isLoggedIn && (
                  <>
                    <NavLink to='/course/create' className='link-nav'>Create Course</NavLink>
                    <NavLink to='/lesson/create' className='link-nav'>Create Lesson</NavLink>
                    <NavLink to='/dashboard' className='link-nav' >My Profile</NavLink>
                  </>
                )}

                {isLoggedIn ? ( <LogOut isVisible={true} /> ) : (
                  <>
                    <NavLink to='/login' className='link-nav'>Login</NavLink>
                    <NavLink to='/signup' className='btn-nav'>Sign up</NavLink>
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
            <NavLink to='/elearning' className='link-nav' onClick={closeMenu}>E-Learning</NavLink>
            <NavLink to='/blog' className='link-nav' onClick={closeMenu}>Blog</NavLink>
            <NavLink to='/about' className='link-nav' onClick={closeMenu}>About</NavLink>
            
            <NavLink to='/contact' className='link-nav' onClick={closeMenu}>Contact</NavLink>

            {isLoggedIn && (
              <NavLink to='/dashboard' className='link-nav' onClick={closeMenu}>Dashboard</NavLink>
            )}

            {isLoggedIn ? ( <LogOut isVisible={true} /> ) : (
              <>
                <NavLink to='/login' className='link-nav' onClick={closeMenu}>Login</NavLink>
                <NavLink to='/signup' className='btn-nav' onClick={closeMenu}>Sign up</NavLink>
              </>
            )}       
          </div>
        )}

      </div>
    
  );
};

export default Navbar
