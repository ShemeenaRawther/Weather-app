import React from 'react'
import './Content.css'
import { Card } from './Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTemperatureArrowDown,
  faTemperatureArrowUp,
  faMountainSun,
  faCloudSun,
  faWind,
  faCompass,
  faEye,
  faDroplet,
  faThermometer,
  faLungs,
} from "@fortawesome/free-solid-svg-icons";

import { AQI} from './AQIIndex';
const getDayName = (dateEpoch) => {
  const dayName = new Date(dateEpoch * 1000).toLocaleString("en-US", {
    weekday: "long",
  });
  return dayName;
};


const Content = ({weather}) => {  
   const index = weather?.current?.air_quality?.["us-epa-index"];

  // constructing list of weather forecast
  const forecastlistItems = weather?.forecast?.forecastday?.map((val) => (
    <Card
      key={val.date_epoch}
      className={`forecastCard`}
      // mode={mode}
      title={getDayName(val.date_epoch)}
    >
      <div>
        <div className='forecastImg'>
          <img src={val.day.condition.icon} alt="error loading" />
        </div>

        <div>
          <FontAwesomeIcon
            icon={faTemperatureArrowDown}
            style={{ color: "#00D1D1" }}
          />
          <span className='cardData'>{`${val.day.mintemp_c} °C`}</span>
        </div>

        <div>
          <FontAwesomeIcon
            icon={faTemperatureArrowUp}
            style={{ color: "#FF0000" }}
          />
          <span className='cardData'>{`${val.day.maxtemp_c} °C`}</span>
        </div>
      </div>
    </Card>
  ));

  return (
    <div className='container bgLight'>
      <h2 className='heading'>This Week</h2>
      <div className='forecast'>{forecastlistItems}</div>
      <h2 className='heading'>Today's Highlights</h2>
      <div className='todayData'>
         <Card  title="Feels Like" className="todayCard">
          <div>
            <FontAwesomeIcon icon={faThermometer} />           
            <span className="cardData">{`${weather?.current?.feelslike_c}°C`} </span>
          </div>
         </Card>
         <Card title="Wind" className="todayCard">
          <div>
            <FontAwesomeIcon icon={faWind} style={{ color: "#FFA500" }} />            
            <span className='cardData'>{`${weather?.current?.wind_kph} Km/h`}</span>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faCompass}
              spin
              style={{ color: "#FFA500" }}
            />
            <span className='cardData'>{weather?.current?.wind_dir}</span>
          </div>
        </Card>
        <Card title="Visibility" className="todayCard">
          <div>
            <FontAwesomeIcon icon={faEye} fade />
            <span className='cardData'>{`${weather?.current?.vis_km} Km`} </span>
          </div>
        </Card>
         <Card title="Humidity" className="todayCard">
          <div>
            <FontAwesomeIcon icon={faDroplet} />
            <span className='cardData'>{`${weather?.current?.humidity}`}</span>
          </div>
        </Card>
        </div>
        <div className='todayData'>
        <Card title="Min & Max" className="todayCard">
          <div>
            <FontAwesomeIcon
              icon={faTemperatureArrowUp}
              style={{ color: "#FF0000" }}
            />
            <span className='cardData'>{`${weather?.forecast?.forecastday[0]?.day?.
              maxtemp_c} °C`}</span>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faTemperatureArrowDown}
              style={{ color: "#00D1D1" }}
            />
            <span className='cardData'>{`${weather?.forecast?.forecastday[0]?.day?.mintemp_c} °C`}</span>
          </div>
        </Card>
        <Card title="Sunrise & Sunset" className="todayCard">
          <div>
            <FontAwesomeIcon
              icon={faMountainSun}
              style={{ color: "#FFA500" }}
            />
            <span className='cardData'>{weather?.forecast?.forecastday[0]?.astro?.sunrise}</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faCloudSun} style={{ color: "#FFA500" }} />
            <span className='cardData'>{weather?.forecast?.forecastday[0]?.astro?.sunset}</span>
          </div>
        </Card>
        <Card title="Air Components" className="todayCard">
              <div className='cardData'>
            <b>PM 2.5: </b>
            { weather?.current?.air_quality?.pm2_5?.toFixed(2)}
          </div>
          <div className='cardData'>
            <b>PM 10: </b>
            {weather?.current?.air_quality?.pm10?.toFixed(2)}
          </div>
        </Card>
        <Card title="Air Quaity" className="todayCard">
              <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0 8px",
            }}
          >
             <FontAwesomeIcon icon={faLungs} />
             <div
              style={{
                color: AQI?.[index]?.color,
                fontSize: "20px",
                fontWeight: "900",
                textAlign: "center",
              }}
              className='cardData'
            >
              {AQI?.[index]?.label}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Content