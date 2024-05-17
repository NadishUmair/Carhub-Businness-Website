import React from 'react'

export default function Navbar ({ className, style }) {
  return (
    <div className='flex justify-center p-4'>
      <nav className={`font-bold tracking-widest text-xl ${className}`} style={style}>
        CARHUB
      </nav>
    
    </div>
  )
}
