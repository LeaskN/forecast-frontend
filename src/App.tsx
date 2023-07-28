import './App.css';
import React, { useEffect, useState } from 'react';
import UserLocationInput from './Components/UserLocationInput/UserLocationInput';
import PeriodWeather from './Components/PeriodWeather/PeriodWeather';

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState({});
  const [userLatLon, setUserLatLon] = useState({});
  const [upcomingForcast, setUpcomingForcast] = useState([])

  useEffect(() => {
    const successCallback = (position) => {
      setUserLocation(position);
    };

    const errorCallback = (error) => {
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  useEffect(() => {
    getAddressFromLatLng();
  }, [userLocation]);


  useEffect(() => {
    getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLatLon]);
  
  useEffect(() => {
    getLatLngFromAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress]);
  
  useEffect(() => {
    console.log(upcomingForcast);
  }, [upcomingForcast]);


  const getLatLngFromAddress = async () => {
    if (userAddress.street && userAddress.city && userAddress.state) {
      const street = userAddress.street.split(' ').join('+');
      const city = userAddress.city.split(' ').join('+');
      const state = userAddress.state.split(' ').join('+');

      await fetch(`https://weather-backend-1dcb6a57dec1.herokuapp.com/latlon/?street=${street}&city=${city}&state=${state}&benchmark=Public_AR_Census2020&vintage=Census2020_Census2020&layers=10&format=json`)
        .then(res => res.json())
        .then(res =>{
          setUserLatLon({
            lat: res.addressMatches[0].coordinates.y,
            lng: res.addressMatches[0].coordinates.x
        })});
    }
  }
  
  const getWeather = async () => {
    if (userAddress.street && userAddress.city && userAddress.state) {
      await fetch(`https://weather-backend-1dcb6a57dec1.herokuapp.com/weather/?lat=${userLatLon.lat}&lng=${userLatLon.lng}`)
        .then(res => res.json())
        .then(res => setUpcomingForcast(res.properties.periods));
    }
  }
  
  const getAddressFromLatLng = () => {

  }

  return (
    <div className="App">
      {userLocation === null ?
        <UserLocationInput
          street={userLocation?.street}
          city={userLocation?.city}
          state={userLocation?.state}
          zipcode={userLocation?.zipcode}
          country={userLocation?.country}
          onClick={(newAddress) => setUserAddress(newAddress)}
        /> :
        <CheckUserAddress />}
      {userLatLon?.lng ? `lat: ${userLatLon.lat}lng: ${userLatLon.lng}` : ''}
      <div className='periodWeatherContainer' >
      {upcomingForcast.length > 0 ? 
        upcomingForcast.map((period) => <PeriodWeather period={period}/>)
      : ''}
      </div>
    </div>
  );
}

function CheckUserAddress({ checkAddress, address }) {
  return (
    <>
      <p>If address is inaccurate, click here</p>
      <button onClick={checkAddress}>Wrong Address</button>
    </>
  )
}

export default App;