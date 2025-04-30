import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, Typography, Box, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DynamicTable from './DynamicTable';
import moment from 'moment';
import Swal from 'sweetalert2';


function KkaMeditation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fetchDataKKA = async () => {
    const response = await fetch(`https://api.gppkcbn.org/cbn/v1/kka/getAll`);
    const data = await response.json();
    return data.data;
  };

  const fetchDataRenunganKKA = async () => {
    const response = await fetch(`https://api.gppkcbn.org/cbn/v1/artikel/bahanKKA`);
    const data = await response.json();
    return data.data;
  };

  const deleteKKA = async (id) => {
    const response = await fetch(`https://api.gppkcbn.org/cbn/v1/kka/deleteOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ id: id }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || 'Gagal menghapus KKA');
    }
    return response.json();
  };

  

  const deleteRenungan = async (id) => {
    try {
      // Perbaikan: Gunakan POST dan kirim ID dalam body
      const response = await fetch(`https://api.gppkcbn.org/cbn/v1/artikel/deleteRenungan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ id: id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete Renungan');
      }
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };


  const {
    data: kkaData,
    isLoading: kkaIsLoading,
    error: kkaError,
  } = useQuery({
    queryKey: ['dataKKA'],
    queryFn: fetchDataKKA,
  });

  const {
    data: renunganData,
    isLoading: renunganIsLoading,
    error: renunganError,
  } = useQuery({
    queryKey: ['dataRenunganKKA'],
    queryFn: fetchDataRenunganKKA,
  });

  const deleteKKAMutation = useMutation({
    mutationFn: deleteKKA,
    onSuccess: () => {
      queryClient.invalidateQueries(['dataKKA']);
      Swal.fire({
        title: 'KKA Berhasil Dihapus!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    },
    onError: (error) => {
      Swal.fire({
        title: 'Gagal Menghapus KKA!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    },
  });
  
  const handleDeleteKKA = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data KKA ini akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteKKAMutation.mutate(id);
      }
    });
  };



  const deleteMutation = useMutation({
    mutationFn: deleteRenungan,
    onSuccess: () => {
      // Perbaikan: Invalidate dataRenunganKKA
      queryClient.invalidateQueries(['dataRenunganKKA']);
      Swal.fire({
        title: 'Renungan Berhasil Dihapus',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    },
    onError: (error) => {
      Swal.fire({
        title: 'Gagal Menghapus Renungan',
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

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'KKA' },
    { key: 'category', label: 'Kategori' },
    { key: 'leader', label: 'Ketua' },
    { key: 'area', label: 'Area' },
    { key: 'day', label: 'Hari' },
    { key: 'time', label: 'Jam' },
    {
      key: 'image',
      label: 'Gambar',
      render: (item) => <img src={item.image} alt={item.title} style={{ width: '200px', height: 'auto' }} />,
    },
    {
      key: 'actions',
      label: 'Aksi',
      render: (item) => (
        <div className="actions">
          <button className="btn-delete" onClick={() => handleDeleteKKA(item.id)}>Hapus</button>
          <button
            className="btn-secondary"
            onClick={() => navigate(`/dashboard/edit-kka/${item.id}`)} // Tambahkan onClick di sini
          >Edit</button>
        </div>
      ),
    },
  ];
  const bahanColumns = [
    { key: 'judulMateri', label: 'Judul Materi' },
    {
      key: 'waktuPembuatan',
      label: 'Tanggal',
      render: (item) => moment(item.created_at).format('dddd, DD/MM/YYYY HH:mm'),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item) => (
        <div
          style={{
            backgroundColor: item.status === '1' ? 'green' : 'black',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            display: 'inline-block',
          }}
        >
          {item.status === '1' ? 'Aktif' : 'Nonaktif'}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Aksi',
      render: (item) => (
        <div className="actions">
          <button className="btn-delete" onClick={() => handleDelete(item.idMateri)}>
          Hapus
          </button>
          <button className="btn-secondary" onClick={() => navigate(`/dashboard/edit-renungan/${item.idMateri}`)}>Edit</button>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Handle KKA
      </Typography>

      {/* Upload Section */}
      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Upload Bahan KKA
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={() => navigate('/dashboard/add-renungan')}>
              + Upload File
            </Button>
          </Box>
        </CardContent>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Bahan KKA
          </Typography>
          {renunganIsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress />
            </Box>
          ) : renunganError ? (
            <Typography color="error">
              There was an error loading the Bahan KKA data.
            </Typography>
          ) : (
            <DynamicTable columns={bahanColumns} data={renunganData} />
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}></Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Kesaksian KKA
          </Typography>
        </CardContent>
      </Card>

      {/* Table Section */}
      <Card>
        <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="h5" gutterBottom>
        Table KKA
      </Typography>
      <Button variant="contained"  color="success" onClick={() => navigate('/dashboard/add-kka')}>
        + Tambah KKA
      </Button>
    </Box>
          
          {kkaIsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress />
            </Box>
          ) : kkaError ? (
            <Typography color="error">There was an error loading the KKA data.</Typography>
          ) : (
            <DynamicTable columns={columns} data={kkaData} />
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default KkaMeditation;