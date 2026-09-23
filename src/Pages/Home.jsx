import React from 'react'
import Header from '../Components/Header'
import Specialitymenu from '../Components/Specialitymenu'
import Topcourses from '../Components/Topcourses'
import Banner from '../Components/Banner'

const Home = () => {
  return (
    <main className='min-h-screen'>
     <Header/>
     <Specialitymenu/>
     <Topcourses/>
     <Banner/>
    </main>
  )
}

export default Home