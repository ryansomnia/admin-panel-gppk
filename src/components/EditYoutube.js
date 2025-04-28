import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid, Box, Paper, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

function EditYoutube() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        speaker: '',
        url: ''
      });
      const [isLoading, setIsLoading] = useState(false);
      const dataYoutube = queryClient.getQueryData(['dataLinkYoutube']);
      useEffect(() => {
        if (dataYoutube) {
          const parts = window.location.pathname.split('/');
          const id = parts[parts.length - 1];
          const data = dataYoutube.find((item) => item.id === parseInt(id));
          if (data) {
            setFormData({
                id: data.id,
              title: data.title,
              speaker: data.speaker,
              url: data.url
            });
          }
        }
      }, [dataYoutube]);
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      }; 

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        setIsLoading(true);
    
        const data = new FormData();
        data.append('id', formData.id);
        data.append('title', formData.title);
        data.append('speaker', formData.speaker); 
        data.append('url', formData.url); 

    
        try {
          const response = await fetch(`http://localhost:3013/cbn/v1/youtube/updateData`, {
            method: 'POST',
            body: data,
          });
    
          const result = await response.json();
    
          if (response.ok) {
            Swal.fire({
              title: 'Sukses',
              text: 'Youtube berhasil diperbarui!',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            navigate('/dashboard/youtube');
          } else {
            Swal.fire({
              title: 'Error',
              text: result.message || 'Gagal memperbarui Youtube',
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

      if (!formData.title && dataYoutube) return <p>Youtube tidak ditemukan.</p>;
      if (!dataYoutube) return <p>Loading data...</p>;

      return (
        <Box sx={{ padding: 4 }}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
              EditYoutube
            </Typography>
    
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Judul Materi"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    disabled={isLoading}
                  />
                </Grid>
    
                <Grid item xs={12}>
                  <TextField
                    label="Speaker"
                    name="speaker"
                    value={formData.speaker}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    disabled={isLoading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="URL"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    disabled={isLoading}
                  />
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
    
};

export default EditYoutube;