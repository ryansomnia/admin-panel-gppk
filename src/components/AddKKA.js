import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const AddKka = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [leader, setLeader] = useState('');
  const [contact, setContact] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [area, setArea] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const addKkaMutation = useMutation({
    mutationFn: async (newKkaData) => {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', newKkaData.name);
      formData.append('category', newKkaData.category);
      formData.append('leader', newKkaData.leader);
      formData.append('contact', newKkaData.contact);
      formData.append('day', newKkaData.day);
      formData.append('time', newKkaData.time);
      formData.append('area', newKkaData.area);
      if (newKkaData.image) {
        formData.append('img', newKkaData.image);
      }

      const response = await fetch('https://api.gppkcbn.org/cbn/v1/kka/addOne', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Gagal menambahkan KKA');
      }
      setLoading(false);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['dataKKA']);
      Swal.fire({
        title: 'Berhasil!',
        text: 'Data KKA berhasil ditambahkan.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/dashboard/kka'); // Redirect ke halaman KKA setelah berhasil
      });
    },
    onError: (error) => {
      setLoading(false);
      Swal.fire({
        title: 'Gagal!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    },
  });

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addKkaMutation.mutate({ name, category, leader, contact, day, time, area, image });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Tambah Data KKA
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nama KKA"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Kategori"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Ketua"
              value={leader}
              onChange={(e) => setLeader(e.target.value)}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Kontak Leader"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Hari"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Jam"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ margin: '20px 0' }}
              required
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Simpan'}
          </Button>
          <Button onClick={() => navigate('/dashboard/kka')} sx={{ ml: 2 }}>
            Batal
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddKka;