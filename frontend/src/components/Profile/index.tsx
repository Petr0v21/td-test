import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import './index.css';

const Profile: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) {
      navigate('/login');
    }
  }, [auth.user, navigate]);

  return (
    <div className="profile">
      <h3 className="page-title">Profile</h3>
      <p>ID: {auth.user?._id}</p>
      <p>Email: {auth.user?.email}</p>
      <p>Phone: {auth.user?.phone}</p>
      <p>
        {'Created At: ' +
          auth.user?.createdAt.toString().replace('T', ' ').slice(0, 16)}
      </p>
    </div>
  );
};

export default Profile;
