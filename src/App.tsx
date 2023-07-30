import './App.css';
import React, { useEffect, useState } from 'react';
import UserLocationInput from './Components/UserLocationInput/UserLocationInput';
import Spinner from './Components/Spinner/Spinner';
import Clouds from './Components/Clouds/Clouds';
import PeriodWeatherContainer from './Components/PeriodWeatherContainer/PeriodWeatherContainer';
import IconPicker from './Components/IconPicker/IconPicker';

interface UserAddress {
  street: string;
  city: string;
  state: string;
  zipcode: string;
}

interface UserLatLng {
  lat: string;
  lng: string;
}

function App() {
  const [userAddress, setUserAddress] = useState<UserAddress>({ street: '', city: '', state: '', zipcode: '' });
  const [userLatLng, setUserLatLng] = useState<UserLatLng>({ lat: '', lng: '' });
  const [spinner, setSpinner] = useState<boolean>(false)
  const [upcomingForecast, setUpcomingForecast] = useState([]);
  const [dayForecast, setDayForecast] = useState<any>([]);
  const [userCityFromBrowser, setUserCityFromBrowser] = useState({ locality: '' });

  let night = false;

  function isNight(){
    const hours = new Date().getHours()
    const isDayTime = hours > 6 && hours < 20;
    if(isDayTime === true){
      night = true;
    }
  }

  useEffect(() => {
    const successCallback = async (geoLocationPosition: any) => {
      setUserLatLng({
        lat: geoLocationPosition.coords.latitude,
        lng: geoLocationPosition.coords.longitude
      })
      getUserCity();
    };

    const errorCallback = (error: any) => {
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    isNight();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getWeeksWeather();
    getDayWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLatLng]);

  useEffect(() => {
    getLatLngFromAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress]);

  const getUserCity = async () => {
    await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${userLatLng.lat}&longitude=${userLatLng.lat}&localityLanguage=en`)
      .then(res => res.json())
      .then(res => setUserCityFromBrowser(res));
  }
  const getLatLngFromAddress = async () => {
    if (userAddress?.street && userAddress?.city && userAddress?.state) {
      const street = userAddress?.street.split(' ').join('+');
      const city = userAddress?.city.split(' ').join('+');
      const state = userAddress?.state.split(' ').join('+');

      setSpinner(true);
      await fetch(`https://weather-backend-1dcb6a57dec1.herokuapp.com/latlon/?street=${street}&city=${city}&state=${state}&benchmark=Public_AR_Census2020&vintage=Census2020_Census2020&layers=10&format=json`)
        .then(res => res.json())
        .then(res => {
          setUserLatLng({
            lat: res.addressMatches[0].coordinates.y,
            lng: res.addressMatches[0].coordinates.x
          })
        });
    }
  }

  const getDayWeather = async () => {
    if ((userAddress?.street && userAddress?.city && userAddress?.state) || (userLatLng.lat && userLatLng.lng)) {
      setSpinner(true);
      await fetch(`https://weather-backend-1dcb6a57dec1.herokuapp.com/dayWeather/?lat=${userLatLng.lat}&lng=${userLatLng.lng}`)
        .then(res => res.json())
        .then(res => setDayForecast(res?.properties?.periods))
        .then(() => setSpinner(false))
    }
  }

  const getWeeksWeather = async () => {
    if ((userAddress?.street && userAddress?.city && userAddress?.state) || (userLatLng.lat && userLatLng.lng)) {
      setSpinner(true);
      await fetch(`https://weather-backend-1dcb6a57dec1.herokuapp.com/weather/?lat=${userLatLng.lat}&lng=${userLatLng.lng}`)
        .then(res => res.json())
        .then(res => setUpcomingForecast(res?.properties?.periods))
        .then(() => setSpinner(false))
    }
  }

  return (
    <div className="App">
      {spinner ? <Spinner /> : ''}
      <div className={!night ? `nightWrap` : ''}></div>
      <Clouds />
      <UserLocationInput street='' city='' state='' zipcode='' weatherDisplayed={upcomingForecast.length > 0 ? false : true} onClick={(userAddress: UserAddress) => { setUserAddress(userAddress) }} />
      {dayForecast !== undefined ?
      <div className='todaysRowContainer'>
        <span className='todaysRowHeader'>Current Weather: {dayForecast?.[0]?.shortForecast}</span>
        <div className='todaysRow'>
          <br/>
          {dayForecast.slice(1,26).map((hour:any) => {
            const weatherInfo: string | undefined = hour?.icon?.indexOf('day') > -1 ? hour?.icon?.split('day')[1] : hour?.icon?.split('night')[1];
            const weather: string | undefined = weatherInfo?.split('/')?.[1]?.split(',')[0];
            const d = new Date(hour?.startTime)
            let hours = d.getHours();
            const suffix = (hours >= 12)? 'pm' : 'am';
            hours = (hours > 12)? hours - 12 : hours;
            hours = (`${hours}` === '0')? 12 : hours;
            return (
            <div className='todaysCol'>
              <div className='todaysLine1'>{hours}{suffix}</div>
              <div className='todaysLine2'><IconPicker weather={weather} time={'day'}/></div>
              <div className='todaysLine3'>{hour?.temperature}&deg;</div>
            </div>
            )
          })}
        </div>
      </div>
      :''}
      {userCityFromBrowser?.locality && userAddress?.city === '' ?
        <div className='periodWeatherTopper'>
          7-Day Forecast in {userCityFromBrowser.locality}
        </div>
        : ''}
      {userAddress?.city?.length > 0 ?
        <div className='periodWeatherTopper'>
          7-Day Forecast in {userAddress.city}
        </div>
        : ''}
      <PeriodWeatherContainer spinner={spinner} upcomingForecast={upcomingForecast} />
    </div>
  );
}

export default App;