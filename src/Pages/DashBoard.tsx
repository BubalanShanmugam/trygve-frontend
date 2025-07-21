import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import './DashBoard.css';

const DashBoard = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    // Clear user from context
    setUser(null);
    
    // Clear any stored data
    localStorage.clear();
    sessionStorage.clear();
    
    // Navigate back to welcome page
    navigate('/welcome');
  };

  const handleProfileEdit = () => {
    // Navigate to user details for editing
    navigate('/UserDetails');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="logo-section">
          <img src="/Bglogo.png" alt="Trygve Logo" className="dashboard-logo" />
          <h1>Welcome to Trygve</h1>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="user-info-card">
          <h2>Your Profile</h2>
          {user ? (
            <div className="user-details">
              <p><strong>Phone:</strong> {user.phoneNumber || 'Not available'}</p>
              <p><strong>User ID:</strong> {user.uid}</p>
              <p><strong>Last Sign In:</strong> {user.metadata?.lastSignInTime || 'Not available'}</p>
              <p><strong>Account Created:</strong> {user.metadata?.creationTime || 'Not available'}</p>
            </div>
          ) : (
            <p>No user information available</p>
          )}
          <button className="edit-profile-btn" onClick={handleProfileEdit}>
            Edit Profile
          </button>
        </div>

        <div className="dashboard-cards">
          <div className="card">
            <h3>Health Records</h3>
            <p>View and manage your health records</p>
            <button className="card-btn">View Records</button>
          </div>

          <div className="card">
            <h3>Appointments</h3>
            <p>Schedule and manage appointments</p>
            <button className="card-btn">Book Appointment</button>
          </div>

          <div className="card">
            <h3>Medical History</h3>
            <p>Access your complete medical history</p>
            <button className="card-btn">View History</button>
          </div>

          <div className="card">
            <h3>Prescriptions</h3>
            <p>Manage your prescriptions and medications</p>
            <button className="card-btn">View Prescriptions</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;