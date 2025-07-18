// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// const Login = () => {
//   const navigate = useNavigate();

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert("Login successful!");
//   };

//   return (
//     <div className="auth-container">
//       <form className="auth-form" onSubmit={handleLogin}>
//         <h2>Login</h2>
//         <input type="email" placeholder="Email Address" required />
//         <input type="password" placeholder="Password" required />
//         <button type="submit">Login</button>
//         <p onClick={() => navigate('/signup')} className="switch-link">Don't have an account? Sign up</p>
//       </form>
//     </div>
//   );
// };

// export default Login;














import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleContinue = () => {
    if (!email || !phone) {
      alert('Please fill in both fields.');
      return;
    }
    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (phone.length !== 10) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }else{
    navigate('/Otpforlogin');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        {/* <div className="back-arrow" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 6L9 12L15 18" stroke="#045af3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div> */}

        <div className="top-image">
          <img src="/Image.png" alt="Illustration" />
        </div>

        <h2 className="title">OTP Verification</h2>
        <p className="description">Enter email and phone number to send one time Password</p>

        <div className="form-group">
  <label htmlFor="email">Email Id</label>
  <div className="input-wrapper">
    <input
      id="email"
      type="email"
      placeholder="dscode@gmail.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <span className="edit-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20"
        viewBox="0 0 24 24"
        width="20"
        fill="#888"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M3 17.25V21h3.75l11.02-11.02-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 
        0-1.41l-2.34-2.34a.9959.9959 0 
        00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
      </svg>
    </span>
  </div>
</div>


        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="+91 0123456789"
            value={phone}
            required
            maxLength={10}
            pattern="[0-9]{10}"
            onChange={(e) => {
              // Only allow numbers, max 10 digits
              const value = e.target.value.replace(/\D/g, "").slice(0, 10);
              setPhone(value);
            }}
          />
        </div>

        <button className="continue-btn" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Login;
