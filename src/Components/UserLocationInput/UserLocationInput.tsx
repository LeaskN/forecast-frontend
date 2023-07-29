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
  
  useEffect(() => {
    setWeatherDisplayed(weatherDisplayed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showInput = () => {
    setWeatherDisplayed(!isWeatherDisplayed);
  }
  const updateUserAddress = useCallback((target: Target) => {
    setUserAddress((prevUserAddress) => ({
      ...prevUserAddress,
      [target.id]: target.value
    }));
  }, []);

  return (
    <>
    { isWeatherDisplayed ? 
    <button onClick={showInput} className='changeAddress'>Change Address</button> : 
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

      <button onClick={() => {setWeatherDisplayed(!isWeatherDisplayed); onClick(userAddress)}}>Submit</button>
      <br/>

    </div>
    }
    </>
  );
};

export default UserLocationInput;