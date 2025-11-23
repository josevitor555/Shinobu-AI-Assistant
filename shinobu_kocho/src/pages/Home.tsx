import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatInterface from '../components/chat/ChatInterface';
import { authService } from '../lib/auth';
import type { User } from '../lib/auth';

const Home = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    const user = authService.getCurrentUser();
    if (!user) {
      // Redirect to login if not authenticated
      navigate('/login');
    } else {
      setCurrentUser(user);
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    navigate('/login');
  };

  const handleOpenSettings = () => {
    navigate('/settings');
  };

  // Show loading state while checking authentication
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Carregando...</h1>
          <p className="mt-4">Verificando autenticação</p>
        </div>
      </div>
    );
  }

  return (
    <ChatInterface 
      user={currentUser}
      onLogout={handleLogout}
      onOpenSettings={handleOpenSettings}
    />
  );
};

export default Home;