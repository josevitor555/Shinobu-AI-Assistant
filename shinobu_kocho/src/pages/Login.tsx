import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const Login = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuthSuccess = () => {
    // Navigate to home/dashboard after successful authentication
    navigate('/chat');
  };

  const handleSwitchToRegister = () => {
    setIsRegistering(true);
  };

  const handleSwitchToLogin = () => {
    setIsRegistering(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {isRegistering ? (
        <RegisterForm 
          onSuccess={handleAuthSuccess} 
          onSwitchToLogin={handleSwitchToLogin} 
        />
      ) : (
        <LoginForm 
          onSuccess={handleAuthSuccess} 
          onSwitchToRegister={handleSwitchToRegister} 
        />
      )}
    </div>
  );
};

export default Login;