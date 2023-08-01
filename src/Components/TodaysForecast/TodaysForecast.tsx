import React from 'react';
import { generateKey } from "src/Functions/HelperFunctions";
import IconPicker from '../IconPicker/IconPicker';
import './TodaysForecast';

const TodaysForecast = (dayForecast: any) => {
  return (
    <div className='todaysRowContainer'>
      <span className='todaysRowHeader'>Current Weather: {dayForecast?.[0]?.shortForecast}</span>
      <div className='todaysRow'>
        <br />
        {dayForecast.length > 0 ?
          dayForecast?.slice(1, 26).map((hour: any) => {
            const weatherInfo: string | undefined = hour?.icon?.indexOf('day') > -1 ? hour?.icon?.split('day')[1] : hour?.icon?.split('night')[1];
            const weather: string | undefined = weatherInfo?.split('/')?.[1]?.split(',')[0];
            const d = new Date(hour?.startTime)
            let hours = d.getHours();
            const suffix = (hours >= 12) ? 'pm' : 'am';
            hours = (hours > 12) ? hours - 12 : hours;
            hours = (`${hours}` === '0') ? 12 : hours;
            return (
              <div className='todaysCol' key={generateKey(JSON.stringify(hour))}>
                <div className='todaysLine1'>{hours}{suffix}</div>
                <div className='todaysLine2'><IconPicker weather={weather} time={'day'} /></div>
                <div className='todaysLine3'>{hour?.temperature}&deg;</div>
              </div>
            )
          })
          : ''
        }
      </div>
    </div>
  )
}

export default TodaysForecast;