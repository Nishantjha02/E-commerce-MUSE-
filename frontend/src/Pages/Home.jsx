import React from 'react'
import './Styles/Home.css'
import MainBanner from '../components/MainBanner'
import ProductCatalog from '../components/ProductCatalog'
import Carousel from '../components/CarouselNew.jsx'

function Home() {
  return (
    <>
    <MainBanner/>
    <ProductCatalog/>
    <Carousel/>
    </>
  )
}

export default Home
