import './Welcome.css';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      {/* ✅ Background image with low opacity */}
      <div className="background-logo" />

      {/* ✅ Main Content */}
      
      <div className="content">
        <h2 className='greet'>Welcome to</h2>
        <h1 className="brand">trygve</h1>
        <div className="logo-b">
        <img src="/Bglogo.png" />
      </div>
        <p className="tagline">
          Your trusted partner for personalized healthcare, right at your doorstep
        </p>

        <button className="primary" onClick={() => navigate('/signup')}>
          Sign up
        </button>
        <button className="secondary" onClick={() => navigate('/login')}>
          Log in
        </button>
      </div>
    </div>
  );
};

export default Welcome;

