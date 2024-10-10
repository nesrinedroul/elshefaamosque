import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as jose from 'jose';
import Registration from './Registration';
import Login from './Login';
import App1 from './App1';
import Footer from './Footer';
import Chatbot from './Chatbot';
import NavBar from './NavBar';
import VideoGrid from './VideoGrid';
import Admin from './Admin';
import ParentDashboard from './ParentDashboard';
import Profile from './Profile';
import TeacherComponent from './TeacherComponent';
import { ThemeProvider,createTheme} from '@mui/material/styles';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [hasVisitedAbout, setHasVisitedAbout] = useState(false);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [hasNavigated, setHasNavigated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');

    if (storedToken) {
      try {
        const decodedToken = jose.decodeJwt(storedToken);
        const isExpired = decodedToken.exp * 1000 < Date.now();

        if (isExpired) {
         
          setError('Your session has expired. Please log in again.');
          return;
        }

        axios
          .get('https://mohannednes.pythonanywhere.com/auth/protected', {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
            withCredentials: true,
          })
          .then((response) => {
            const data = response.data;
            if (data.valid) {
              setIsAuthenticated(true);
              setCurrentUser(data.user);
              setUserRole(decodedToken.role || '');

              if (!hasNavigated) {
                navigate('/app');
                setHasNavigated(true);
              }
            } else {
             
              setError('Invalid token. Please log in again.');
            }
          })
          .catch((error) => {
            console.error('Error verifying token:', error.message);
           
            setError('Error verifying token. Please log in again.');
          });
      } catch (error) {
        console.error('Error decoding token:', error.message);
        
        setError('Error decoding token. Please log in again.');
      }
    }
  }, [hasNavigated, navigate]);

  const handleRegister = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  const handleLogin = async (user, tokenFromBackend) => {
    console.log('Received token from backend:', tokenFromBackend);

    if (typeof tokenFromBackend !== 'string' || tokenFromBackend.trim() === '') {
      console.error('Invalid token format. Token should be a non-empty string.');
      setError('Invalid token format. Please log in again.');
      return;
    }

    setIsAuthenticated(true);
    setCurrentUser(user);
    
    setToken(tokenFromBackend);

    try {
      const decodedToken = jose.decodeJwt(tokenFromBackend);
      setUserRole(decodedToken.role || '');

      // Delay to ensure navigation is not too fast
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate('/app'); // Redirect to app
    } catch (error) {
      console.error('Error decoding token during login:', error);
      setError('Error decoding token. Please log in again.');
    }
  };

  const toggleForm = () => {
    setShowLogin((prev) => !prev);
  };

  const handleScroll = () => {
    if (!hasVisitedAbout) {
      const scrollPosition = window.scrollY;
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        const triggerPosition = aboutSection.offsetTop;
        if (scrollPosition + window.innerHeight > triggerPosition) {
          setHasVisitedAbout(true);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasVisitedAbout]);

  const handleProfileUpdate = (updatedUser) => {
    setCurrentUser(updatedUser);
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: '#3f51b5', // Set your custom primary color
        light: '#757de8', // Ensure light is defined
        dark: '#002984',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });
  
  return (
    <div className="auth-page-container">
      {isAuthenticated && <NavBar userRole={userRole} />}
      <Routes>
        <Route
          path="/auth"
          element={
            isAuthenticated ? (
              <Navigate to="/app" />
            ) : (
              <div className="con">
                <div className={`container ${showLogin ? '' : 'active'}`} id="container">
                  {showLogin ? (
                    <>
                      <Login onLogin={handleLogin} />
                      <div className="toggle-container">
                        <div className="toggle">
                          <div className="toggle-panel toggle-right">
                            <h1>مرحبا!</h1>
                            <p>سجل باستخدام بياناتك الشخصية لاستخدام جميع ميزات موقعنا</p>
                            <button className="hidden" onClick={toggleForm}>
                              تسجيل
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Registration onRegister={handleRegister} />
                      <div className="toggle-container">
                        <div className="toggle">
                          <div className="toggle-panel toggle-left">
                            <h1>مرحباً بعودتك!</h1>
                            <p>أدخل بياناتك الشخصية لاستخدام جميع ميزات موقعنا</p>
                            <button className="hidden" onClick={toggleForm}>
                              تسجيل الدخول
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          }
        />
        <Route
          path="/app"
          element={
            isAuthenticated ? (
              <>
                <App1 userRole={userRole} /> {/* Pass userRole from the App component */}
                <Chatbot />
                <Footer />
              </>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route path="/video" element={isAuthenticated ? <VideoGrid /> : <Navigate to="/auth" />} />
        <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/auth" />} />
        <Route path="/teacher" element={isAuthenticated ?   <ThemeProvider theme={theme}>
    <TeacherComponent />
  </ThemeProvider>: <Navigate to="/auth" />} />
        <Route path="/kids" element={isAuthenticated ? <VideoGrid /> : <Navigate to="/auth" />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile/> : <Navigate to="/auth" />}
        />
        <Route
          path="/register-child"
          element={isAuthenticated ? <ParentDashboard token={token} /> : <Navigate to="/auth" />}
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? '/app' : '/auth'} />} />
      </Routes>
    </div>
  );
};

export default App;

