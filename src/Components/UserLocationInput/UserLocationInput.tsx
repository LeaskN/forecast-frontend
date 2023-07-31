import React, { useCallback, useState, useEffect } from 'react';
import './UserLocationInput.css';

interface Props {
  street: string;
  city: string;
  state: string;
  zipcode: string;
  onClick: Function;
  weatherDisplayed: Boolean;
}

interface Target {
  id: string,
  value: string
}

const UserLocationInput = ({ onClick, weatherDisplayed }: Props) => {
  const [userAddress, setUserAddress] = useState({street:'', city:'', state:'', zipcode:''})
  const [isWeatherDisplayed, setWeatherDisplayed] = useState(weatherDisplayed);
  
  // On mount, decide if we show the input based on if we have weather showing already
  useEffect(() => {
    setWeatherDisplayed(weatherDisplayed);
  }, [weatherDisplayed]);

  const updateUserAddress = useCallback((target: Target) => {
    setUserAddress((prevUserAddress) => ({
      ...prevUserAddress,
      [target.id]: target.value
    }));
  }, []);

  return (
    <>
    {/* If we have weather displayed, then dont show input, just show button to open the change address input*/}
    { !isWeatherDisplayed ?  
    <button 
      onClick={() => setWeatherDisplayed(!isWeatherDisplayed)} 
      className='changeAddress'>Change Address</button> : 
    <div className="addressInput">
      <h4>To get upcoming forecast enter an address below:</h4>
      <div className="row">
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={userAddress.street}
          onChange={(e) => updateUserAddress(e.target)}
        />
      </div>

      <div className="row">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={userAddress.city}
          onChange={(e) => updateUserAddress(e.target)}
        />
      </div>

      <div className="row">
        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          value={userAddress.state}
          onChange={(e) => updateUserAddress(e.target)}
        />
      </div>

      <div className="row">
        <label htmlFor="zipcode">Zipcode</label>
        <input
          type="text"
          id="zipcode"
          value={userAddress.zipcode}
          onChange={(e) => updateUserAddress(e.target)}
        />
      </div>
      {/* When clicking submit, hide the input again */}
      <button onClick={() => {setWeatherDisplayed(false); onClick(userAddress)}}>Submit</button>
      <br/>

    </div>
    }
    </>
  );
};

export default UserLocationInput;