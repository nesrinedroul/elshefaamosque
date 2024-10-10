import { useState, useEffect } from 'react';


const UserForm = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'member',
  });

  useEffect(() => {
    if (user && user.id) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '', // Keep the password field empty for edits
        role: user.role || 'member',
      });
    } else {
      resetForm();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Exclude password if editing and it's empty
    if (user && !formData.password) {
      const { password, ...restData } = formData;
      onSubmit(restData);
    } else {
      onSubmit(formData);
    }
    resetForm(); // Reset form after submission
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'member',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        aria-label="User Name"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        aria-label="User Email"
      />
      {!user && (
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          aria-label="User Password"
        />
      )}
      <select name="role" value={formData.role} onChange={handleChange} aria-label="User Role">
        <option value="member">Member</option>
        <option value="admin">Admin</option>
        <option value="teacher">teacher</option>
      </select>
      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default UserForm;
