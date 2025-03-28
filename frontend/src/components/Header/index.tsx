import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import './index.css';

const Header: React.FC = () => {
  const auth = useAuth();
  return (
    <header className="header">
      <Link to={'/'}>
        <h1>Traffic Devils Test</h1>
      </Link>
      <div className="header-account-container">
        <Link to={auth.user ? 'me' : 'login'} className="header-account">
          <p>{auth.user ? auth.user.email : 'Login'}</p>
        </Link>
        {auth.user && <button onClick={() => auth.logout()}>Exit</button>}
      </div>
    </header>
  );
};

export default Header;
