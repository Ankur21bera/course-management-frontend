import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Redux/User/Userslice';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isAuthenticated,user} = useSelector((state)=>state.user);
    const [showDropDown,setShowDropDown] = useState(false);
    const [showSidebar,setShowSidebar] = useState(false);
    const dropdownRef = useRef(null);
    const sidebarRef = useRef(null);

    useEffect(()=>{
        const handleOutSideClick = (e)=>{
            if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
                setShowDropDown(false)
            }
            if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
                setShowSidebar(false)
            }
        };
        document.addEventListener("mousedown",handleOutSideClick);
        return () => {
            document.removeEventListener("mousedown",handleOutSideClick)
        };
    },[])

    const logoutHandler = () => {
     dispatch(logoutUser());
     setShowDropDown(false);
     setShowSidebar(false);
     toast.success("Logout SuccessFull");
     navigate("/login")
    }
    const navLinkClass = ({ isActive }) =>`transition ${isActive? "text-indigo-600 font-semibold":"text-gray-700 hover:text-indigo-600"}`;

  return (
    <>
     <header className='sticky top-0 z-50 w-full bg-white shadow-sm'>
      <div className='max-w-7xl mx-auto p-5 lg:px-8 h-20 flex items-center justify-between'>
       <h1 className='text-2xl font-bold text-indigo-600 cursor-pointer' onClick={()=>navigate("/")}>Programmer Academy</h1>
       <nav className='hidden md:flex items-center gap-8'>
        <NavLink className={navLinkClass} to="/">
            Home
        </NavLink>
         <NavLink className={navLinkClass} to="/course">
            Courses
        </NavLink>
         <NavLink className={navLinkClass} to="/about">
            About
        </NavLink>
         <NavLink className={navLinkClass} to="/contact">
            Contact
        </NavLink>
       </nav>
       <div className='flex items-center gap-4'>
         {isAuthenticated ? (
           <div ref={dropdownRef} className='relative hidden md:block'>
             <button className='flex items-center gap-2 cursor-pointer' onClick={()=>setShowDropDown(!showDropDown)}>
              <img className='w-10 h-10 rounded-full border' src={user?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="" />
              <ChevronDown size={18}/>
             </button>
             {showDropDown && (
              <div className='absolute right-0 mt-4 w-56 bg-white rounded-xl shadow-xl overflow-hidden'>
               <div className='px-4 py-3 border-b'>
                 <h3 className='font-semibold'>{user?.name || "User"}</h3>
                 <p className='text-sm text-gray-500'>Student</p>
               </div>
               <button className='w-full text-left px-4 py-3 hover:bg-gray-100 cursor-pointer' onClick={()=>{navigate("/my-profile"); setShowDropDown(false)}}>
                My Profile
               </button>
               <button className='w-full text-left px-4 py-3  hover:bg-gray-100 cursor-pointer' onClick={()=>{navigate("/my-booking"); setShowDropDown(false)}}>
                My Enrollments
               </button>
               <button onClick={logoutHandler} className='w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100 cursor-pointer'>
                Logout
               </button>
              </div>
             )}
           </div>
         ):(
           <button className='hidden md:block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full transition cursor-pointer' onClick={()=>navigate("/login")}>
             Create Account
           </button>
         )}
         <button onClick={()=>setShowSidebar(true)} className='md:hidden'>
          <Menu size={28}/>
         </button>
       </div>
      </div>
     </header>
     {showSidebar && (
      <div className='fixed inset-0 bg-black/50 z-40'></div>
     )}
    <aside ref={sidebarRef} className={`fixed top-0 right-0 h-screen w-72 bg-white shadow-xl z-50 transition-transform duration-300 ${showSidebar ? "translate-x-0":"translate-x-full"}`}>
     <div className='flex items-center justify-between p-5 border-b'>
       <h2 className='text-xl font-bold'>
        Menu
       </h2>
       <button onClick={()=>setShowSidebar(false)}>
        <X/>
       </button>
     </div>
     <nav className='flex flex-col p-5 gap-5'>
      <NavLink onClick={() => setShowSidebar(false)} to="/">
        Home
      </NavLink>
      <NavLink onClick={() => setShowSidebar(false)} to="/course">
        Courses
      </NavLink>
      <NavLink onClick={() => setShowSidebar(false)} to="/about">
        About
      </NavLink>
      <NavLink onClick={() => setShowSidebar(false)} to="/contact">
        Contact
      </NavLink>
      <hr />
      {isAuthenticated ? (
       <>
         <NavLink onClick={() => setShowSidebar(false)}to="/my-profile">My Profile</NavLink>
         <NavLink onClick={() => setShowSidebar(false)}to="/my-bookings">My Enrollments</NavLink>
         <button className='text-left text-red-600' onClick={logoutHandler}>Logout</button>
       </>
      ):(
       <button className='bg-indigo-600 text-white rounded-lg py-3' onClick={()=>{setShowSidebar(false); navigate("/login")}}>
        Create Account
       </button>
      )}
     </nav>
    </aside>
    </>
  )
}

export default Navbar

