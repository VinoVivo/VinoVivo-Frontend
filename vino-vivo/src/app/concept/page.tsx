import Concept from '@/components/concept/Concept'
import Footer from '@/components/layouts/footer/Footer'
import Header from '@/components/layouts/header/Header'
import React from 'react'

const conceptPage = () => {
  return (
    <div className='flex flex-col'>
    <Header/>
    <Concept/>
    <Footer/>
    </div>
  )
}

export default conceptPage