import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDetails.css';

const UserDetails = () => {
  const navigate = useNavigate();

  // State for each field
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [secondaryPhone, setSecondaryPhone] = useState('');

  // Check if all fields are filled
  const allFilled = fullName && email && location && secondaryPhone;

  return (

    <div className="user-container">
      <div className="user-content">
        <div className="back-arrow" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 6L9 12L15 18" stroke="#045af3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className='hh'>Almost Done!</h2>
        <p className="description">Please enter your details in the following section.</p>
        
        <form className="user-form">
          <input
            type="text"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={e => {
              // Only allow letters and spaces
              const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
              setFullName(value);
            }}
          />
          <input
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <div className="location-input">
            <input
              type="text"
              placeholder="Arasur, Coimbatore"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
            <span className="location-icon">
              <svg width="20" height="25" viewBox="0 0 20 20" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" fill="#045af3"/>
              </svg>  
            </span>          
          </div>
          <input
            type="text"
            placeholder="Enter Secondary Phone Number"
            value={secondaryPhone}
            maxLength={10}
            onChange={e => {
              // Only allow numbers, max 10 digits
              const value = e.target.value.replace(/\D/g, "").slice(0, 10);
              setSecondaryPhone(value);
            }}
            required
          />
        </form>

        <button
          className="create-btn"
          onClick={e => {
            e.preventDefault();
            if (!fullName || !email || !location || !secondaryPhone) {
              alert("Please fill all the fields.");
              return;
            }
            if (secondaryPhone.length !== 10) {
              alert("Please enter a valid 10-digit mobile number.");
              return;
            }
            // The email input type="email" will show a browser validation for invalid emails
            navigate('/AccountCreated');
          }}
        >
          Create Account
        </button>
      </div>
    </div>

  );
};

export default UserDetails;
