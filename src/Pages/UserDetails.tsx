import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDetails.css';

const UserDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="user-container">
      <div className="user-content">
        <div className="back-arrow" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 6L9 12L15 18" stroke="#045af3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2>Almost Done!</h2>
        <p className="description">Please enter your details in the following section.</p>

        <form className="user-form">
          <input type="text" placeholder="Enter Full Name" />
          <input type="email" placeholder="Enter Email Address" />
          <div className="location-input">
            <input type="text" placeholder="Arasur, Coimbatore" />
            <span className="location-icon">📍</span>
          </div>
          <input type="text" placeholder="Enter Secondary Phone Number" />
        </form>

        <div className="log">
          <img src="/Bglogo.png" alt="Logo" />
        </div>

        <button className="create-btn" onClick={() => navigate('/AccountCreated')}>
          Create Account
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
