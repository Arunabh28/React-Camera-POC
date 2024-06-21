import React from 'react';
import './layout.css';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <header>
        {/* Header content (e.g., navigation, logo) */}
        <h1>Canvas POC</h1>
      </header>
      <main>
        {/* Main content (e.g., routed components) */}
        {children}
      </main>
     
    </div>
  );
};

export default Layout;
