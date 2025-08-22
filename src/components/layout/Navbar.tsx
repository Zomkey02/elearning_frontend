
import { useCallback, useState } from "react";
import { NavLink } from 'react-router-dom'
import LogOut from "../Logout";
import LogoOne from "../../assets/logos/logo_one.svg";
import { useAuth } from "../../hooks/useAuth";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {isLoggedIn, isAdmin} = useAuth();

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
      <div className='flex flex-col items-center justify-center w-full '>
        <div className='flex items-center w-full px-6 py-2 max-w-7xl'>
          {/* LOGO */}
          <NavLink to="/" className='flex items-center ml-0 mr-4' onClick={closeMenu}>
            <img src={LogoOne} alt="Logo" className='w-auto h-19'/>
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
                <NavLink 
                  to='/blog' 
                  className={({isActive}) =>`link-nav ${isActive ? 'border-b-2 border-primary' : ''}` }
                  >Blog</NavLink> 
                <NavLink 
                  to='/about' 
                  className={({isActive}) =>`link-nav ${isActive ? 'border-b-2 border-primary' : ''}` } 
                >About</NavLink>
              </div>

              {/* right nav links */}
              <div className='items-center hidden gap-4 lg:flex'>
                {isAdmin && (
                  <>
                    <NavLink to='/course/create' className={({isActive}) =>`link-nav ${isActive ? 'border-b-2 border-primary' : ''}` }>Create Course</NavLink>
                    <NavLink to='/lesson/create' className={({isActive}) =>`link-nav ${isActive ? 'border-b-2 border-primary' : ''}` }>Create Lesson</NavLink>
                    <NavLink to='/dashboard' className={({isActive}) =>`link-nav ${isActive ? 'border-b-2 border-primary' : ''}` } >My Profile</NavLink>
                  </>
                )}

                {isLoggedIn && !isAdmin && (
                  <>
                    <NavLink to='/contact' className={({isActive}) =>`link-nav ${isActive ? 'border-b-2 border-primary' : ''}` } >Contact</NavLink>
                    <NavLink to='/dashboard' className={({isActive}) =>`link-nav ${isActive ? 'border-b-2 border-primary' : ''}` } >My Profile</NavLink>
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
          <div className='flex flex-col justify-start w-full px-6 pb-4 space-y-2 lg:hidden'>
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
                <NavLink to='/signup' className='text-center btn-nav max-w-30' onClick={closeMenu}>Sign up</NavLink>
              </>
            )}       
          </div>
        )}

      </div>
    
  );
};

export default Navbar
