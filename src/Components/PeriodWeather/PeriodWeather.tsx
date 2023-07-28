import './PeriodWeather.css';
import React from 'react'

interface Props{
  period: {
    icon: string;
    name: string;
    windSpeed: string;
    isDaytime: string;
    temperature: string;
    windDirection: string;
    shortForecast: string;
    temperatureUnit: string;
    detailedForecast: string;
    dewpoint: {
      value: number;
      unitCode: string;
    };
    relativeHumidity: {
      value: number;
    };
    probabilityOfPrecipitation: {
      value: number;
    };
  }
}


const PeriodWeather = ( { period } : Props ) => {
  return (<div className={`periodWeatherCard ${period?.isDaytime ? 'daytime' : 'nightTime'}`}    >
    <h1>{period?.name}</h1>
    <img style={{ borderRadius: '5px', border: '3px solid' }} src={period?.icon} alt='periodIcon' />
    <p>{period?.shortForecast}</p>
    <p>{period?.temperature}{period?.temperatureUnit}&deg;</p>
    <p>Wind: {period?.windSpeed} {period?.windDirection}</p>
    <p>Dewpoint: {Math.round(period?.dewpoint?.value)}&deg; {period?.dewpoint?.unitCode.slice(-1)}</p>
    <p>{period?.probabilityOfPrecipitation?.value}% Chance of Precipitation</p>
    <p>{period?.relativeHumidity?.value}% Humidity</p>
    <p>{period?.detailedForecast}</p>
  </div>)
}

export default PeriodWeather;