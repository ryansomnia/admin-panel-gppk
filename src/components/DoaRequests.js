import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DynamicTable from './DynamicTable';
import Swal from 'sweetalert2';

const deleteDataDoa = async (id) => {
  try {
    const response = await fetch(`https://api.gppkcbn.org/cbn/v1/service/doa/deleteOne`, {
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

function DoaRequests() {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteDataDoa,
    onSuccess: () => {
      queryClient.invalidateQueries(['doaRequests']);
      Swal.fire({
        title: 'Permohonan Doa Berhasil Dihapus',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    },
    onError: (error) => {
      Swal.fire({
        title: 'Gagal Menghapus Permohonan Doa',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Permohonan doa ini akan dihapus!',
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
    { key: 'full_name', label: 'Nama Lengkap' },
    { key: 'user_name', label: 'Nama Pengguna' },
    { key: 'contact_info', label: 'Kontak' },
    { key: 'description', label: 'Deskripsi' },
    { key: 'tanggal', label: 'Tanggal' },
    {
      key: 'actions',
      label: 'Aksi',
      render: (item) => (
        <div className="actions">
          <button className="btn-delete" onClick={() => handleDelete(item.id)}>
            Hapus
          </button>
        </div>
      ),
    },
  ];

  const fetchDoaData = async () => {
    const response = await fetch(`https://api.gppkcbn.org/cbn/v1/service/doa/getAll`);
    const data = await response.json();
    return data.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['doaRequests'],
    queryFn: fetchDoaData,
  });

  if (isLoading) return <p>Loading data...</p>;
  if (error) return <p>There was an error loading the data.</p>;

  return (
    <div>
      <h2>Data Permohonan Doa</h2>
      <div>
        <DynamicTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default DoaRequests;