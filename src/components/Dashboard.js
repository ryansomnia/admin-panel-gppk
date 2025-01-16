import React, { useState, useEffect } from 'react';

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import './Dashboard.css';

function Dashboard() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Ambil username dari localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []); // Hanya dijalankan sekali saat komponen di-mount

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Welcome, Admin {username}</h1>
          <p>Manage data and oversee service activities</p>
        </header>
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
