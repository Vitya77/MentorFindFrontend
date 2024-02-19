import React, { useState } from 'react';
import './App.css';
import LoginForm from './Login';
import RegistrationForm from './Registration';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const switchToRegistration = () => {
    setShowLogin(false);
  };

  return (
    <div>
      {showLogin ? (
        <LoginForm switchToRegistration={switchToRegistration} />
      ) : (
        <RegistrationForm />
      )}
    </div>
  );
}

export default App;
