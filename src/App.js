import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import JemaatData from './components/JemaatData';
import ServiceData from './components/Pastoral';
import DoaRequests from './components/DoaRequests';
import KkaMeditation from './components/KKAMeditation';
import ArtikelData from './components/ArtikelData';
import AddArtikel from './components/AddArtikel';
import EditArtikel from './components/EditArtikel';
import LinkYoutube from './components/LinkYoutube';
import AddYoutube from './components/AddYoutube';
import Cabang from './components/Cabang';
import AddCabang from './components/AddCabang'
import AddRenungan from './components/AddRenungan'
import EditRenungan from './components/EditRenungan';
import EditYoutube from './components/EditYoutube';
import Pastoral from './components/Pastoral';
import DetailBaptisanAir from './components/DetailBaptisanAir';

// port =3011
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Path child harus relatif */}
          <Route path="artikel" element={<ArtikelData />} />
          <Route path="add-article" element={<AddArtikel />} />
          <Route path="add-youtube" element={<AddYoutube />} />
          <Route path="edit-article/:id" element={<EditArtikel />} />
          <Route path="edit-renungan/:id" element={<EditRenungan />} />
          <Route path="edit-youtube/:id" element={<EditYoutube />} />
          <Route path="detail-baptisan/:id" element={<DetailBaptisanAir />} />

          <Route path="add-cabang" element={<AddCabang />} />
          <Route path="add-renungan" element={<AddRenungan />} />

          <Route path="kka" element={<KkaMeditation />} />
          <Route path="youtube" element={<LinkYoutube/>} />
          <Route path="cabang" element={<Cabang/>} />
          <Route path="pastoral" element={<Pastoral/>} />


          
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
