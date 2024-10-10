
import  { useState } from 'react';
import './index.css'; // Styling for the profile page

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "User Name", // Default value, replace with actual user data
    email: "user@example.com", // Default value, replace with actual user data
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Save the updated profile information to the backend
    // Make an API call to update the user's profile data
    console.log("Profile Updated", userData);
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <form onSubmit={handleSave} className="profile-form">
        <div className="profile-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>

        <div className="profile-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            disabled
          />
        </div>

        <div className="profile-field">
          <label htmlFor="password">Change Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Enter new password"
          />
        </div>
        
        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
