import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountCrated.css';

const AccountCreated = () => {
  const navigate = useNavigate();

  return (
    <div className="account-container">
      <div className="account-content">
        <div className="back-arrow" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 6L9 12L15 18" stroke="#045af3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="logo-success">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="white">
            <circle cx="12" cy="12" r="12" fill="#0146ff" />
            <path d="M9.5 13.5l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>

        <h2>You're Now with Your Trusted Guardian of Life!</h2>
        <p className="des">
          Welcome to the TRYGVE Family!<br />
          Your journey to better health starts here.
        </p>

        <button className="login-btn" onClick={() => navigate('/DashBoard')}>
          Go to Dashboard
        </button>
        
        <button 
          className="login-btn" 
          onClick={() => navigate('/welcome')}
          style={{ marginTop: '10px', backgroundColor: '#6c757d' }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default AccountCreated;
