import './App.css';
import React, { useEffect, useState } from 'react';
import UserLocationInput from './Components/UserLocationInput/UserLocationInput';
import PeriodWeather from './Components/PeriodWeather/PeriodWeather';
import Spinner from './Components/Spinner/Spinner';

interface UserAddress {
  street: string;
  city: string;
  state: string;
  zipcode: string;
}

interface UserLatLng{
  lat: string;
  lng: string;
}

function App() {
  const [userAddress, setUserAddress] = useState<UserAddress>({ street: '', city: '', state: '',   zipcode: ''});
  const [userLatLng, setUserLatLng] = useState<UserLatLng>({lat: '', lng: ''});
  const [spinner, setSpinner] = useState<boolean>(false)
  const [upcomingForcast, setUpcomingForcast] = useState([]);
  const [userCityFromBrowser, setUserCityFromBrowser] = useState({locality:''})

  useEffect(() => {
    const successCallback = async(geoLocationPosition: any) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getWeather();
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
        .then(res =>{
          setUserLatLng({
            lat: res.addressMatches[0].coordinates.y,
            lng: res.addressMatches[0].coordinates.x
        })});
    }
  }
  
  const getWeather = async () => {
    if ((userAddress?.street && userAddress?.city && userAddress?.state) || (userLatLng.lat && userLatLng.lng)) {
      setSpinner(true);
      await fetch(`https://weather-backend-1dcb6a57dec1.herokuapp.com/weather/?lat=${userLatLng.lat}&lng=${userLatLng.lng}`)
        .then(res => res.json())
        .then(res => setUpcomingForcast(res?.properties?.periods))
        .then(() => setSpinner(false))
    }
  }

  return (
    <div className="App">
      <UserLocationInput street='' city='' state='' zipcode='' onClick={(userAddress:UserAddress) => {setUserAddress(userAddress)}}/> 
      {userCityFromBrowser?.locality && userAddress?.city === '' ? userCityFromBrowser.locality : ''}
      {userAddress?.city?.length > 0 ? userAddress.city : ''}
      <div className='periodWeatherContainer'>
        {spinner ? <Spinner /> : ''}
        {upcomingForcast.length > 0 && !spinner ? upcomingForcast.map((period) => <PeriodWeather period={period}/>): ''}
      </div>
    </div>
  );
}

export default App;