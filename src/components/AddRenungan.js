import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Box, Paper, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';

function AddRenungan() {
  const [formData, setFormData] = useState({
    judulMateri: '',
    file: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.judulMateri || !formData.file) {
      Swal.fire({
        title: 'Error',
        text: 'Judul Materi dan File wajib diisi!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const data = new FormData();
    data.append('judulMateri', formData.judulMateri);
    data.append('file', formData.file);

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3013/cbn/v1/artikel/uploadbahanKKA', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'Sukses',
          text: 'Bahan KKA berhasil diunggah!',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        setFormData({
          judulMateri: '',
          file: null,
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: result.message || 'Gagal mengunggah Bahan KKA',
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

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Unggah Bahan KKA Baru
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
              {formData.file && (
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  File: {formData.file.name}
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
                  Unggah Bahan KKA
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default AddRenungan;