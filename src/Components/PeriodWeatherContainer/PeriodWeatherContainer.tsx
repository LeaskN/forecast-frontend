import React from 'react';
import PeriodWeather from '../PeriodWeather/PeriodWeather';
import { generateKey } from '../../Functions/HelperFunctions';
import './PeriodWeatherContainer.css';

interface Props{
  loader: boolean;
  upcomingForecast: Period[];
}
interface Period {
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
export default function PeriodWeatherContainer({loader, upcomingForecast}:Props){
  return(
    <div className='periodWeatherContainer'>
      {upcomingForecast.length > 0 && !loader ? upcomingForecast.map((period) => <PeriodWeather key={generateKey(JSON.stringify(period))} period={period}/>): ''}
    </div>
  )

}
