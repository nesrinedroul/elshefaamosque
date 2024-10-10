import { useState } from 'react';
import PropTypes from 'prop-types'; // استيراد PropTypes
import axios from 'axios';
import './index.css'; // Assuming this has your styles
import { useNavigate } from 'react-router-dom';

const Registration = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  // Hosted backend URL
  const backendUrl = 'https://mohannednes.pythonanywhere.com/auth/register';

  const handleRegister = async (e) => {
    e.preventDefault();
    if (name && email && password) {
      setLoading(true); // Start loading
      try {
        const response = await axios.post(backendUrl, {
          name,
          email,
          password
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true // Include credentials (if needed)
        });

        // Handle response
        const data = response.data;
        localStorage.setItem('token', data.token); // Store token
        onRegister(data); // Handle registration
        navigate('/app'); // Redirect on successful registration

      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          setError(error.response.data.message || 'فشل التسجيل');
        } else if (error.request) {
          // Request was made but no response received
          setError('لا يوجد رد من الخادم. يرجى المحاولة مرة أخرى.');
        } else {
          // Something else happened
          setError('حدث خطأ. يرجى المحاولة مرة أخرى.');
        }
      } finally {
        setLoading(false); // Stop loading when the process is finished
      }
    } else {
      setError('يرجى ملء جميع الحقول.');
    }
  };

  return (
    <div className="form-container sign-up">
      <form onSubmit={handleRegister}>
        <h1>إنشاء حساب</h1>
        <span>أو استخدم بريدك الإلكتروني للتسجيل</span>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="الاسم"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? <div className="spinner"></div> : 'تسجيل'}
        </button>
      </form>
    </div>
  );
};

Registration.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default Registration;
