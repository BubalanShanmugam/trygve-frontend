// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Login.css';

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














import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { sendOtp } from '../firebase/Auth';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { validateLogin, setOtpSent } = useAuth();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const cleanValue = value.replace(/\D/g, '');
    // Format as "12345 67890"
    if (cleanValue.length <= 5) {
      return cleanValue;
    }
    return `${cleanValue.slice(0, 5)} ${cleanValue.slice(5, 10)}`;
  };

  const handleContinue = async () => {
    setError('');
    
    if (!phone) {
      setError('Please enter your phone number.');
      return;
    }

    // Clean phone number for validation
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    // Validate against stored phone number
    if (validateLogin(cleanPhone)) {
      setLoading(true);
      try {
        // Format phone number for Firebase (E.164 format)
        const formattedPhone = `+91${cleanPhone}`;
        
        // Send OTP using Firebase
        await sendOtp(formattedPhone);
        
        // Set OTP sent status
        setOtpSent(true);
        
        // Navigate to OTP verification with phone number
        navigate('/Otpforlogin', { state: { phone: formattedPhone } });
      } catch (error) {
        console.error('Error sending OTP:', error);
        setError('Failed to send OTP. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Phone number not found. Please sign up first or check your number.');
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

        <h2 className="title">Login Verification</h2>
        <p className="description">Enter your phone number to verify your account</p>

        {error && <div className="error-message">{error}</div>}
        
        <div id="recaptcha-container"></div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="12345 67890"
            value={phone}
            required
            onChange={(e) => {
              const formatted = formatPhoneNumber(e.target.value);
              setPhone(formatted);
            }}
          />
        </div>

        <button 
          className="continue-btn" 
          onClick={handleContinue}
          disabled={loading}
        >
          {loading ? 'Sending OTP...' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default Login;
