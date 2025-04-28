import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Box, Paper, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';

function AddYoutube() {
  const [formData, setFormData] = useState({
    title: '',
    speaker: '',
    url: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.speaker || !formData.url) {
      Swal.fire({
        title: 'Error',
        text: 'Semua field wajib diisi!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3013/cbn/v1/youtube/addData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          title: 'Sukses',
          text: 'Data berhasil ditambahkan!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        setFormData({ title: '', speaker: '', url: '' });
      } else {
        Swal.fire({
          title: 'Error',
          text: result.message || 'Gagal menambahkan data',
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
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Tambah Video Youtube
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Judul Video"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Pembicara"
                name="speaker"
                value={formData.speaker}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL Youtube"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Tambahkan Video'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default AddYoutube;
