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



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../firebase/Auth';
import { useAuth } from '../Context/AuthContext';
import './Signup.css';
import './OtpVerification.css';

const Signup = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const { setOtpSent } = useAuth();

  // Format phone number with space (12345 67890)
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    // Limit to 10 digits
    const limited = cleaned.slice(0, 10);
    // Add space after 5th digit
    if (limited.length > 5) {
      return limited.slice(0, 5) + ' ' + limited.slice(5);
    }
    return limited;
  };

  const handleSendCode = async () => {
    // Remove space for validation
    const cleanPhone = phone.replace(/\s/g, '');
    if (cleanPhone.length !== 10) {
      alert("Enter a valid 10-digit number");
      return;
    }

    setLoading(true);
    try {
      // Format phone number for Firebase (E.164 format)
      const formattedPhone = `+91${cleanPhone}`;
      
      // Send OTP using Firebase
      await sendOtp(formattedPhone);
      
      // Update context state
      setOtpSent(true);
      
      // Navigate to OTP verification with phone number
      navigate('/OtpVerification', { state: { phone: formattedPhone } });
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
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
        <h2 className='hh'>Can you input your number?</h2>
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
            maxLength={11} // 10 digits + 1 space
            value={phone}
            inputMode="numeric"
            pattern="[0-9 ]*"
            onChange={e => {
              // Format phone number with space
              const formatted = formatPhoneNumber(e.target.value);
              setPhone(formatted);
            }}
          />
        </div>

        <div className="logo-bg">
          <img src="/Bglogo.png" alt="Logo" />
        </div>

        <button
          className={`send-code ${loading || phone.replace(/\s/g, '').length !== 10 ? 'disabled' : 'enabled'}`}
          onClick={handleSendCode}
          disabled={loading || phone.replace(/\s/g, '').length !== 10}
        >
          {loading ? 'Sending...' : 'Send Code'}
        </button>

        <p className="login-text">
          Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
        </p>

        {/* reCAPTCHA container for Firebase phone auth */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Signup;
