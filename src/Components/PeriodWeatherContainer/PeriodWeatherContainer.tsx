import React from 'react';
import PeriodWeather from '../PeriodWeather/PeriodWeather';

interface Props{
  spinner: boolean;
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
export default function PeriodWeatherContainer({spinner, upcomingForecast}:Props){
  console.log('____________________________________________________')
  return(
    <div className='periodWeatherContainer'>
      {upcomingForecast.length > 0 && !spinner ? upcomingForecast.map((period) => <PeriodWeather period={period}/>): ''}
    </div>
  )

}
