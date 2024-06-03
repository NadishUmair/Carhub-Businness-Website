import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/page';
import Footer from '../Footer/page';
import HersoSection from '../HeroSection/page';
import CarSlide from '../CarSlide/page';
import ExploreCar from '../ExploreCars/page';
import { MoonLoader } from 'react-spinners';


export function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <MoonLoader color="red" />
        </div>
      ) : (
   
        <>
       
          <HersoSection />

    
          <div className="fixed top-0 left-0 w-full z-50 bg-transparent">
            <Navbar style={{ color: "white" }} />
          </div>

          <CarSlide />
          <ExploreCar />

          <Footer />
        </>
      )}
    </div>
  );
}
