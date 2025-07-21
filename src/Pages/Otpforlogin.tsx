import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { verifyOtp } from '../firebase/Auth';
import './Otpforlogin.css';

const Otpforlogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setPhoneNumber, setIsLoggedIn } = useAuth();
  
  // Get phone from navigation state, fallback to empty string if not present
  const phone = location.state?.phone || "";
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-box-${index + 1}`);
        if (nextInput) (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleVerify = async () => {
    if (otp.join('').length !== 6) {
      alert('Enter the full 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      // Verify OTP using Firebase
      await verifyOtp(otp.join(''));
      
      // Store phone number and set logged in status
      setPhoneNumber(phone);
      setIsLoggedIn(true);
      
      // Navigate to welcome back page
      navigate('/WelcomeBack');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace") {
      if (otp[idx]) {
        const newOtp = [...otp];
        newOtp[idx] = "";
        setOtp(newOtp);
      } else if (idx > 0) {
        const prevInput = document.getElementById(`otp-box-${idx - 1}`);
        if (prevInput) (prevInput as HTMLInputElement).focus();
        const newOtp = [...otp];
        newOtp[idx - 1] = "";
        setOtp(newOtp);
      }
      e.preventDefault();
    }
  };

  // Mask the phone number for display
  const maskPhone = (num: string) => {
    // Remove +91 prefix if present
    const cleanNum = num.replace(/^\+91/, '');
    return cleanNum.replace(/^(\d{2})\d{6}(\d{2})$/, "$1******$2");
  };

  return (
    <div className="otp-wrapper">
      <div className="otp-box">
        <div className="otp-back" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

        </div>

        <h2 className="otp-heading">OTP Verification</h2>
        <p className="otp-subtext">
          Enter the verification code we just sent to your number +91 {phone ? maskPhone(phone) : '****'}.
        </p>
        <div id="recaptcha-container"></div>

        <div className="otp-input-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-box-${index}`}
              type="text"
              autoComplete="off"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="otp-digit"
            />
          ))}
        </div>


        <button 
          className="otp-continue" 
          onClick={handleVerify}
          disabled={loading || otp.join('').length !== 6}
        >
          {loading ? 'Verifying...' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default Otpforlogin;












