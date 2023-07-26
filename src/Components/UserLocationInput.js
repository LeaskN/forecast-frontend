import { useCallback, useState } from 'react';
import './UserLocationInput.css';

export default function UserLocationInput({
  street,
  city,
  state,
  zipcode,
  country,
  onClick,
}) {
  const [userAddress, setUserAddress] = useState({street, city, state, zipcode, country})

  const updateUserAddress = useCallback((target) => {
    setUserAddress((prevUserAddress) => ({
      ...prevUserAddress,
      [target.id]: target.value
    }));
  }, []);

  return (
    <div className="address_input">
      <div className="row">
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={(e) => updateUserAddress(e.target)}
        />
      </div>

      <div className="row">

        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => updateUserAddress(e.target)}
        />
      </div>
      <div className="row">

        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          value={state}
          onChange={(e) => updateUserAddress(e.target)}
        />
      </div>
      <div className="row">

        <label htmlFor="zipcode">Zipcode</label>
        <input
          type="text"
          id="zipcode"
          value={zipcode}
          onChange={(e) => updateUserAddress(e.target)}
        />
      </div>
      <div className="row">

        <label htmlFor="country">Country</label>
        <select id="country" value={country} onChange={(e) => updateUserAddress(e.target)}>
          <option value='Select'>Select</option>
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Australia">Australia</option>
          <option value="New Zealand">New Zealand</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button onClick={() => onClick(userAddress)}>Submit</button>
    </div>
  );
};