import React from 'react'
import './CityCard.css'

 const CityCard = ({info}) => {
  return (
    <div className='cityCard'>
        <div className='cityName'>{info}</div>
    </div>
  )
}

export default CityCard;
