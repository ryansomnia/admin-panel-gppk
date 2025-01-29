import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DynamicTable from './DynamicTable';

// Tentukan kolom tabel sesuai struktur data API
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'full_name', label: 'Nama Lengkap' },
  { key: 'user_name', label: 'Nama Pengguna' },
  { key: 'contact_info', label: 'Kontak' },
  { key: 'description', label: 'Deskripsi' },
  { key: 'tanggal', label: 'Tanggal' },
];

function DoaRequests() {
  const fetchDoaData = async () => {
    const response = await fetch(`https://api.gppkcbn.org/cbn/v1/service/doa/getAll`);

    
    const data = await response.json();
    console.log('====================================');
    console.log(data.data);
    console.log('====================================');

    return data.data; // Mengambil array `data` dari response
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['doaRequests'],
    queryFn: fetchDoaData,
  });  if (isLoading) return <p>Loading data...</p>;
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
