import React from 'react'
import { Helmet } from 'react-helmet'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
    <Helmet>
        <title>Sniphare - Where Developer Find and Share Their Snippets</title>
    </Helmet>
    <div>
        <Navbar/>
    </div>
    </>
  )
}

export default Home