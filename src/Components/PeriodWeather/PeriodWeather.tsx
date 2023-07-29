import ProgressBar from '../ProgressBar/ProgressBar';
import './PeriodWeather.css';
import React, { useState } from 'react'
import IconPicker from '../IconPicker/IconPicker';

interface Props {
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

const PeriodWeather = ({ period }: Props) => {
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleMouseEvent = () => {
    setHover(!hover);
  };
  const handleClickEvent = () => {
    setClicked(!clicked);
  };

  const weatherInfo: string | undefined = period?.icon?.indexOf('day') > -1 ? period?.icon?.split('day')[1] : period?.icon?.split('night')[1];
  const weather: string | undefined = weatherInfo?.split('/')?.[1]?.split(',')[0];
  const day: string | undefined = period?.icon?.indexOf('night') > -1 ? 'night' : 'day';

  return (
    <div onMouseEnter={handleMouseEvent} 
         onMouseLeave={handleMouseEvent}
         onClick={handleClickEvent}
         className={`periodWeatherCard ${period?.isDaytime ? 'daytime' : 'nightTime'}`} 
          style={hover || clicked?{
            transition: '3s ease',
            height: '100%',
            maxHeight: '1000px',
          }:{}}
        >
      <div className='periodRow1'>
        <div className='column firstCol'>
          <div className='periodName'>{period?.name}</div>
        </div>
        <div className='column secondCol'>
          {weather ? <IconPicker weather={weather} time={day} /> : ''}
          <div>{period?.probabilityOfPrecipitation?.value > 0 ? period?.probabilityOfPrecipitation?.value + '%' : ''}</div>
        </div>

        <div className='column thirdCol'>
          <ProgressBar temp={period.temperature} />
        </div>
      </div>
      <div className='periodRow2'>
        <p>{period?.detailedForecast}</p>
      </div>
    </div>
  )
}

// const PeriodWeather = ( { period } : Props ) => {
//     <h1>7-Day Forecast</h1>
//   return (<div className={`periodWeatherCard ${period?.isDaytime ? 'daytime' : 'nightTime'}`}    >
//     <h1>{period?.name}</h1>
//     <img style={{ borderRadius: '5px', border: '3px solid' }} src={period?.icon} alt='periodIcon' />
//     <p>{period?.shortForecast}</p>
//     <p>{period?.temperature}{period?.temperatureUnit}&deg;</p>
//     <p>Wind: {period?.windSpeed} {period?.windDirection}</p>
//     <p>Dewpoint: {Math.round(period?.dewpoint?.value)}&deg; {period?.dewpoint?.unitCode.slice(-1)}</p>
//     <p>{period?.probabilityOfPrecipitation?.value}% Chance of Precipitation</p>
//     <p>{period?.relativeHumidity?.value}% Humidity</p>
//     <p>{period?.detailedForecast}</p>
//   </div>)
// }

export default PeriodWeather;