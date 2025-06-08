import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid, Box, Paper, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

function EditKesaksian() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    id: '', // Tambahkan id ke formData
    nama: '',
    isi: '',
    highlight: '',
    tag: '',
    image: null,
    url: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Ambil data kesaksian dari cache
  const dataKesaksian = queryClient.getQueryData(['dataKesaksian']);

  useEffect(() => {
    if (dataKesaksian) {
      // Perbaikan: Ambil id dari URL menggunakan window.location.pathname
      const parts = window.location.pathname.split('/');
      const id = parts[parts.length - 1];
      const kesaksian = dataKesaksian.find((item) => item.id === parseInt(id));
      if (kesaksian) {
        setFormData({
          id: kesaksian.id, // Set id di formData
          nama: kesaksian.nama,
          isi: kesaksian.isi,
          highlight: kesaksian.highlight,
          tag: kesaksian.tag,
          image: null,
          url: kesaksian.url,
        });
      }
    }
  }, [dataKesaksian]);

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
    data.append('id', formData.id); // Kirim ID di FormData
    data.append('nama', formData.nama);
    data.append('isi', formData.isi);
    data.append('highlight', formData.highlight);
    data.append('tag', formData.tag);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await fetch(`https://api.gppkcbn.org/cbn/v1/artikel/kesaksian/updateOneData`, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'Sukses',
          text: 'kesaksian berhasil diperbarui!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigate('/dashboard');
      } else {
        Swal.fire({
          title: 'Error',
          text: result.message || 'Gagal memperbarui kesaksian',
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

  if (!formData.nama && dataKesaksian) return <p>kesaksian tidak ditemukan.</p>;
  if (!dataKesaksian) return <p>Loading data...</p>;

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit kesaksian
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Judul kesaksian"
                name="nama"
                value={formData.nama}
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
                    label="Isi kesaksian (HTML)"
                    name="isi"
                    variant="outlined"
                    multiline
                    rows={6}
                    value={formData.isi}
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
                    Preview kesaksian
                  </Typography>

                  <div
                    style={{
                      border: '1px solid #ddd',
                      padding: '10px',
                      borderRadius: '5px',
                      backgroundColor: '#f9f9f9',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: formData.isi || '<p>Isi kesaksian Akan Ditampilkan di Sini</p>',
                    }}
                  ></div>
                </Paper>
              </Grid>
            </Grid>

            <Grid container spacing={3} style={{ marginTop: '50px' }}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="highlight"
                  name="highlight"
                  value={formData.highlight}
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

export default EditKesaksian;