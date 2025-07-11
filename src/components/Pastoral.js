import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Typography, CircularProgress, Box } from '@mui/material';
import DynamicTable from './DynamicTable';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';


// import Swal from 'sweetalert2';

function Pastoral() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const fetchDataKartuJemaat = async () => {
    const response = await fetch(`https://api.gppkcbn.org/cbn/v1/service/jemaat/getAll`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data;
  };
  const fetchDataBaptism = async () => {
    const response = await fetch(`https://api.gppkcbn.org/cbn/v1/service/baptisan/getFormBaptisan`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data;
  };

  // Fetch data untuk Konseling
  const fetchDataKonseling = async () => {
    const response = await fetch(`https://api.gppkcbn.org/cbn/v1/service/konseling/getData`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data;
  };

  // Fetch data untuk Pendaftaran Pelayan (contoh, sesuaikan dengan endpoint Anda)
  const fetchDataPelayan = async () => {
    const response = await fetch(`https://api.gppkcbn.org/cbn/v1/service/pelayan/getData`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data;
  };

  // Fetch data untuk Pemberkatan Pernikahan (contoh, sesuaikan dengan endpoint Anda)
  const fetchDataPernikahan = async () => {
    const response = await fetch(`https://api.gppkcbn.org/cbn/v1/service/pernikahan/getData`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    return data.data;
  };

  // Fetch data untuk Pemberkatan Rumah (contoh, sesuaikan dengan endpoint Anda)
  const fetchDataRumah = async () => {
    const response = await fetch(`https://api.gppkcbn.org/cbn/v1/service/pemberkatanRumah/getData`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data;
  };

  // Fetch data untuk Penyerahan Anak (contoh, sesuaikan dengan endpoint Anda)
  const fetchDataAnak = async () => {
    const response = await fetch(`https://api.gppkcbn.org/cbn/v1/service/penyerahanAnak/getData`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data;
  };

  const deleteKartu = async (id) => {
    try {
      const response = await fetch(`https://api.gppkcbn.org/cbn/v1/service/jemaat/deleteData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ id: id }), // Perhatikan perubahan di sini
      });
  console.log('=================id===================');
  console.log(id);
  console.log('====================================');
      if (!response.ok) {
        throw new Error('Failed to delete data');
      }
      return response.json();
    } catch (error) {
      throw new Error(error.message);
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
  const deleteKonseling = async (id) => {
    try {
      const response = await fetch(`https://api.gppkcbn.org/cbn/v1/service/konseling/deleteOneData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ id: id }),
      });
      if (!response.ok) throw new Error('Failed to delete data');
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const deletePelayan = async (id) => {
    try {
      const response = await fetch(`https://api.gppkcbn.org/cbn/v1/service/pelayan/deleteOneData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ id: id }),
      });
      if (!response.ok) throw new Error('Failed to delete data');
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const deletePernikahan = async (id) => {
    try {
      const response = await fetch(`https://api.gppkcbn.org/cbn/v1/service/pernikahan/deleteOneData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ id: id }),
      });
      if (!response.ok) throw new Error('Failed to delete data');
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const deletePemberkatanRumah = async (id) => {
    try {
      const response = await fetch(`https://api.gppkcbn.org/cbn/v1/service/pemberkatanRumah/deleteOneData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ id: id }),
      });
      if (!response.ok) throw new Error('Failed to delete data');
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const deletePenyerahanAnak = async (id) => {
    try {
      const response = await fetch(`https://api.gppkcbn.org/cbn/v1/service/penyerahanAnak/deleteOneData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ id: id }),
      });
      if (!response.ok) throw new Error('Failed to delete data');
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const columnsKartuJemaat = [
    { key: 'id', label: 'Kode Kartu' },
    { key: 'full_name', label: 'Full Name' },
    { key: 'tanggal_lahir', label: 'Tgl Lahir', render: (item) => moment(item.tanggal_lahir).format('DD-MM-YYYY') },
    { key: 'tempat_lahir', label: 'Tempat Lahir' },
    { key: 'address', label: 'Alamat' },
    { key: 'phone_number', label: 'No. HP' },
    { key: 'tanggal_join', label: 'Tgl Bergabung', render: (item) => moment(item.tgl_join).format('DD-MM-YYYY')  },
    {
      key: 'actions',
      label: 'Aksi',
      render: (item) => (
        <div className="actions">
          <button className="btn btn-delete" onClick={() => handleDeleteKartu(item.id)}>Hapus</button>
          {/* <button className="btn btn-secondary">Edit</button> */}
          <button className="btn btn-detail" onClick={() => navigate(`/dashboard/detail-kartu/${item.id}`)}>Detail</button>
        </div>
      ),
    },
  ];

  const columnsBaptism = [
    { key: 'TanggalPendaftaran', label: 'Tanggal Daftar', render: (item) => moment(item.TanggalLahir).format('DD-MM-YYYY') },
    { key: 'NamaLengkap', label: 'Nama' },
    { key: 'TempatLahir', label: 'Tempat Lahir' },
    { key: 'TanggalLahir', label: 'Tgl Lahir', render: (item) => moment(item.TanggalLahir).format('DD-MM-YYYY') },
    { key: 'NoHP', label: 'No. HP' },
    { key: 'KepercayaanLama', label: 'Kepercayaan Lama' },
    {
      key: 'actions',
      label: 'Aksi',
      render: (item) => (
        <div className="actions">
          <button className="btn btn-delete" onClick={() => handleDeleteBaptism(item.id)}>Hapus</button>
          {/* <button className="btn btn-secondary">Edit</button> */}
          <button className="btn btn-detail" onClick={() => navigate(`/dashboard/detail-baptisan/${item.id}`)}>Detail</button>
        </div>
      ),
    },
  ];
  const columnsKonseling = [
    { key: 'dateInsert', label: 'Tgl', render: (item) => moment(item.dateInsert).format('DD-MMM-YYYY'), maxWidth: 60 },
    { key: 'jenisKonsultasi', label: 'Konsul', maxWidth: 80 },
    { key: 'fullName', label: 'Nama', flexGrow: 1, style: { textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' } },
    { key: 'noHP', label: 'No. HP', maxWidth: 120 },
    { key: 'sex', label: 'J. Kelamin', maxWidth: 100 },
  { key: 'alamat', label: 'Alamat', flexGrow: 2, style: { textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' } },
    {
      key: 'actions',
      label: 'Aksi',
      maxWidth: 150,
      render: (item) => (
        <div className="actions">
          <button className="btn btn-delete" onClick={() => handleDeleteKonseling(item.id)}>Hapus</button>
          <button className="btn btn-detail" onClick={() => navigate(`/dashboard/detail-konseling/${item.id}`)}>Detail</button>
        </div>
      ),
    },
  ];
  const columnsPelayan = [
   { key: 'namaLengkap', label: 'Nama Lengkap'},
   { key: 'nomorHandphone', label: 'Nomor Handphone'},
   { key: 'bidangPelayanan', label: 'Bidang Pelayanan'},

    {
      key: 'actions',
      label: 'Aksi',
      render: (item) => (
        <div className="actions">
          <button className="btn btn-delete" onClick={() => handleDeletePelayan(item.id)}>Hapus</button>
          {/* <button className="btn btn-secondary">Edit</button> */}
        </div>
      ),
    },
  ];
  const columnsPernikahan = [
    { key: 'tanggalPernikahan', label: 'Tgl',render: (item) => moment(item.tanggalPernikahan).format('DD-MM-YYYY')},
    { key: 'jamPernikahan', label: 'waktu',render: (item) => moment(item.jamPernikahan, "HH:mm:ss").format("hh:mm")},
    { key: 'tempatPernikahan', label: 'Lokasi Resepsi'},
    { key: 'namaLengkapPria', label: 'Nama Lengkap Pria'},
    { key: 'teleponPria', label: 'Nomor HP Pria'},
    { key: 'namaLengkapWanita', label: 'Nama Lengkap Wanita'},
    { key: 'teleponWanita', label: 'Nomor HP Wanita'},
 
     {
       key: 'actions',
       label: 'Aksi',
       maxWidth: 150,
       render: (item) => (
         <div className="actions">
           <button className="btn btn-delete" onClick={() => handleDeletePernikahan(item.id)}>Hapus</button>
           <button className="btn btn-secondary" onClick={() => navigate(`/dashboard/edit-pernikahan/${item.id}`)}>Edit</button>
           <button className="btn btn-detail" onClick={() => navigate(`/dashboard/detail-pernikahan/${item.id}`)}>Detail</button>

         </div>
       ),
     },
   ];
   const columnsRumah = [
    // { key: 'created_at', label: 'Date',render: (item) => moment(item.created_at).format('DD-MM-YYYY')},
    { key: 'nama_lengkap', label: 'Nama Lengkap'},
    { key: 'nomor_handphone', label: 'Nomor Handphone'},
    { key: 'tanggal_pelaksanaan', label: 'Tanggal Pelaksanaan',render: (item) => moment(item.tanggal_pelaksanaan).format('DD-MM-YYYY')},
 
     {
       key: 'actions',
       label: 'Aksi',
       maxWidth: 150,
       render: (item) => (
         <div className="actions">
           <button className="btn btn-delete" onClick={() => handleDeletePemberkatanRumah(item.id)}>Hapus</button>
              </div>
       ),
     },
   ];
   const columnsAnak = [
    // { key: 'created_at', label: 'Date',render: (item) => moment(item.created_at).format('DD-MM-YYYY')},
    { key: 'nama_ayah', label: 'Nama Lengkap Ayah'},
    { key: 'telepon_ayah', label: 'NO HP Ayah'},
    {key: 'nama_ibu', label: 'Nama Lengkap Ibu'},
    { key: 'telepon_ibu', label: 'NO HP Ibu'},
    {key: 'nama_anak', label: 'Nama Anak'},
    { key: 'tempat_tanggal_lahir_anak', label: 'TTL Anak'},
    { key: 'tanggal_pelaksanaan', label: 'Tanggal Pelaksanaan',render: (item) => moment(item.tanggal_pelaksanaan).format('DD-MM-YYYY')},
 
    {
      key: 'actions',
      label: 'Aksi',
      maxWidth: 150,
      render: (item) => (
        <div className="actions">
          <button className="btn btn-delete" onClick={() => handleDeletePenyerahanAnak(item.id)}>Hapus</button>
          {/* <button className="btn btn-secondary">Edit</button> */}
          <button className="btn btn-detail" onClick={() => navigate(`/dashboard/detail-penyerahan-anak/${item.id}`)}>Detail</button>

        </div>
      ),
    },
   ]; 
  //   { key: 'dateInsert', label: 'Tgl', render: (item) => moment(item.dateInsert).format('DD-MMM'), maxWidth: 60 },
  //   { key: 'jenisKonsultasi', label: 'Konsul', maxWidth: 80 },
  //   { key: 'fullName', label: 'Nama', flexGrow: 1, style: { textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' } },
  //   { key: 'noHP', label: 'No. HP', maxWidth: 120 },
  //   { key: 'sex', label: 'J. Kelamin', maxWidth: 100 },
  //   { key: 'statusPernikahan', label: 'Status', maxWidth: 100 },
  //   { key: 'TanggalLahir', label: 'Tgl Lahir', render: (item) => moment(item.TanggalLahir).format('DD-MM-YYYY'), maxWidth: 100 },
  //   { key: 'alamat', label: 'Alamat', flexGrow: 2, style: { textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' } },
  //   { key: 'isi', label: 'Detail', flexGrow: 2, style: { textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' } },
  //   {
  //     key: 'actions',
  //     label: 'Aksi',
  //     maxWidth: 150,
  //     render: (item) => (
  //       <div className="actions">
  //         <button className="btn btn-delete" onClick={() => handleDelete(item.id)}>Hapus</button>
  //         <button className="btn btn-secondary">Edit</button>
  //         <button className="btn btn-detail" onClick={() => navigate(`/dashboard/detail-konseling/${item.id}`)}>Detail</button>
  //       </div>
  //     ),
  //   },
  // ];
  const { data: dataBaptism, isLoading: loadingBaptism, error: errorBaptism } = useQuery({ queryKey: ['dataBaptism'], queryFn: fetchDataBaptism });
  const { data: dataKonseling, isLoading: loadingKonseling, error: errorKonseling } = useQuery({ queryKey: ['dataKonseling'], queryFn: fetchDataKonseling });
  const { data: dataKartuJemaat, isLoading: loadingKartuJemaat, error: errorKartuJemaat } = useQuery({ queryKey: ['dataKartuJemaat'], queryFn: fetchDataKartuJemaat });
  const { data: dataPelayan, isLoading: loadingPelayan, error: errorPelayan } = useQuery({ queryKey: ['dataPelayan'], queryFn: fetchDataPelayan });
  const { data: dataPernikahan, isLoading: loadingPernikahan, error: errorPernikahan } = useQuery({ queryKey: ['dataPernikahan'], queryFn: fetchDataPernikahan });
  const { data: dataRumah, isLoading: loadingRumah, error: errorRumah } = useQuery({ queryKey: ['dataRumah'], queryFn: fetchDataRumah });
  const { data: dataAnak, isLoading: loadingAnak, error: errorAnak } = useQuery({ queryKey: ['dataAnak'], queryFn: fetchDataAnak });


  const deleteMutationKartu = useMutation({
    mutationFn: deleteKartu,
    onSuccess: () => {
      queryClient.invalidateQueries(['dataKartuJemaat']);
      Swal.fire({ title: 'Berhasil Dihapus', icon: 'success', confirmButtonText: 'OK' });
    },
    onError: (error) => {
      Swal.fire({ title: 'Gagal Menghapus ', text: error.message, icon: 'error', confirmButtonText: 'OK' });
    },
  });

  const deleteMutationBaptism = useMutation({
    mutationFn: deleteBaptism,
    onSuccess: () => {
      queryClient.invalidateQueries(['dataBaptism']);
      Swal.fire({ title: 'Berhasil Dihapus', icon: 'success', confirmButtonText: 'OK' });
    },
    onError: (error) => {
      Swal.fire({ title: 'Gagal Menghapus ', text: error.message, icon: 'error', confirmButtonText: 'OK' });
    },
  });

  const deleteMutationKonseling = useMutation({
    mutationFn: deleteKonseling,
    onSuccess: () => {
      queryClient.invalidateQueries(['dataKonseling']);
      Swal.fire({ title: 'Berhasil Dihapus', icon: 'success', confirmButtonText: 'OK' });
    },
    onError: (error) => {
      Swal.fire({ title: 'Gagal Menghapus ', text: error.message, icon: 'error', confirmButtonText: 'OK' });
    },
  });
  const deleteMutationPelayan = useMutation({
    mutationFn: deletePelayan,
    onSuccess: () => {
      queryClient.invalidateQueries(['dataPelayan']);
      Swal.fire({ title: 'Berhasil Dihapus', icon: 'success', confirmButtonText: 'OK' });
    },
    onError: (error) => {
      Swal.fire({ title: 'Gagal Menghapus ', text: error.message, icon: 'error', confirmButtonText: 'OK' });
    },
  });

  const deleteMutationPernikahan = useMutation({
    mutationFn: deletePernikahan,
    onSuccess: () => {
      queryClient.invalidateQueries(['dataPernikahan']);
      Swal.fire({ title: 'Berhasil Dihapus', icon: 'success', confirmButtonText: 'OK' });
    },
    onError: (error) => {
      Swal.fire({ title: 'Gagal Menghapus ', text: error.message, icon: 'error', confirmButtonText: 'OK' });
    },
  });
  const deleteMutationPemberkatanRumah = useMutation({
    mutationFn: deletePemberkatanRumah,
    onSuccess: () => {
      queryClient.invalidateQueries(['dataRumah']);
      Swal.fire({ title: 'Berhasil Dihapus', icon: 'success', confirmButtonText: 'OK' });
    },
    onError: (error) => {
      Swal.fire({ title: 'Gagal Menghapus ', text: error.message, icon: 'error', confirmButtonText: 'OK' });
    },
  });
  const deleteMutationPenyerahanAnak = useMutation({
    mutationFn: deletePenyerahanAnak,
    onSuccess: () => {
      queryClient.invalidateQueries(['dataAnak']);
      Swal.fire({ title: 'Berhasil Dihapus', icon: 'success', confirmButtonText: 'OK' });
    },
    onError: (error) => {
      Swal.fire({ title: 'Gagal Menghapus ', text: error.message, icon: 'error', confirmButtonText: 'OK' });
    },
  });


  


  const handleDeleteKartu = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data ini akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutationKartu.mutate(id);
      }
    });
  };
  
  const handleDeleteBaptism = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data ini akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutationBaptism.mutate(id);
      }
    });
  };
  const handleDeleteKonseling = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data ini akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutationKonseling.mutate(id);
      }
    });
  };
  const handleDeletePelayan = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data ini akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutationPelayan.mutate(id);
      }
    });
  };
  const handleDeletePernikahan = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data ini akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
      deleteMutationPernikahan.mutate(id);
      }
    });
  };
  const handleDeletePemberkatanRumah = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data ini akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
       deleteMutationPemberkatanRumah.mutate(id);
      }
    });
  };
  const handleDeletePenyerahanAnak = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data ini akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
      deleteMutationPenyerahanAnak.mutate(id);
      }
    });
  };
  const renderTableSection = (data, isLoading, error, columns, title) => {
    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress />
        </Box>
      );
    }
    if (error) {
      return <Typography color="error">Error loading {title} data: {error.message}</Typography>;
    }
    console.log('==============data======================');
    console.log(data);
    console.log('====================================');
    if (!data || data.length === 0) {
      return <Typography sx={{ textAlign: 'center', py: 2 }}>Data Kosong</Typography>;
    }
    return <DynamicTable columns={columns} data={data} />;
  };

  return (
    <div>
        <div className="mb-10">
        <h2>Kartu Jemaat</h2>
        {renderTableSection(dataKartuJemaat, loadingKartuJemaat, errorKartuJemaat, columnsKartuJemaat, "Kartu Jemaat")}
      </div>
    <div className="mb-10">
        <h2>Permohonan Baptisan</h2>
        {renderTableSection(dataBaptism, loadingBaptism, errorBaptism, columnsBaptism, "Permohonan Baptisan")}
      </div>
      <div className="mb-10">
        <h2>Permohonan Konseling</h2>
        {renderTableSection(dataKonseling, loadingKonseling, errorKonseling, columnsKonseling, "Permohonan Konseling")}
      </div>
      <div className="mb-10">
        <h2>Pendaftaran Pelayan</h2>
        {renderTableSection(dataPelayan, loadingPelayan, errorPelayan, columnsPelayan, "Pendaftaran Pelayan")}
      </div>
      <div className="mb-10">
        <h2>Pemberkatan Pernikahan</h2>
        {renderTableSection(dataPernikahan, loadingPernikahan, errorPernikahan, columnsPernikahan, "Pemberkatan Pernikahan")}
      </div>
      <div className="mb-10">
        <h2>Pemberkatan Rumah</h2>
        {renderTableSection(dataRumah, loadingRumah, errorRumah, columnsRumah, "Pemberkatan Rumah")}
      </div>
      <div className="mb-10">
        <h2>Penyerahan Anak</h2>
        {renderTableSection(dataAnak, loadingAnak, errorAnak, columnsAnak, "Penyerahan Anak")}
      </div>
    </div>
  );
}

export default Pastoral;