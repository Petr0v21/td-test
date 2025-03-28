import React from 'react';
import './App.css';
import { AuthProvider } from '@context/AuthContext';
import Header from '@components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '@components/Login';
import Profile from '@components/Profile';
import Home from '@components/Home';
import Page404 from '@components/404';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="main-container">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/me" element={<Profile />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
