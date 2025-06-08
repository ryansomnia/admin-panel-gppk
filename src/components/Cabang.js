import React from 'react';
import { useQuery, useMutation,useQueryClient } from '@tanstack/react-query';
import { Typography, CircularProgress } from '@mui/material';
import DynamicTable from './DynamicTable';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './LinkYoutube.css';





export default function Cabang() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();


  const fetchDataCabang = async () => {
    const response = await fetch(`https://api.gppkcbn.org/cbn/v1/cabang/getAllData`);
    const data = await response.json();
    return data.data; 
  };
  const deleteCabang = async (id) => {
    try {
      const response = await fetch(`https://api.gppkcbn.org/cbn/v1/cabang/deleteCabang`, {
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
    { key: 'namaCabang', label: 'Nama Cabang' },
    {
      key: 'url',
      label: 'Image',
      render: (item) => <img src={item.img} alt={item.title} style={{ width: '200px', height: 'auto' }} />,
    },
    { key: 'pastor', label: 'Pastor' },
    { key: 'address', label: 'Address' },
    {
      key: 'actions',
      label: 'Aksi',
      render: (item) => (
        <div className="actions">
          <button className="btn-delete" onClick={() => handleDelete(item.id)}>Hapus</button>
          <button className="btn-secondary" onClick={() => navigate(`/dashboard/edit-article/${item.id}`)}>Edit</button>
        </div>
      ),
    },
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ['dataCabang'],
    queryFn: fetchDataCabang,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCabang,
    onSuccess: () => {
      queryClient.invalidateQueries(['dataCabang']);
      Swal.fire({
        title: 'Data Berhasil Dihapus',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    },
    onError: (error) => {
      Swal.fire({
        title: 'Gagal Menghapus ',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data ini akan dihapus!',
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
    <div >
      <div className='youtube-section'>
      <h2>Data Cabang</h2>
      <button className="btn-primary" onClick={() => navigate('/dashboard/add-cabang')}>
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
  )
}
