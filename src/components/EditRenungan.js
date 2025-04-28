import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid, Box, Paper, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

function EditRenungan() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    idMateri: '',
    judulMateri: '',
    file: null,
    status: '', // Status akan menyimpan 1 atau 0
    url: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const dataRenunganKKA = queryClient.getQueryData(['dataRenunganKKA']);

  useEffect(() => {
    if (dataRenunganKKA) {
      const parts = window.location.pathname.split('/');
      const id = parts[parts.length - 1];
      const data = dataRenunganKKA.find((item) => item.idMateri === parseInt(id));
      if (data) {
        setFormData({
          idMateri: data.idMateri,
          judulMateri: data.judulMateri,
          file: null,
          status: data.status === 'Aktif' ? 1 : 0, // Konversi status ke 1 atau 0
          url: data.url
        });
      }
    }
  }, [dataRenunganKKA]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const data = new FormData();
    data.append('id', formData.idMateri);
    data.append('judulMateri', formData.judulMateri);
    data.append('status', formData.status); // Kirim status (1 atau 0)
    if (formData.file) {
      data.append('file', formData.file);
    }

    try {
      const response = await fetch(`http://localhost:3013/cbn/v1/artikel/updateOneRenunganData`, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'Sukses',
          text: 'Bahan KKA berhasil diperbarui!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigate('/dashboard/kka');
      } else {
        Swal.fire({
          title: 'Error',
          text: result.message || 'Gagal memperbarui Bahan KKA',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Terjadi kesalahan saat mengirim data',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!formData.judulMateri && dataRenunganKKA) return <p>Bahan KKA tidak ditemukan.</p>;
  if (!dataRenunganKKA) return <p>Loading data...</p>;

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Bahan KKA
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Judul Materi"
                name="judulMateri"
                value={formData.judulMateri}
                onChange={handleInputChange}
                fullWidth
                required
                disabled={isLoading}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  name="status"
                  value={formData.status}
                  label="Status"
                  onChange={handleInputChange}
                  disabled={isLoading}
                >
                  <MenuItem value={1}>Aktif</MenuItem>
                  <MenuItem value={0}>Pasif</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" component="label" fullWidth disabled={isLoading}>
                Upload File
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept=".docx,.pdf,.doc"
                  disabled={isLoading}
                />
              </Button>
              {formData.file ? (
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  File: {formData.file.name}
                </Typography>
              ) : formData.url && (
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  File: {formData.url.split('/').pop()}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              {isLoading ? (
                <Box display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              ) : (
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Simpan Perubahan
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default EditRenungan;