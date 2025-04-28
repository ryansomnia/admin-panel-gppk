import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Typography, CircularProgress } from '@mui/material';
import DynamicTable from './DynamicTable';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './LinkYoutube.css';

export default function LinkYoutube() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const fetchDataLinkYoutube = async () => {
    try {
      const response = await fetch(`http://localhost:3013/cbn/v1/youtube/getAllYoutube`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const deleteArtikel = async (id) => {
    try {
      const response = await fetch(`http://localhost:3013/cbn/v1/youtube/deleteData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ id: id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete article');
      }
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    { key: 'speaker', label: 'Speaker' },
    { key: 'url', label: 'URL' },
    {
      key: 'actions',
      label: 'Aksi',
      render: (item) => (
        <div className="actions">
          <button className="btn-delete" onClick={() => handleDelete(item.id)}>Hapus</button>
          <button className="btn-secondary" onClick={() => navigate(`/dashboard/edit-youtube/${item.id}`)}>Edit</button>
        </div>
      ),
    },
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ['dataLinkYoutube'],
    queryFn: fetchDataLinkYoutube,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteArtikel,
    onSuccess: () => {
      queryClient.invalidateQueries(['dataLinkYoutube']); // Corrected query key
      Swal.fire({
        title: 'Artikel Berhasil Dihapus',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    },
    onError: (error) => {
      Swal.fire({
        title: 'Gagal Menghapus Artikel',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Artikel ini akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div>
      <div className="youtube-section">
        <h2>Data Link Youtube</h2>
        <button className="btn-primary" onClick={() => navigate('/dashboard/add-youtube')}>
          + Tambah Data
        </button>
      </div>

      <div>
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">There was an error loading the data.</Typography>
        ) : (
          <DynamicTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
}