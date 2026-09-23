import React from 'react'
import { Toaster } from "react-hot-toast";
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Course from './Pages/Course';
import Coursedetail from './Pages/Coursedetail';
import Login from './Pages/Login';
import Myprofile from './Pages/Myprofile';
import Mybooking from './Pages/Mybooking';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Paymentsuccess from './Pages/Paymentsuccess';
import Footer from './Components/Footer';

const App = () => {
  return (
    <div className='min-h-screen flex flex-col bg-white'>
    <Toaster position='top-right' reverseOrder={false}/>
    <Navbar/>
    <main className='flex-1'>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/course' element={<Course/>}/>
      <Route path='/course/:speciality' element={<Course/>}/>
      <Route path='/booking/:courseId' element={<Coursedetail/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/my-profile' element={<Myprofile/>}/>
      <Route path='/my-booking' element={<Mybooking/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/payment-success' element={<Paymentsuccess/>}/>
     </Routes>
    </main>
    <Footer/>
    </div>
  )
}

export default App