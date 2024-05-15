// src/components/Home/page.js
import React from 'react'
import Navbar from '../Navbar/page'
import Footer from '../Footer/page'
import HersoSection from '../HeroSection/page'
import CarSlide from '../CarSlide/page'
import ExploreCar from '../ExploreCars/page'

export function HomePage() {
  return (
    <div>
    {/* HeroSection with video */}
    <HersoSection />

    {/* Transparent Navbar */}
    <div className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <Navbar />
    </div>
       <CarSlide/>
       <ExploreCar/>
    {/* Add other content for the home page */}
    <Footer />
  </div>
  )
}
