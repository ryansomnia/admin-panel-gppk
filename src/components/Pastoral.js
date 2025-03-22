import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Typography, CircularProgress } from '@mui/material';
import DynamicTable from './DynamicTable';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';


// import Swal from 'sweetalert2';

function Pastoral() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const fetchDataBaptism = async () => {
    try {
      const response = await fetch(`https://api.gppkcbn.org/cbn/v1/service/baptisan/getFormBaptisan`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('=================fff===================');
      console.log(data);
      console.log('====================================');
      return data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  const deleteBaptism = async (id) => {
    try {
      const response = await fetch(`https://api.gppkcbn.org/cbn/v1/service/baptisan/deleteFormBaptisan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ id: id }), // Perhatikan perubahan di sini
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete data');
      }
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };


  const columnsBaptism = [

    { key: 'TanggalPendaftaran', label: 'Tanggal Daftar',  render: (item) => {
      return moment(item.TanggalLahir).format('DD-MM-YYYY');
    },
  },
    { key: 'NamaLengkap', label: 'Nama' },
    { key: 'TempatLahir', label: 'Tempat Lahir' },
    { key: 'TanggalLahir', label: 'Tgl Lahir',  render: (item) => {
      return moment(item.TanggalLahir).format('DD-MM-YYYY');
    },
  },
    { key: 'NoHP', label: 'No. HP' },
    { key: 'KepercayaanLama', label: 'Kepercayaan Lama' },
    {
      key: 'actions',
      label: 'Aksi',
      render: (item) => (
        <div className="actions">
          <button className="btn btn-delete" onClick={() => handleDelete(item.id)}>Hapus</button>
          <button className="btn btn-secondary">Edit</button>
          <button className="btn btn-detail" onClick={() => navigate(`/dashboard/detail-baptisan/${item.id}`)}>Detail</button>
        </div>
      ),
    },
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ['dataBaptism'],
    queryFn: fetchDataBaptism,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBaptism,
    onSuccess: () => {
      queryClient.invalidateQueries(['dataBaptism']); // Corrected query key
      Swal.fire({
        title: ' Berhasil Dihapus',
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
    <div>
      <div className="mb-10">
        <h2>Permohonan Baptisan</h2>
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">There was an error loading the data.</Typography>
        ) : (
          <DynamicTable columns={columnsBaptism} data={data} />
        )}
      </div>
      <div>
        <h2>Permohonan Konseling</h2>
        {/* Konten data service */}
      </div>
      <div>
        <h2>Permohonan Kartu Jemaat</h2>
        {/* Konten data service */}
      </div>
      <div>
        <h2>Pendaftaran Pelayan</h2>
        {/* Konten data service */}
      </div>
      <div>
        <h2>Pemberkatan Pernikahan</h2>
        {/* Konten data service */}
      </div>
      <div>
        <h2>Pemberkatan Rumah</h2>
        {/* Konten data service */}
      </div>
      <div>
        <h2>Penyerahan Anak</h2>
        {/* Konten data service */}
      </div>
    </div>
  );
}

export default Pastoral;