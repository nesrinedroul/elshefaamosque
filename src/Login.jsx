import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as jose from 'jose';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const backendUrl = 'https://mohannednes.pythonanywhere.com/auth/login';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error before new attempt

    try {
      const response = await axios.post(backendUrl, { email, password }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      console.log("Response from server:", response.data);

      const { access_token } = response.data;

      if (access_token) {
        // Ensure valid token before storing
        if (typeof access_token === 'string' && access_token.split('.').length === 3) {
          localStorage.setItem('access_token', access_token);
          console.log("Stored Token:", access_token);

          // Decode and validate the token
          const decodedToken = jose.decodeJwt(access_token);
          console.log("Decoded Token:", decodedToken);

          // Check if the token is expired
          if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
            setError('Your session has expired. Please log in again.');
            // Remove the expired token
          } else {
            onLogin(decodedToken, access_token); // Pass decoded user data and token to parent
            navigate('/app'); // Redirect to app
          }
        } else {
          console.error('Invalid JWT structure:', access_token);
          setError('فشل تسجيل الدخول: رمز الوصول غير صحيح');
        }
      } else {
        setError('فشل تسجيل الدخول: لم يتم استلام رمز الوصول');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'فشل تسجيل الدخول');
      } else if (error.request) {
        setError('لا يوجد رد من الخادم. يرجى المحاولة مرة أخرى.');
      } else {
        setError('حدث خطأ. يرجى المحاولة مرة أخرى.');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="form-container sign-in">
      <form onSubmit={handleLogin}>
        <h1>تسجيل الدخول</h1>
        <span>استخدم بريدك الإلكتروني وكلمة المرور</span>
        {error && <p className="error-message">{error}</p>}
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
          {loading ? <div className="spinner"></div> : 'تسجيل الدخول'}
        </button>
      </form>
    </div>
  );
};

// PropTypes for validating props
Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
