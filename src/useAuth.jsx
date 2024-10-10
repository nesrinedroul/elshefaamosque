import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as jose from 'jose';

const useAuth = (onLogin) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the stored token from localStorage
    const token = localStorage.getItem('access_token');

    if (token) {
      try {
        // Decode the token to check its validity
        const decodedToken = jose.decodeJwt(token);

        // Check if the token has expired
        if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
          console.log('Token expired, logging out');
          localStorage.removeItem('access_token');
          navigate('/login');
        } else {
          console.log('Token is valid, logging in');
          onLogin(decodedToken, token); // Pass the decoded user data and token to the parent
          navigate('/app'); // Redirect to the authenticated area
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('access_token'); // Remove the invalid token
        navigate('/login');
      }
    }
  }, [navigate, onLogin]);
};

export default useAuth;
