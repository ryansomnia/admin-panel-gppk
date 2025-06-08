import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Box, Paper, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';

function AddCabang() {
  const [formData, setFormData] = useState({
    namaCabang: '',
    pastor: '',
    address: '',
    img: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.namaCabang || !formData.pastor || !formData.address || !formData.img) {
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
      const data = new FormData();
      data.append('namaCabang', formData.namaCabang);
      data.append('pastor', formData.pastor);
      data.append('address', formData.address);
      data.append('img', formData.img); // 'img' should match the backend's expectation

      const response = await fetch('https://api.gppkcbn.org/cbn/v1/cabang/addCabang', {
        method: 'POST',
        body: data, // Send FormData, not JSON
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          title: 'Sukses',
          text: 'Data berhasil ditambahkan!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        setFormData({
          namaCabang: '',
          pastor: '',
          address: '',
          img: null,
        });
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
          Tambah Cabang CBN
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nama Cabang"
                name="namaCabang"
                value={formData.namaCabang}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Pastor"
                name="pastor"
                value={formData.pastor}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Alamat"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label" fullWidth disabled={isLoading}>
                Upload Gambar
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept="img/*"
                  disabled={isLoading} // Nonaktifkan input saat loading
                />
              </Button>
              {formData.img && (
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  Gambar: {formData.img.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Tambahkan Data'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default AddCabang;