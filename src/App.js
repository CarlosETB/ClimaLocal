import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
 
function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }  
    });
    setWeather(res.data);
  }

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])
  
  if (location === false) {
    return (
      <Fragment>
        <h1>- Você precisa habilitar a localização no browser -</h1>
      </Fragment>
    )
  } else if (weather === false) {
    return (
      <Fragment>
        <h1>- Carregando o clima... -</h1>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <h1>- Clima nas suas Coordenadas -</h1>
        <form>
          <div>
            <p>{weather['weather'][0]['description']}</p> 
            <h3>{Math.floor(weather['main']['temp'])}°</h3>
          </div>
          <line />
          <div>
            <ul>
              <li>Temperatura máxima: {Math.floor(weather['main']['temp_max'])}°</li>
              <li>Temperatura minima: {Math.floor(weather['main']['temp_min'])}°</li>
              <li>Pressão: {Math.floor(weather['main']['pressure'])} hpa</li>
              <li>Humidade: {Math.floor(weather['main']['humidity'])}%</li>
            </ul>
          </div>
        </form>
      </Fragment>
    );
  }
}
 
export default App;
