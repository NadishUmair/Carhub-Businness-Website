import React from 'react';
import sliderImg from '../CarData';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CarSlide.css"

export default function CarSlide() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024, // Tailwind's lg breakpoint
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768, // Tailwind's md breakpoint
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 640, // Tailwind's sm breakpoint
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    };
    return (
        <div className='container mx-auto p-4'>
            <Slider {...settings}>
                {sliderImg.map((item, index) => (
                    <div key={index} className='p-2'>
                        <img src={item.image} className='w-full h-auto' alt={`Slide ${index}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
