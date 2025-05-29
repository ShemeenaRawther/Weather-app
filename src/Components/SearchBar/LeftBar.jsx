import React from 'react'
import WeatherInfoCard from './WeatherInfoCard';
import './LeftBar.css';
import CityCard from './CityCard';

const LeftBar = ({ weather, children }) => {
//   const {
//     location: { name, region, country },
//   } = weather;
  return (
    <div className='container fgLight'>
      {children}
      {/* <InfoCard weather={weather} />
      <CityCard info={`${name}, ${region}, ${country}`} /> */}
      {/* <WeatherInfoCard  weatherData={
            {
                city: "New York",
                temperature: 25,
                icon: "https://example.com/weather-icon.png",
                description: "Sunny"
            } 
        }/> */}
        <WeatherInfoCard  weatherData={weather} />
        <CityCard info={`${weather?.location?.name}, ${weather?.location?.region}, ${weather?.location?.country}`}/>
    </div>
  );
};

export default LeftBar;