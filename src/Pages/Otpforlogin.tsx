import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Otpforlogin.css';

const Otpforlogin = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);

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

  const handleVerify = () => {
    if (otp.join('').length === 4) {
      navigate('/WelcomeBack');
    } else {
      alert('Enter the full 4-digit OTP');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
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

  return (
    <div className="otp-wrapper">
      <div className="otp-box">
        <div className="otp-back" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 18L9 12L15 6" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

        </div>

        <h2 className="otp-heading">Verification Code</h2>
        <p className="otp-subtext">
          We have sent the verification code to your email address.
        </p>

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


        <button className="otp-continue" onClick={handleVerify}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Otpforlogin;
