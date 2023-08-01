import './App.css';
import React, { useEffect, useState } from 'react';
import UserLocationInput from './Components/UserLocationInput/UserLocationInput';
import Loader from './Components/Loader/Loader';
import Clouds from './Components/Clouds/Clouds';
import PeriodWeatherContainer from './Components/PeriodWeatherContainer/PeriodWeatherContainer';
import TodaysForecast from './Components/TodaysForecast/TodaysForecast';

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
  const [loader, setSpinner] = useState<boolean>(false)
  const [upcomingForecast, setUpcomingForecast] = useState([]);
  const [dayForecast, setDayForecast] = useState<any>([]);
  const [userCityFromBrowser, setUserCityFromBrowser] = useState({ locality: '' });

  let night = false;

  function isNight() {
    const hours = new Date().getHours()
    const isDayTime = hours > 6 && hours < 20;
    if (isDayTime === true) {
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
      {/* Background/hidden elements start*/}
      {loader ? <Loader /> : ''}
      <div className={!night ? `nightWrap` : ''}></div>
      <Clouds />
      {/* Background/hidden elements end*/}
      {/* UserLocation input only shows if we can't collect data about the users position */}
      {loader ? '' :
        <UserLocationInput
          street=''
          city=''
          state=''
          zipcode=''
          weatherDisplayed={upcomingForecast.length > 0 ? false : true}
          onClick={(userAddress: UserAddress) => { setUserAddress(userAddress) }}
        />
      }
      {dayForecast !== undefined && dayForecast.length > 0?
        <TodaysForecast dayForecast={dayForecast} />
        : ''}
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
      <PeriodWeatherContainer loader={loader} upcomingForecast={upcomingForecast} />
    </div>
  );
}

export default App;