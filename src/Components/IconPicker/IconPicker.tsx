import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faCloudMoonRain, faCloudMoon, faCloudRain, faCloudShowersHeavy, faHurricane, faSnowflake, faTornado, faSmog, faCloudSunRain, faCloudShowersWater, faWind, faSnowman, faFaceSadCry, faCloud, faCloudSun, faSun, faEyeLowVision, faTemperatureFull, faBraille, faTemperatureLow, faIcicles, faCloudBolt, faBoltLightning, faCloudMeatball } from '@fortawesome/free-solid-svg-icons';

export default function IconPicker(weather: any) {
  if (weather.time === 'day') {
    if (weather.weather.includes('rain_showers_hi')) {
      return <FontAwesomeIcon icon={faCloudSunRain} />
    }
    else if (weather.weather.includes('tropical_storm')) {
      return <FontAwesomeIcon icon={faHurricane} />
    }
    else if (weather.weather.includes('rain_showers')) {
      return <FontAwesomeIcon icon={faCloudRain} />
    }
    else if (weather.weather.includes('rain_sleet')) {
      return <FontAwesomeIcon icon={faCloudShowersHeavy} />
    }
    else if (weather.weather.includes('snow_sleet')) {
      return <FontAwesomeIcon icon={faSnowflake} />
    }
    else if (weather.weather.includes('rain_snow')) {
      return <FontAwesomeIcon icon={faCloudShowersWater} />
    }
    else if (weather.weather.includes('rain_fzra')) {
      return <FontAwesomeIcon icon={faSnowman} />
    }
    else if (weather.weather.includes('snow_fzra')) {
      return <FontAwesomeIcon icon={faSnowman} />
    }
    else if (weather.weather.includes('hurricane')) {
      return <FontAwesomeIcon icon={faHurricane} />
    }
    else if (weather.weather.includes('blizzard')) {
      return <FontAwesomeIcon icon={faCloudMeatball} />
    }
    else if (weather.weather.includes('wind_skc')) {
      return <FontAwesomeIcon icon={faWind} />
    }
    else if (weather.weather.includes('wind_few')) {
      return <FontAwesomeIcon icon={faWind} />
    }
    else if (weather.weather.includes('wind_sct')) {
      return <FontAwesomeIcon icon={faWind} />
    }
    else if (weather.weather.includes('wind_bkn')) {
      return <FontAwesomeIcon icon={faWind} />
    }
    else if (weather.weather.includes('wind_ovc')) {
      return <FontAwesomeIcon icon={faWind} />
    }
    else if (weather.weather.includes('tsra_sct')) {
      return <FontAwesomeIcon icon={faCloudBolt} />
    }
    else if (weather.weather.includes('tsra_hi')) {
      return <FontAwesomeIcon icon={faBoltLightning} />
    }
    else if (weather.weather.includes('tornado')) {
      return <FontAwesomeIcon icon={faTornado} />
    }
    else if (weather.weather.includes('sleet')) {
      return <FontAwesomeIcon icon={faIcicles} />
    }
    else if (weather.weather.includes('smoke')) {
      return <FontAwesomeIcon icon={faSmog} />
    }
    else if (weather.weather.includes('snow')) {
      return <FontAwesomeIcon icon={faSnowflake} />
    }
    else if (weather.weather.includes('fzra')) {
      return <FontAwesomeIcon icon={faSnowman} />
    }
    else if (weather.weather.includes('rain')) {
      return <FontAwesomeIcon icon={faCloudRain} />
    }
    else if (weather.weather.includes('tsra')) {
      return <FontAwesomeIcon icon={faCloudBolt} />
    }
    else if (weather.weather.includes('cold')) {
      return <FontAwesomeIcon icon={faTemperatureLow} />
    }
    else if (weather.weather.includes('dust')) {
      return <FontAwesomeIcon icon={faBraille} />
    }
    else if (weather.weather.includes('haze')) {
      return <FontAwesomeIcon icon={faSmog} />
    }
    else if (weather.weather.includes('hot')) {
      return <FontAwesomeIcon icon={faTemperatureFull} />
    }
    else if (weather.weather.includes('fog')) {
      return <FontAwesomeIcon icon={faEyeLowVision} />
    }
    else if (weather.weather.includes('skc')) {
      return <FontAwesomeIcon icon={faSun} />
    }
    else if (weather.weather.includes('few')) {
      return <FontAwesomeIcon icon={faCloudSun} />
    }
    else if (weather.weather.includes('sct')) {
      return <FontAwesomeIcon icon={faCloudSun} />
    }
    else if (weather.weather.includes('bkn')) {
      return <FontAwesomeIcon icon={faCloud} />
    }
    else if (weather.weather.includes('ovc')) {
      return <FontAwesomeIcon icon={faCloudRain} />
    }
  }
  if (weather.time === 'night') {
    if (weather.weather.includes('rain_showers_hi')) {
      return <FontAwesomeIcon icon={faCloudMoonRain} />
    }
    else if (weather.weather.includes('tropical_storm')) {
      return <FontAwesomeIcon icon={faHurricane} />
    }
    else if (weather.weather.includes('rain_showers')) {
      return <FontAwesomeIcon icon={faCloudMoonRain} />
    }
    else if (weather.weather.includes('rain_sleet')) {
      return <FontAwesomeIcon icon={faCloudMoonRain} />
    }
    else if (weather.weather.includes('snow_sleet')) {
      return <FontAwesomeIcon icon={faSnowflake} />
    }
    else if (weather.weather.includes('rain_snow')) {
      return <FontAwesomeIcon icon={faCloudMoonRain} />
    }
    else if (weather.weather.includes('rain_fzra')) {
      return <FontAwesomeIcon icon={faCloudMoonRain} />
    }
    else if (weather.weather.includes('snow_fzra')) {
      return <FontAwesomeIcon icon={faSnowman} />
    }
    else if (weather.weather.includes('hurricane')) {
      return <FontAwesomeIcon icon={faHurricane} />
    }
    else if (weather.weather.includes('blizzard')) {
      return <FontAwesomeIcon icon={faCloudMeatball} />
    }
    else if (weather.weather.includes('wind_skc')) {
      return <FontAwesomeIcon icon={faMoon} />
    }
    else if (weather.weather.includes('wind_few')) {
      return <FontAwesomeIcon icon={faWind} />
    }
    else if (weather.weather.includes('wind_sct')) {
      return <FontAwesomeIcon icon={faWind} />
    }
    else if (weather.weather.includes('wind_bkn')) {
      return <FontAwesomeIcon icon={faWind} />
    }
    else if (weather.weather.includes('wind_ovc')) {
      return <FontAwesomeIcon icon={faWind} />
    }
    else if (weather.weather.includes('tsra_sct')) {
      return <FontAwesomeIcon icon={faCloudBolt} />
    }
    else if (weather.weather.includes('tsra_hi')) {
      return <FontAwesomeIcon icon={faBoltLightning} />
    }
    else if (weather.weather.includes('tornado')) {
      return <FontAwesomeIcon icon={faTornado} />
    }
    else if (weather.weather.includes('sleet')) {
      return <FontAwesomeIcon icon={faIcicles} />
    }
    else if (weather.weather.includes('smoke')) {
      return <FontAwesomeIcon icon={faSmog} />
    }
    else if (weather.weather.includes('snow')) {
      return <FontAwesomeIcon icon={faSnowflake} />
    }
    else if (weather.weather.includes('fzra')) {
      return <FontAwesomeIcon icon={faSnowman} />
    }
    else if (weather.weather.includes('rain')) {
      return <FontAwesomeIcon icon={faCloudRain} />
    }
    else if (weather.weather.includes('tsra')) {
      return <FontAwesomeIcon icon={faCloudBolt} />
    }
    else if (weather.weather.includes('cold')) {
      return <FontAwesomeIcon icon={faTemperatureLow} />
    }
    else if (weather.weather.includes('dust')) {
      return <FontAwesomeIcon icon={faBraille} />
    }
    else if (weather.weather.includes('haze')) {
      return <FontAwesomeIcon icon={faSmog} />
    }
    else if (weather.weather.includes('hot')) {
      return <FontAwesomeIcon icon={faTemperatureFull} />
    }
    else if (weather.weather.includes('fog')) {
      return <FontAwesomeIcon icon={faEyeLowVision} />
    }
    else if (weather.weather.includes('skc')) {
      return <FontAwesomeIcon icon={faMoon} />
    }
    else if (weather.weather.includes('few')) {
      return <FontAwesomeIcon icon={faCloudMoon} />
    }
    else if (weather.weather.includes('sct')) {
      return <FontAwesomeIcon icon={faCloudMoon} />
    }
    else if (weather.weather.includes('bkn')) {
      return <FontAwesomeIcon icon={faCloud} />
    }
    else if (weather.weather.includes('ovc')) {
      return <FontAwesomeIcon icon={faCloudRain} />
    }
  }
  return <FontAwesomeIcon icon={faFaceSadCry} />
}