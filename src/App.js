import './App.css';
import React, { useEffect, useState } from 'react';
import UserLocationInput from './Components/UserLocationInput';

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState({});

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
    getLatLngFromAddress();
  }, [userAddress]);


  const getLatLngFromAddress = async () => {
    if(userAddress.street && userAddress.city && userAddress.state){
      const street = userAddress.street.split(' ').join('+');
      const city = userAddress.city.split(' ').join('+');
      const state = userAddress.state.split(' ').join('+');
      // console.log(street, city, state)

      // await fetch(`https://geocoding.geo.census.gov/geocoder/geographies/address?street=${street}&city=${city}&state=${state}&benchmark=Public_AR_Census2020&vintage=Census2020_Census2020&layers=10&format=json`, {
      await fetch(`http://localhost:8080/?street=${street}&city=${city}&state=${state}&benchmark=Public_AR_Census2020&vintage=Census2020_Census2020&layers=10&format=json`)
        .then(res => res.json())
        .then(res => console.log(res.addressMatches[0].coordinates));
    }
    
  }

  const checkAddress = () => {
    console.log('checkAddress')
  }

  const getAddressFromLatLng = () => {

  }

  return (
    <div className="App">
      {userLocation === null ? 
        <UserLocationInput 
        checkAddress={checkAddress} 
          street={userLocation?.street}
          city={userLocation?.city}
          state={userLocation?.state}
          zipcode={userLocation?.zipcode}
          country={userLocation?.country}
          onClick={(newAddress) => setUserAddress(newAddress)} 
        /> :
        <CheckUserAddress />}
    </div>
  );
}

function CheckUserAddress({checkAddress, address}){
  return(
    <>
      <p>If address is inaccurate, click here</p>
      <button onClick={checkAddress}>Wrong Address</button>
    </>
  )
}

export default App;
