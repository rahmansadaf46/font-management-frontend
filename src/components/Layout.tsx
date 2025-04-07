// src/components/Layout.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutProps } from '../types';


const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark text-white">
        <div className="container">
          <Link to="/" className="navbar-brand text-white">
            Font Management
          </Link>
        </div>
      </nav>
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        {/* Content */}
        <div className="container mt-4">
          {children} {/* This will render the routed components */}
        </div>
      </div>
    </>

  );
};

export default Layout;
