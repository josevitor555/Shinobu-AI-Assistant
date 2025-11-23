// Styles CSS
import './App.css';

// React router dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Page Components
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page (Chat Principal) */}
        <Route path="/chat" element={<Home />} />
        
        {/* Authentication Page */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Settings Routes */}
        <Route path="/settings" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Configurações</h1>
              <p className="mt-4">Página de configurações do usuário</p>
            </div>
          </div>
        } />
        
        <Route path="/settings/profile" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Perfil</h1>
              <p className="mt-4">Gerencie suas informações de perfil</p>
            </div>
          </div>
        } />
        
        <Route path="/settings/account" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Conta</h1>
              <p className="mt-4">Gerencie as configurações da sua conta</p>
            </div>
          </div>
        } />

        {/* Page not found */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-8">Página não encontrada</p>
              <a 
                href="/login" 
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Voltar para a página inicial
              </a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;