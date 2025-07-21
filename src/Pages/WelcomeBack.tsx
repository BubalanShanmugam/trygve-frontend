import { useNavigate } from 'react-router-dom';
import './WelcomeBack.css';

const WelcomeBack = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/DashBoard'); // Updated to match your actual route
  };

  return (
    <div className="welcomeb-container">
      <div className="welcomeb-content">

        {/* Checkmark Icon */}
        <div className="checkmark-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="#0146ff" strokeWidth="2">
            <circle cx="12" cy="12" r="10" stroke="#0146ff" strokeWidth="2" fill="none"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4"/>
          </svg>
        </div>

        {/* Heading */}
        <h2 className="welcomeb-title">Welcome Back to <span>TRYGVE!</span></h2>

        {/* Subtitle */}
        <p className="welcomeb-subtext">"Your trusted guardian of life is ready to serve you."</p>

        {/* Continue Button */}
        <button className="continue-btn" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};
export default WelcomeBack;
