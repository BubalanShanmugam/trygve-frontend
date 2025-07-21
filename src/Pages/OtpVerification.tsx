import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './OtpVerification.css';

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Get phone from navigation state, fallback to empty string if not present
  const phone = location.state?.phone || "";

  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleVerify = () => {
    if (otp.join('').length === 6) {
      navigate('/UserDetails', { state: { phone, otp: otp.join('') } });
      // Navigate to the next page
    } else {
      alert('Enter the full 6-digit OTP');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace") {
      if (otp[idx]) {
        // If current box has a value, clear it
        const newOtp = [...otp];
        newOtp[idx] = "";
        setOtp(newOtp);
      } else if (idx > 0) {
        // If current box is empty, move focus to previous
        const prevInput = document.getElementById(`otp-${idx - 1}`);
        if (prevInput) (prevInput as HTMLInputElement).focus();

        // Also clear the previous box
        const newOtp = [...otp];
        newOtp[idx - 1] = "";
        setOtp(newOtp);
      }
      // Prevent default to avoid browser navigation
      e.preventDefault();
    }
  };

  // Mask the phone number for display
  const maskPhone = (num: string) =>
    num.replace(/^(\d{2})\d{6}(\d{2})$/, "$1******$2");

  return (
    
    <div className="otp-container">
      <div className="otp-content">
        <div className="back-arrow" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 6L9 12L15 18" stroke="#045af3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className='hh'>OTP Verification</h2>
        <p className="description">
          Enter the verification code we just sent to your number +91 {maskPhone(phone)}.
        </p>
        <div id="recaptcha-container"></div>
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              autoComplete="off"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <p className="resend-text">
          Didn't receive code? <span>Resend</span>
        </p>

        <div className="logo-bg">
          <img src="/Bglogo.png" alt="Logo" />
        </div>

        <button className="verify-btn" onClick={handleVerify}>
          Verify
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;



