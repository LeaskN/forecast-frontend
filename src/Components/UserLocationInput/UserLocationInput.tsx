import React, { useCallback, useState } from 'react';
import './UserLocationInput.css';

interface Props {
  street: string;
  city: string;
  state: string;
  zipcode: string;
  onClick: Function;
}

interface Target {
  id: string,
  value: string
}

const UserLocationInput = ({
    onClick,
  }: Props) => {

  const [userAddress, setUserAddress] = useState({street:'', city:'', state:'', zipcode:''})

  const updateUserAddress = useCallback((target: Target) => {
    setUserAddress((prevUserAddress) => ({
      ...prevUserAddress,
      [target.id]: target.value
    }));
  }, []);

  return (
    <div className="address_input">
      <h2>United States Address:</h2>
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
      <button onClick={() => onClick(userAddress)}>Submit</button>
      <br/>
    </div>
  );
};

export default UserLocationInput;