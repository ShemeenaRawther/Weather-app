import React, {useState, useEffect} from 'react'
import Content from '../Components/ContentBar/Content'
import Search from '../Components/SearchBar/Search';
import './Home.css';
import LeftBar from '../Components/SearchBar/LeftBar';

const API_KEY = import.meta.env.VITE_LOCATION_API_KEY;
const URL = import.meta.env.VITE_LOCATION_URL;

const getPlaceByLatitudeAndLongitude = async (lat, lon) => {
  const data = await fetch(
    `${URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${API_KEY}`
  );
  const place = await data.json();
  return await place[0].name;
};


const URL2 = import.meta.env.VITE_APP_URL2;
const KEY = import.meta.env.VITE_APP_KEY;

const getWeatherReport = async (place) => {
  const data =
    await fetch(`${URL2}/v1/forecast.json?key=${KEY}&q=${place}&days=3&aqi=yes&alerts=no
  `);
  return await data.json();
};

const Home = () => {
  const [weatherData, setWeatherData] = useState(false);

  // displaying the weather report based on the current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const place = await getPlaceByLatitudeAndLongitude(
            latitude,
            longitude
          );
          await fetchWeather(place);
          //setLoading(false);
        },
        async (error) => {
          console.error("Error getting geolocation:", error);
          await fetchWeather("London");
          //setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      //setLoading(false);
    }
  }, []);
  
   const fetchWeather1 = async (city) => {
    if(city === "") 
        {
            alert("Please enter a city name");
            return;
        }
    try {
        const weather_api_url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
        var response = await fetch(weather_api_url);
        const data = await response.json();
        if(!response.ok){
            alert("City not found");
            return;
        }
        console.log(data);
        console.log("feels like", data.main.feels_like);
        setWeatherData({
            feelsLike:data.main.feels_like,
            humidity:data.main.humidity, 
            windSpeed:data.wind.speed,
            temperature:Math.floor(data.main.temp), 
            location:data.name,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}); 

    } catch (error) {
        setWeatherData(false);
        console.log("error in fetching data",error);
    }
}

const fetchWeather = async (place) => {
    if (place) {
      //setLoading(true);
      const data = await getWeatherReport(place);
      if (data.error) {
        console.log("place not exist");
        const data_ = await getWeatherReport("London");
        setWeatherData(data_);
        //setLoading(false);
      } else {
        //setLoading(false);
        console.log("place exist", data);
        setWeatherData(data);
      }
    }
  };

  return (
    <div className='test-container'>        
         <div class="left"> 
            <LeftBar weather={weatherData}>
              <Search fetchWeather={fetchWeather}/>
            </LeftBar>
        </div>
        <div class="right"><Content weather={weatherData}/> </div>
    </div>
  )
}

export default Home;
