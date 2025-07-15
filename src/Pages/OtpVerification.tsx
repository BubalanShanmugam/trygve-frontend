// import React, { useState } from 'react';
// import './OtpVerification.css';
// import { useNavigate } from 'react-router-dom';

// const OtpVerification = () => {
//   const [otp, setOtp] = useState(Array(6).fill(""));
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     const value = e.target.value.replace(/\D/, ''); // Allow only digits
//     if (!value) return;
    
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     const next = document.getElementById(`otp-${index + 1}`);
//     if (next) (next as HTMLElement).focus();
//   };

//   const handleVerify = () => {
//     const fullOtp = otp.join('');
//     console.log("Verifying OTP:", fullOtp);
//     // TODO: Send to backend for verification
//   };

//   return (
//     <div className="otp-container">
//       <div className="back-arrow" onClick={() => navigate(-1)}>←</div>
//       <h2>OTP Verification</h2>
//       <p className="description">Enter the verification code we just sent to your number +91 7******55.</p>

//       <div className="otp-inputs">
//         {otp.map((digit, i) => (
//           <input
//             key={i}
//             id={`otp-${i}`}
//             type="text"
//             maxLength={1}
//             value={digit}
//             onChange={(e) => handleChange(e, i)}
//           />
//         ))}
//       </div>

//       <p className="resend-text">
//         Didn’t receive code? <span className="resend-link">Resend</span>
//       </p>

//       <div className="logo-bg">
//         <img src="/Bglogo.png" alt="Logo" />
//       </div>

//       <button className="verify-btn" onClick={handleVerify}>Verify</button>
//     </div>
//   );
// };

// export default OtpVerification;











import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OtpVerification.css';

const OtpVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();

  const handleChange = (value: string, idx: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[idx] = value;
      setOtp(newOtp);
      if (value && idx < otp.length - 1) {
        inputsRef.current[idx + 1]?.focus();
      }
    }
  };

  const handleVerify = () => {
    const fullOtp = otp.join('');
    console.log("Verifying OTP:", fullOtp);
    // TODO: Send to backend for verification
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      const newOtp = [...otp];
      newOtp[idx - 1] = "";
      setOtp(newOtp);
      inputsRef.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-content">
        <div className="back-arrow" onClick={() => navigate(-1)}>←</div>

        <h2>OTP Verification</h2>
        <p className="description">
          Enter the verification code we just sent to your number +91 7******55.
        </p>

        <div className="otp-inputs">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              maxLength={1}
              value={digit}
              ref={el => inputsRef.current[idx] = el}
              onChange={e => handleChange(e.target.value, idx)}
              onKeyDown={e => handleKeyDown(e, idx)}
            />
          ))}
        </div>

        <p className="resend-text">Didn’t receive code? <span>Resend</span></p>

        <div className="logo">
          
          <img src="/Bglogo.png" alt="Logo" />
        </div>

        <button className="verify-btn" onClick={handleVerify}>Verify</button>
      </div>
    </div>
  );
};

export default OtpVerification;
