import React, { useState } from 'react';

const Passcode = ({ onSubmit }) => {
  const [passcode, setPasscode] = useState('');

  const handleChange = (e) => {
    setPasscode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(passcode);
  };

  return (
    <div className="passcode-container">
      <h2>Enter Passcode</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter passcode"
          value={passcode}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Passcode;
