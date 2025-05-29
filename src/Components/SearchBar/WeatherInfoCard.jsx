import React, {useState} from 'react';
import './WeatherInfoCard.css';

const getlocalTimeAndDay = (timeZone) => {
  const timeOptions = {
    timeZone: timeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const dayOptions = { timeZone: timeZone, weekday: "long" };
  return {
    localTime: new Date().toLocaleTimeString([], timeOptions),
    currentTime: new Date(Date.now()).toLocaleTimeString(),
    dayOfWeek: new Date().toLocaleDateString([], dayOptions),
    today: new Date().toLocaleString("en", { weekday: "long" }),
  };
}

const WeatherInfoCard = ({weatherData}) => {
  // const [timeAndDay, setTimeAndDay] = useState(
  //   //getlocalTimeAndDay(weatherData.location.tz_id)
  //   {
  //     localTime: "00:00:00",
  //     currentTime: "00:00:00",
  //     dayOfWeek: "Sunday",
  //     today: "Today"
  //   }
  // );
   const [timeAndDay, setTimeAndDay] = useState(
    getlocalTimeAndDay(weatherData?.location?.tz_id)
  );

  // useEffect(() => {
  //   // Start the interval when the component mounts
  //   const intervalId = setInterval(() => {
  //     setTimeAndDay(getlocalTimeAndDay(weather.location.tz_id));
  //   }, 1000);

  //   // Clean up the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, [weather.location.tz_id]);

  return (
    <div className='infoCard'>
        <div className='infoImg'>           
             <img src={weatherData?.current?.condition?.icon} alt="error loading"  className='infoImg'/>              
        </div>
        <div>
           <span className='weekday'>{`${timeAndDay.today}, `}</span>
          <span >{timeAndDay.currentTime}</span>
        </div>
        <div>
          <h5>Local Time</h5>
          <span >{`${timeAndDay.dayOfWeek}, `}</span>
          <span >{timeAndDay.localTime}</span>
        </div>
        <div className='borderLine'></div>
        <div className='infoBox'>
        <div>{weatherData?.current?.condition?.text}</div>
        <div>
          <b>Precipitation</b>
          {` ${weatherData?.current?.precip_mm} mm`}
        </div>
      </div>
    </div>
  )
}

export default WeatherInfoCard;
