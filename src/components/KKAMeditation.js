import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, Typography, Box, Button, CircularProgress } from '@mui/material';
import DynamicTable from './DynamicTable';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'full_name', label: 'Nama Lengkap' },
  { key: 'user_name', label: 'Nama Pengguna' },
  { key: 'contact_info', label: 'Kontak' },
  { key: 'description', label: 'Deskripsi' },
  { key: 'tanggal', label: 'Tanggal' },
];
const bahanColumns =[
  { key: 'JudulMateri', label: 'JudulMateri' },
  { key: 'tanggal', label: 'Tanggal' },
  { key: 'action', label: 'Actions' }

]

function KkaMeditation() {
  const fetchDataKKA = async () => {
    const response = await fetch(`https://api.gppkcbn.org/cbn/v1/service/doa/getAll`);
    const data = await response.json();
    return data.data; 
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['dataKKA'],
    queryFn: fetchDataKKA,
  });

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
            <Button variant="contained" color="primary">
              Upload File
            </Button>
          </Box>
        </CardContent>
        <CardContent>
          <Typography variant="h5" gutterBottom>
             Bahan KKA
          </Typography>
          {/* <DynamicTable columns={bahanColumns} data={data} /> */}

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            
          </Box>
        </CardContent>
       
      </Card>
      <Card>
      <CardContent>
          <Typography variant="h5" gutterBottom>
           Kesaksian KKA
          </Typography>
          {/* <DynamicTable columns={columns} data={data} /> */}

        </CardContent>
      </Card>
      {/* Table Section */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Table KKA
          </Typography>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">There was an error loading the data.</Typography>
          ) : (
            <DynamicTable columns={columns} data={data} />
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default KkaMeditation;