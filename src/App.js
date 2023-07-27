import './App.css';
import React, { useEffect, useState } from 'react';
import UserLocationInput from './Components/UserLocationInput';

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
  }, [userLatLon]);
  
  useEffect(() => {
    getLatLngFromAddress();
  }, [userAddress]);
  
  useEffect(() => {
    console.log(upcomingForcast);
  }, [upcomingForcast]);


  const getLatLngFromAddress = async () => {
    if (userAddress.street && userAddress.city && userAddress.state) {
      const street = userAddress.street.split(' ').join('+');
      const city = userAddress.city.split(' ').join('+');
      const state = userAddress.state.split(' ').join('+');

      await fetch(`http://localhost:8080/latlon/?street=${street}&city=${city}&state=${state}&benchmark=Public_AR_Census2020&vintage=Census2020_Census2020&layers=10&format=json`)
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
      await fetch(`http://localhost:8080/weather/?lat=${userLatLon.lat}&lng=${userLatLon.lng}`)
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
      <div style={{
       display: 'flex',
       justifyContent: 'space-evenly',
       alignItems: 'center',
       flexWrap: 'wrap',
      }}>
      {upcomingForcast.length > 0 ? 
        upcomingForcast.map((period) => 
          <div style={{
            border: '3px solid blue',
            width: '400px',
            borderRadius:'40px',
            backgroundColor: `${period.isDaytime ? 'white' : 'black'}`,
            color: `${period.isDaytime ? 'black' : 'white'}`,
            margin: '10px',
            backgroundImage: `url('${period.icon}')`,
            backgroundSize: 'cover',
            textShadow: `1px 1px 1px ${period.isDaytime ? 'white' : 'black'}`
           }}>
            <img style={{borderRadius: '5px', border:'3px solid blue'}} src={period.icon} alt='periodIcon'/>
            <p>{period.name}</p>
            <p>{period.temperature}{period.temperatureUnit}&deg;</p>
            <p>Wind: {period.windSpeed} {period.windDirection}</p>
            <p>Dewpoint: {Math.round(period.dewpoint.value)}&deg; {period.dewpoint.unitCode.slice(-1)}</p>
            <p>{period.shortForecast}</p>
            {period.isDaytime ? <p>Day Time!</p> : <p>Night Time!</p>}
            <p>{period.probabilityOfPrecipitation?.value}% Chance of Precipitation</p>
            <p>{period.relativeHumidity?.value}% Humidity</p>
            <p>{period.detailedForecast}</p>
          </div>
        )
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

