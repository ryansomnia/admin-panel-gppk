import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid, Box, Paper, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

function EditArtikel() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    idArtikel: '', // Tambahkan idArtikel ke formData
    judulArtikel: '',
    isiArtikel: '',
    kategori: '',
    tag: '',
    image: null,
    url: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Ambil data artikel dari cache
  const artikelData = queryClient.getQueryData(['artikelData']);

  useEffect(() => {
    if (artikelData) {
      // Perbaikan: Ambil idArtikel dari URL menggunakan window.location.pathname
      const parts = window.location.pathname.split('/');
      const id = parts[parts.length - 1];
      const artikel = artikelData.find((item) => item.idArtikel === parseInt(id));
      if (artikel) {
        setFormData({
          idArtikel: artikel.idArtikel, // Set idArtikel di formData
          judulArtikel: artikel.title,
          isiArtikel: artikel.content,
          kategori: artikel.kategori,
          tag: artikel.tag,
          image: null,
          url: artikel.url,
        });
      }
    }
  }, [artikelData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const data = new FormData();
    data.append('id', formData.idArtikel); // Kirim ID di FormData
    data.append('judulArtikel', formData.judulArtikel);
    data.append('isiArtikel', formData.isiArtikel);
    data.append('kategori', formData.kategori);
    data.append('tag', formData.tag);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await fetch(`https://api.gppkcbn.org/cbn/v1/artikel/updateOneData`, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'Sukses',
          text: 'Artikel berhasil diperbarui!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigate('/dashboard/artikel');
      } else {
        Swal.fire({
          title: 'Error',
          text: result.message || 'Gagal memperbarui artikel',
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

  if (!formData.judulArtikel && artikelData) return <p>Artikel tidak ditemukan.</p>;
  if (!artikelData) return <p>Loading data...</p>;

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Artikel
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Judul Artikel"
                name="judulArtikel"
                value={formData.judulArtikel}
                onChange={handleInputChange}
                fullWidth
                required
                disabled={isLoading}
              />
            </Grid>

            <Grid container spacing={3} style={{ marginTop: '0px' }}>
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
                    disabled={isLoading}
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

            <Grid container spacing={3} style={{ marginTop: '50px' }}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Kategori"
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" component="label" fullWidth disabled={isLoading}>
                Upload Gambar
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept="image/*"
                  disabled={isLoading}
                />
              </Button>
              {formData.image ? (
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  Gambar: {formData.image.name}
                </Typography>
              ) : formData.url && (
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  Gambar: {formData.url.split('/').pop()}
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

export default EditArtikel;