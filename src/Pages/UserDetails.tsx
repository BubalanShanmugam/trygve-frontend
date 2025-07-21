import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './UserDetails.css';

const UserDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get phone and OTP from previous page
  const previousData = location.state || {};
  const primaryPhone = previousData.phone || "";
  const otp = previousData.otp || "";

  // State for each field
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [secondaryPhone, setSecondaryPhone] = useState('');

  // Check if all fields are filled
  const allFilled = fullName && email && userLocation && secondaryPhone;

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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

  return (

    <div className="user-container">
      <div className="user-content">
        <div className="back-arrow" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 6L9 12L15 18" stroke="#045af3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className='hh'>Almost Done!</h2>
        <p className="description">Please enter your details in the following section.</p>
        
        <form className="user-form">
          <input
            type="text"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={e => {
              // Only allow letters and spaces
              const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
              setFullName(value);
            }}
          />
          <input
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => {
              // Validate email on blur (when user leaves the field)
              if (email && !validateEmail(email)) {
                alert("Please enter a valid email address (e.g., user@example.com)");
              }
            }}
            required
          />
          <div className="location-input">
            <input
              type="text"
              placeholder="Arasur, Coimbatore"
              value={userLocation}
              onChange={e => setUserLocation(e.target.value)}
            />
            <span className="location-icon">
              <svg width="20" height="25" viewBox="0 0 20 20" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" fill="#045af3"/>
              </svg>  
            </span>          
          </div>
          <input
            type="text"
            placeholder="12345 67890"
            value={secondaryPhone}
            maxLength={11} // 10 digits + 1 space
            onChange={e => {
              // Format phone number with space
              const formatted = formatPhoneNumber(e.target.value);
              setSecondaryPhone(formatted);
            }}
            required
          />
        </form>

        <button
          className="create-btn"
          onClick={e => {
            e.preventDefault();
            
            // Check if all fields are filled
            if (!fullName || !email || !userLocation || !secondaryPhone) {
              alert("Please fill all the fields.");
              return;
            }

            // Validate email format
            if (!validateEmail(email)) {
              alert("Please enter a valid email address (e.g., user@example.com)");
              return;
            }

            // Validate secondary phone number (remove space for validation)
            const cleanPhone = secondaryPhone.replace(/\s/g, '');
            if (cleanPhone.length !== 10) {
              alert("Please enter a valid 10-digit mobile number.");
              return;
            }

            // Create user data object with all collected information
            const userData = {
              fullName: fullName.trim(),
              email: email.trim(),
              primaryPhone: primaryPhone,
              secondaryPhone: cleanPhone, // Store without space
              formattedSecondaryPhone: secondaryPhone, // Store with formatting for display
              location: userLocation.trim(),
              otp: otp,
              timestamp: new Date().toISOString(),
              signupCompleted: true
            };

            // Log user details to console
            console.log("=== USER REGISTRATION DETAILS ===");
            console.log("Full Name:", userData.fullName);
            console.log("Email:", userData.email);
            console.log("Primary Phone:", userData.primaryPhone);
            console.log("Secondary Phone:", userData.secondaryPhone);
            console.log("Formatted Secondary Phone:", userData.formattedSecondaryPhone);
            console.log("Location:", userData.location);
            console.log("OTP Used:", userData.otp);
            console.log("Registration Time:", userData.timestamp);
            console.log("Complete User Data Object:", userData);
            console.log("=================================");

            // Navigate to success page
            navigate('/AccountCreated');
          }}
        >
          Create Account
        </button>
      </div>
    </div>

  );
};

export default UserDetails;
