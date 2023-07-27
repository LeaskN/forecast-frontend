import './PeriodWeather.css'

export default function PeriodWeather({period}){
  console.log(period)
  return(
    <div className={`periodWeatherCard ${period.isDaytime? 'daytime' : 'nightTime'}`}
      // style={{  backgroundImage: `url('${period.icon}')`}}
    >
      <img style={{borderRadius: '5px', border:'3px solid'}} src={period.icon} alt='periodIcon'/>
      <h1>{period.name}</h1>
      <p>{period.temperature}{period.temperatureUnit}&deg;</p>
      <p>Wind: {period.windSpeed} {period.windDirection}</p>
      <p>Dewpoint: {Math.round(period.dewpoint.value)}&deg; {period.dewpoint.unitCode.slice(-1)}</p>
      <p>{period.shortForecast}</p>
      <p>{period.probabilityOfPrecipitation?.value}% Chance of Precipitation</p>
      <p>{period.relativeHumidity?.value}% Humidity</p>
      <p>{period.detailedForecast}</p>
    </div>
  )
}