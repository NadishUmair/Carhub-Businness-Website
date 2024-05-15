import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className='flex flex-col justify-center items-center mt-8  bg-sky-50 p-8'>
        <div className='w-[80%]'>
         <ul className='md:flex text-center justify-between'>
         <li className='mt-2 md:mt-0'><Link href={""} className=''>CarHub @2024</Link></li>
            <li className='mt-2 md:mt-0'><Link href={""} className=''>About Us</Link></li>
            <li className='mt-2 md:mt-0'><Link href={""}>Contact Us</Link></li>
            <li className='mt-2 md:mt-0'><Link href={""} className=''>Privacy</Link></li>
            <li className='mt-2 md:mt-0'><Link href={""} className=''>Term & Conditions</Link></li>
         </ul>

           
        </div>
    </div>
  )
}
