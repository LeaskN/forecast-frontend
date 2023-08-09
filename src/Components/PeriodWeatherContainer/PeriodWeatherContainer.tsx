import React, { ReactNode } from 'react';
import PeriodWeather from '../PeriodWeather/PeriodWeather';
import { generateKey } from '../../Functions/HelperFunctions';
import './PeriodWeatherContainer.css';

interface Props{
  loader: boolean;
  upcomingForecast: Period[];
  numberOfDays: number;
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
export default function PeriodWeatherContainer({loader, upcomingForecast, numberOfDays}:Props){
  return(
    <div className='periodWeatherContainer'>
      {upcomingForecast.length > 0 && !loader ? 
        upcomingForecast.reduce<ReactNode[]>((a, c, i) => {
          const currentDay = i+1;
          if(currentDay <= numberOfDays *2){
            return [...a, <PeriodWeather key={generateKey(JSON.stringify(c))} period={c}/>];
          }
          return a;
        }, [])
        : ''}
    </div>
  )
}