import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid, Box, Paper, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import moment from 'moment'; // Import moment for date formatting

function EditJemaat() {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [loadingInitialData, setLoadingInitialData] = useState(true);
  const [errorInitialData, setErrorInitialData] = useState(null);

  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    tanggal_lahir: '', // Akan dalam format YYYY-MM-DD
    tempat_lahir: '',
    address: '',
    phone_number: '',
    email: '',
    pendidikan: '',
    pekerjaan: '',
    kka: '',
    statusNikah: '',
    kepercayaan_lama: '',
    tanggal_join: '', // Akan dalam format YYYY-MM-DD
    baptisan_air: 'tidak', // Default 'tidak'
    baptisan_roh: 'tidak', // Default 'tidak'
  });

  // Effect to populate form data from React Query cache
  useEffect(() => {
    const loadJemaatData = async () => {
      setLoadingInitialData(true);
      setErrorInitialData(null);
      try {
        // Get data from the cache using the queryKey 'dataJemaat'
        const dataJemaatList = queryClient.getQueryData(['dataJemaat']);

        if (dataJemaatList && id) {
          const jemaat = dataJemaatList.find(item => item.id === parseInt(id, 10));
          if (jemaat) {
            setFormData({
              full_name: jemaat.full_name || '',
              username: jemaat.username || '',
              // Format tanggal dari backend (yang mungkin ISO string) ke YYYY-MM-DD
              tanggal_lahir: jemaat.tanggal_lahir ? moment(jemaat.tanggal_lahir).format('YYYY-MM-DD') : '',
              tempat_lahir: jemaat.tempat_lahir || '',
              address: jemaat.address || '',
              phone_number: jemaat.phone_number || '',
              email: jemaat.email || '',
              pendidikan: jemaat.pendidikan || '',
              pekerjaan: jemaat.pekerjaan || '',
              kka: jemaat.kka || '',
              statusNikah: jemaat.statusNikah || '',
              kepercayaan_lama: jemaat.kepercayaan_lama || '',
              // Format tanggal dari backend ke YYYY-MM-DD
              tanggal_join: jemaat.tanggal_join ? moment(jemaat.tanggal_join).format('YYYY-MM-DD') : '',
              // Pastikan nilai radio adalah string 'ya' atau 'tidak'
              baptisan_air: jemaat.baptisan_air || 'tidak',
              baptisan_roh: jemaat.baptisan_roh || 'tidak',
            });
          } else {
            setErrorInitialData(new Error(`Data jemaat dengan ID ${id} tidak ditemukan di cache.`));
          }
        } else if (!id) {
          setErrorInitialData(new Error("ID jemaat tidak disediakan di URL."));
        } else {
          setErrorInitialData(new Error("Data jemaat belum dimuat ke cache. Silakan kunjungi halaman daftar jemaat terlebih dahulu."));
        }
      } catch (err) {
        setErrorInitialData(err);
      } finally {
        setLoadingInitialData(false);
      }
    };

    loadJemaatData();
  }, [id, queryClient]); // Depend on id and queryClient

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Mutation for updating data
  const updateJemaatMutation = useMutation({
    mutationFn: async (updatedData) => {
      // Backend expects 'YYYY-MM-DD' for DATE fields, which is already handled by type="date"
      const response = await axios.post('https://api.gppkcbn.org/cbn/v1/service/jemaat/updatePersonalData', updatedData);
      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data pribadi jemaat berhasil diperbarui.',
      });
      // Invalidate the query to refetch fresh data for the list
      queryClient.invalidateQueries(['dataJemaat']); // Assuming your list query key is 'dataJemaat'
      // Optionally navigate back to a list or detail page
      navigate('/dashboard/pastoral'); // Adjust this path as needed
    },
    onError: (error) => {
      console.error('Error updating data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: error.response?.data?.message || 'Gagal memperbarui data. Silakan coba lagi.',
      });
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data for backend, including the ID
    const dataToSend = {
      id: parseInt(id, 10), // Ensure ID is included and is a number
      ...formData,
      // Tanggal_lahir dan tanggal_join sudah dalam format YYYY-MM-DD dari input type="date"
      // baptisan_air dan baptisan_roh sudah dalam string 'ya'/'tidak' dari radio group
    };

    updateJemaatMutation.mutate(dataToSend);
  };

  // Render loading state for initial data
  if (loadingInitialData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={80} />
      </Box>
    );
  }

  // Render error state for initial data
  if (errorInitialData) {
    return (
      <Box sx={{ margin: 'auto', padding: 3 }}>
        <Alert severity="error">
          Error: {errorInitialData.message}
        </Alert>
      </Box>
    );
  }

  // Render if no data found for the ID after loading
  if (!formData.full_name && !loadingInitialData) {
    return (
      <Box sx={{ margin: 'auto', padding: 3 }}>
        <Alert severity="warning">
          Data jemaat tidak ditemukan untuk ID ini.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Data Pribadi Jemaat
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField label="Nama Lengkap" name="full_name" value={formData.full_name} onChange={handleInputChange} fullWidth required margin="normal" />
              <TextField label="Username" name="username" value={formData.username} onChange={handleInputChange} fullWidth required margin="normal" />
              <TextField label="Tempat Lahir" name="tempat_lahir" value={formData.tempat_lahir} onChange={handleInputChange} fullWidth required margin="normal" />
              <TextField label="Tanggal Lahir" name="tanggal_lahir" type="date" value={formData.tanggal_lahir} onChange={handleInputChange} InputLabelProps={{ shrink: true }} fullWidth required margin="normal" />
              <TextField label="Alamat" name="address" value={formData.address} onChange={handleInputChange} fullWidth required margin="normal" multiline rows={3} />
              <TextField label="Nomor Telepon" name="phone_number" value={formData.phone_number} onChange={handleInputChange} fullWidth required margin="normal" />
              <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} fullWidth required margin="normal" />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField label="Pendidikan Terakhir" name="pendidikan" value={formData.pendidikan} onChange={handleInputChange} fullWidth margin="normal" />
              <TextField label="Pekerjaan" name="pekerjaan" value={formData.pekerjaan} onChange={handleInputChange} fullWidth margin="normal" />
              <TextField label="KKA" name="kka" value={formData.kka} onChange={handleInputChange} fullWidth margin="normal" />
              <TextField label="Status Nikah" name="statusNikah" value={formData.statusNikah} onChange={handleInputChange} fullWidth margin="normal" />
              <TextField label="Kepercayaan Lama" name="kepercayaan_lama" value={formData.kepercayaan_lama} onChange={handleInputChange} fullWidth margin="normal" />
              <TextField label="Tanggal Bergabung" name="tanggal_join" type="date" value={formData.tanggal_join} onChange={handleInputChange} InputLabelProps={{ shrink: true }} fullWidth required margin="normal" />
              
              <FormControl component="fieldset" margin="normal" fullWidth>
                <InputLabel component="legend" shrink>Baptisan Air?</InputLabel>
                <RadioGroup row name="baptisan_air" value={formData.baptisan_air} onChange={handleInputChange}>
                  <FormControlLabel value="ya" control={<Radio />} label="Ya" />
                  <FormControlLabel value="tidak" control={<Radio />} label="Tidak" />
                </RadioGroup>
              </FormControl>

              <FormControl component="fieldset" margin="normal" fullWidth>
                <InputLabel component="legend" shrink>Baptisan Roh?</InputLabel>
                <RadioGroup row name="baptisan_roh" value={formData.baptisan_roh} onChange={handleInputChange}>
                  <FormControlLabel value="ya" control={<Radio />} label="Ya" />
                  <FormControlLabel value="tidak" control={<Radio />} label="Tidak" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={updateJemaatMutation.isLoading}>
                {updateJemaatMutation.isLoading ? <CircularProgress size={24} /> : 'Simpan Perubahan'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default EditJemaat;
