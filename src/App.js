import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import JemaatData from './components/JemaatData';
import ServiceData from './components/ServiceData';
import DoaRequests from './components/DoaRequests';
import KkaMeditation from './components/KKAMeditation';
import ArtikelData from './components/ArtikelData';
import AddArtikel from './components/AddArtikel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Path child harus relatif */}
          <Route path="artikel" element={<ArtikelData />} />
          <Route path="add-article" element={<AddArtikel />} />
          <Route path="jemaat" element={<JemaatData />} />
          <Route path="service" element={<ServiceData />} />
          <Route path="doa" element={<DoaRequests />} />
          <Route path="renungan" element={<KkaMeditation />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
