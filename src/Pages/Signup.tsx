// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Signup.css';

// const Signup = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="signup-container">
//       <div className="back-arrow" onClick={() => navigate(-1)}>←</div>

//       <h2>Can you input your number?</h2>
//       <p className="description">
//         You will be sent a code on this number to verify if you are the owner of the number.
//       </p>

//       <div className="input-group">
//         <div className="country-code">
//           <img src="/india-flag.png" alt="India Flag" />
//           <span>+91</span>
//         </div>
//         <input type="text" placeholder="12345 67890"/>
//       </div>

//       <div className="logo-bg">
//         <img src="/Bglogo.png" />
//       </div>

//       <button className="send-code" onClick={() => navigate('/OtpVerification')}>
//         Send Code
//       </button>

//       <p className="login-text">
//         Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
//       </p>
//     </div>
//   );
// };

// export default Signup;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import './OtpVerification.css';

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="back-arrow" onClick={() => navigate(-1)}>←</div>

        <h2>Can you input your number?</h2>
        <p className="description">
          You will be sent a code on this number to verify if you are the owner of the number.
        </p>

        <div className="input-group">
          <div className="country-code">
            <img src="/india-flag.png" alt="India Flag" />
            <span>+91</span>
          </div>
          <input type="text" placeholder="12345 67890" />
        </div>

        <div className="logo-bg">
          <img src="/Bglogo.png" alt="Logo" />
        </div>

        <button className="send-code" onClick={() => navigate('/OtpVerification')}>Send Code</button>

        <p className="login-text">
          Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
