import React from 'react';
import { useQuery } from '@tanstack/react-query';

import DynamicTable from './DynamicTable';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'full_name', label: 'Nama Lengkap' },
  { key: 'user_name', label: 'Nama Pengguna' },
  { key: 'contact_info', label: 'Kontak' },
  { key: 'description', label: 'Deskripsi' },
  { key: 'tanggal', label: 'Tanggal' },
];
function JemaatData() {
  const fetchDoaData = async () => {
    const response = await fetch('http://localhost:3001/cbn/v1/service/doa/getAll');

    
    const data = await response.json();
 
    return data.data; // Mengambil array `data` dari response
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['doaRequests'],
    queryFn: fetchDoaData,
  });  if (isLoading) return <p>Loading data...</p>;
  if (error) return <p>There was an error loading the data.</p>;

  return (
    <div>
      <h2>Data Kartu Jemaat</h2>
      <div>
        <DynamicTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default JemaatData;