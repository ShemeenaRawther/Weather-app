import React from 'react'
import './Card.css'

export const Card = ({title,className,children}) => {
  return (
    <div
      className={`${className} fgLight`}>
    {/* <div className={className} fgLight> */}
        <div className='cardTitle'>
            {title}
        </div>
        {children}
    </div>
  )
}
