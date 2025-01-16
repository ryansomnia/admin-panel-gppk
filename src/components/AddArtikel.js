import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Box, Paper } from '@mui/material';
import Swal from 'sweetalert2';

function AddArtikel() {
  const [formData, setFormData] = useState({
    judulArtikel: '',
    isiArtikel: '',
    kategori: '',
    tag: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!formData.judulArtikel || !formData.isiArtikel || !formData.kategori || !formData.tag || !formData.image) {
      Swal.fire({
        title: 'Error',
        text: 'Semua field wajib diisi!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Tambah logika pengiriman data ke backend
    console.log('Data artikel:', formData);

    Swal.fire({
      title: 'Sukses',
      text: 'Artikel berhasil ditambahkan!',
      icon: 'success',
      confirmButtonText: 'OK',
    });

    // Reset form setelah submit
    setFormData({
      judulArtikel: '',
      isiArtikel: '',
      kategori: '',
      tag: '',
      image: null,
    });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tambah Artikel Baru
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Judul Artikel */}
            <Grid item xs={12}>
              <TextField
                label="Judul Artikel"
                name="judulArtikel"
                value={formData.judulArtikel}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>

            {/* Isi Artikel (Kiri) dan Preview Artikel (Kanan) */}
            <Grid container spacing={3} style={{marginTop:'0px'}}>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                  <TextField
                    fullWidth
                    label="Isi Artikel (HTML)"
                    name="isiArtikel"
                    variant="outlined"
                    multiline
                    rows={6}
                    value={formData.isiArtikel}
                    onChange={handleInputChange}
                    required
                    style={{ marginBottom: '20px' }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} style={{ padding: '20px', minHeight: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Preview Artikel
                  </Typography>
                 
                  <div
                    style={{
                      border: '1px solid #ddd',
                      padding: '10px',
                      borderRadius: '5px',
                      backgroundColor: '#f9f9f9',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: formData.isiArtikel || '<p>Isi Artikel Akan Ditampilkan di Sini</p>',
                    }}
                  ></div>
                </Paper>
              </Grid>
            </Grid>

            {/* Kategori (Kiri) dan Tag (Kanan) */}
            <Grid container spacing={3} style={{marginTop:'50px'}}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Kategori"
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Tag"
                  name="tag"
                  value={formData.tag}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            {/* Tombol Upload Gambar */}
            <Grid item xs={12}>
              <Button variant="contained" component="label" fullWidth>
                Upload Gambar
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </Button>
              {formData.image && (
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  Gambar: {formData.image.name}
                </Typography>
              )}
            </Grid>

            {/* Tombol Submit */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Tambah Artikel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default AddArtikel;
