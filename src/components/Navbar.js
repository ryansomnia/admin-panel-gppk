import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useMutation } from '@tanstack/react-query';
import { GrArticle } from "react-icons/gr";
import { FaUsers, FaPray, FaBook } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Navbar() {
  const navigate = useNavigate();

  // Fungsi untuk menangani logout dengan useMutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Proses logout di client-side, misalnya menghapus token
      localStorage.removeItem('token');
    },
    onSuccess: () => {
      // Setelah berhasil, arahkan pengguna ke halaman login
      navigate('/');
      // Tampilkan SweetAlert setelah logout sukses
      Swal.fire({
        title: 'Logout Sukses',
        text: 'Anda telah berhasil logout!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    },
    onError: () => {
      // Tampilkan error SweetAlert jika ada masalah logout
      Swal.fire({
        title: 'Gagal Logout',
        text: 'Terdapat masalah saat logout, coba lagi.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    },
  });

  const handleLogout = () => {
    // Panggil fungsi logout dari useMutation
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Anda akan keluar dari akun ini.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Logout',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        // Jika pengguna memilih "Ya, Logout"
        logoutMutation.mutate();
      }
    });
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-title">Admin Dashboard</h2>
      <ul className="navbar-links">
        <li>
          <NavLink to="artikel" className="navbar-link">
            <GrArticle className="navbar-icon" />
            Data Artikel
          </NavLink>
        </li>
        <li>
          <NavLink to="jemaat" className="navbar-link">
            <FaUsers className="navbar-icon" />
            Data Kartu Jemaat
          </NavLink>
        </li>
        <li>
          <NavLink to="doa" className="navbar-link">
            <FaPray className="navbar-icon" />
            Data Permohonan Doa
          </NavLink>
        </li>
        <li>
          <NavLink to="renungan" className="navbar-link">
            <FaBook className="navbar-icon" />
            Data Renungan KKA
          </NavLink>
        </li>
        <li>
          <button onClick={handleLogout} className="navbar-link logout-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
