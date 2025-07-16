



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Signup.css';
// import './OtpVerification.css';

// const Signup = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="signup-container">
//       <div className="signup-content">
//         <div className="back-arrow" onClick={() => navigate(-1)}>←</div>

//         <h2>Can you input your number?</h2>
//         <p className="description">
//           You will be sent a code on this number to verify if you are the owner of the number.
//         </p>

//         <div className="input-group">
//           <div className="country-code">
//             <img src="/india-flag.png" alt="India Flag" />
//             <span>+91</span>
//           </div>
//           <input type="text" placeholder="12345 67890" />
//         </div>

//         <div className="logo-bg">
//           <img src="/Bglogo.png" alt="Logo" />
//         </div>

//         <button className="send-code" onClick={() => navigate('/OtpVerification')}>Send Code</button>

//         <p className="login-text">
//           Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;










// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Signup.css';
// import './OtpVerification.css';

// const Signup = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="signup-container">
//   <div className="signup-content">
//     <div className="back-arrow" onClick={() => navigate(-1)}>←</div>
//     <h2>Can you input your number?</h2>
//     <p className="description">You will be sent a code on this number...</p>

//     <div className="input-group">
//       <div className="country-code">
//         <img src="/india-flag.png" alt="India Flag" />
//         <span>+91</span>
//       </div>
//       <input type="text" placeholder="12345 67890"/>
//     </div>

//     <button className="send-code" onClick={() => navigate('/otpverification')}>Send Code</button>

//     <p className="login-text">
//       Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
//     </p>

//     {/* 👇 Background Logo Image */}
//     <div className="signup-logo-bg">
//       <img src="/Bglogo.png" alt="Background Logo" />
//     </div>
//   </div>
// </div>

//   );
// };

// export default Signup;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import './OtpVerification.css';

const Signup = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');

  const handleSendCode = () => {
  if (phone.length === 10) {
    navigate('/OtpVerification', { state: { phone } });
  } else {
    alert("Enter a valid 10-digit number");
  }
};

  return (
    <div className="signup-container">
      <div className="signup-content">
<div className="back-arrow" onClick={() => navigate(-1)}>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 6L9 12L15 18" stroke="#045af3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
</div>
        <h2>Can you input your number?</h2>
        <p className="description">
          You will be sent a code on this number to verify if you are the owner of the number.
        </p>

        <div className="input-group">
          <div className="country-code">
            <img src="/india-flag.png" alt="India Flag" />
            <span>+91</span>
          </div>
          <input
            type="text"
            placeholder="12345 67890"
            maxLength={10}
            value={phone}
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={e => {
            // Only allow numbers
            const value = e.target.value.replace(/\D/g, "");
            setPhone(value);
            }}
          />
        </div>

        <div className="logo-bg">
          <img src="/Bglogo.png" alt="Logo" />
        </div>

        <button
        className="send-code"
        onClick={handleSendCode}
        >
        Send Code
        </button>

        <p className="login-text">
          Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
