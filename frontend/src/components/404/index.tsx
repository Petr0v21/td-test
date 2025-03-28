import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Page404: React.FC = () => {
  return (
    <div className="page-404">
      <h3 className="page-title">404</h3>
      <Link to={'/'}>Back to Home page</Link>
    </div>
  );
};

export default Page404;
