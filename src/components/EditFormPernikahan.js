import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid, Box, Paper, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query'; // Removed useQuery
import moment from 'moment'; // Import moment

function EditFormPernikahan() {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Local states for loading and error, as we're not using useQuery for initial fetch
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    // Detail Pernikahan
    tanggalPernikahan: '',
    jamPernikahan: '',
    tempatPernikahan: '',

    // Data Pria
    namaLengkapPria: '',
    tempatLahirPria: '',
    tanggalLahirPria: '',
    alamatPria: '',
    teleponPria: '',
    pekerjaanPria: '',
    AgamaPriaDahulu: '',
    GerejaPriaDahulu: '',
    NoKartuPria: '',
    PernikahanPertamaPria: '1', // Default '1' for RadioGroup
    JumlahAnakPria: 0,

    // Data Wanita
    namaLengkapWanita: '',
    tempatLahirWanita: '',
    tanggalLahirWanita: '',
    alamatWanita: '',
    teleponWanita: '',
    pekerjaanWanita: '',
    AgamaWanitaDahulu: '',
    GerejaWanitaDahulu: '',
    NoKartuWanita: '',
    PernikahanPertamaWanita: '1', // Default '1' for RadioGroup
    JumlahAnakWanita: 0,

    // Informasi Tambahan
    BergerejaSejak: '',
    ArtiLahirBaru: '',
    LamaPerkenalan: '',
    KomitmenSuci: '1', // Default '1' for RadioGroup
  });

  // Effect to populate form data from React Query cache
  useEffect(() => {
    const loadPernikahanData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get data from the cache using the queryKey 'dataPernikahan'
        const dataPernikahanList = queryClient.getQueryData(['dataPernikahan']);

        if (dataPernikahanList && id) {
          const pernikahan = dataPernikahanList.find(item => item.id === parseInt(id, 10)); // Ensure ID is parsed as integer
          if (pernikahan) {
            setFormData({
              tanggalPernikahan: pernikahan.tanggalPernikahan ? moment(pernikahan.tanggalPernikahan).format('YYYY-MM-DD') :'',
              jamPernikahan: pernikahan.jamPernikahan || '',
              tempatPernikahan: pernikahan.tempatPernikahan || '',
              namaLengkapPria: pernikahan.namaLengkapPria || '',
              tempatLahirPria: pernikahan.tempatLahirPria || '',
              tanggalLahirPria: pernikahan.tanggalLahirPria ? moment(pernikahan.tanggalLahirPria).format('YYYY-MM-DD') : '',
              alamatPria: pernikahan.alamatPria || '',
              teleponPria: pernikahan.teleponPria || '',
              pekerjaanPria: pernikahan.pekerjaanPria || '',
              AgamaPriaDahulu: pernikahan.agamaPriaDahulu || '',
              GerejaPriaDahulu: pernikahan.gerejaPriaDahulu || '',
              NoKartuPria: pernikahan.noKartuPria || '',
              PernikahanPertamaPria: String(pernikahan.pernikahanPertamaPria), // Convert to string for RadioGroup
              JumlahAnakPria: pernikahan.jumlahAnakPria || 0,
              namaLengkapWanita: pernikahan.namaLengkapWanita || '',
              tempatLahirWanita: pernikahan.tempatLahirWanita || '',
              tanggalLahirWanita: pernikahan.tanggalLahirWanita ? moment(pernikahan.tanggalLahirWanita).format('YYYY-MM-DD') :'',
              alamatWanita: pernikahan.alamatWanita || '',
              teleponWanita: pernikahan.teleponWanita || '',
              pekerjaanWanita: pernikahan.pekerjaanWanita || '',
              AgamaWanitaDahulu: pernikahan.agamaWanitaDahulu || '',
              GerejaWanitaDahulu: pernikahan.gerejaWanitaDahulu || '',
              NoKartuWanita: pernikahan.noKartuWanita || '',
              PernikahanPertamaWanita: String(pernikahan.pernikahanPertamaWanita), // Convert to string for RadioGroup
              JumlahAnakWanita: pernikahan.jumlahAnakWanita || 0,
              BergerejaSejak: pernikahan.bergerejaSejak || '',
              ArtiLahirBaru: pernikahan.artiLahirBaru || '',
              LamaPerkenalan: pernikahan.lamaPerkenalan || '',
              KomitmenSuci: String(pernikahan.komitmenSuci), // Convert to string for RadioGroup
            });
          } else {
            setError(new Error(`Data pernikahan dengan ID ${id} tidak ditemukan di cache.`));
          }
        } else if (!id) {
          setError(new Error("ID pernikahan tidak disediakan di URL."));
        } else {
          setError(new Error("Data pernikahan belum dimuat ke cache. Silakan kunjungi halaman daftar terlebih dahulu."));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadPernikahanData();
  }, [id, queryClient]); // Depend on id and queryClient

  // Handle input changes, including conditional logic for JumlahAnak
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'PernikahanPertamaPria') {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
        JumlahAnakPria: value === '1' ? 0 : prevData.JumlahAnakPria // Set to 0 if 'Ya'
      }));
    } else if (name === 'PernikahanPertamaWanita') {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
        JumlahAnakWanita: value === '1' ? 0 : prevData.JumlahAnakWanita // Set to 0 if 'Ya'
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Mutation for updating data
  const updatePernikahanMutation = useMutation({
    mutationFn: async (updatedData) => {
      const response = await axios.post('https://api.gppkcbn.org/cbn/v1/service/pernikahan/updateData', updatedData);
      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data pernikahan berhasil diperbarui.',
      });
      // Invalidate the query to refetch fresh data for the list
      queryClient.invalidateQueries(['dataPernikahan']);
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

    // Prepare data for backend, converting boolean strings to numbers (0 or 1)
    const dataToSend = {
      id: parseInt(id, 10), // Ensure ID is included and is a number
      ...formData,
      PernikahanPertamaPria: parseInt(formData.PernikahanPertamaPria, 10),
      PernikahanPertamaWanita: parseInt(formData.PernikahanPertamaWanita, 10),
      KomitmenSuci: parseInt(formData.KomitmenSuci, 10),
      JumlahAnakPria: formData.PernikahanPertamaPria === '1' ? 0 : parseInt(formData.JumlahAnakPria, 10) || 0,
      JumlahAnakWanita: formData.PernikahanPertamaWanita === '1' ? 0 : parseInt(formData.JumlahAnakWanita, 10) || 0,
    };

    updatePernikahanMutation.mutate(dataToSend);
  };

  // Render loading state
  if (loading) { // Using local loading state
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={80} />
      </Box>
    );
  }

  // Render error state
  if (error) { // Using local error state
    return (
      <Box sx={{ margin: 'auto', padding: 3 }}>
        <Alert severity="error">
          Error: {error.message}
        </Alert>
      </Box>
    );
  }

  // Render if no data found for the ID after loading
  if (!formData.namaLengkapPria && !loading) { // Check if formData is still empty after loading
    return (
      <Box sx={{ margin: 'auto', padding: 3 }}>
        <Alert severity="warning">
          Data pernikahan tidak ditemukan untuk ID ini.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Formulir Peneguhan Pernikahan
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Data Pria */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Data Pria
              </Typography>
              <TextField label="Nama Lengkap Pria" name="namaLengkapPria" value={formData.namaLengkapPria} onChange={handleInputChange} fullWidth required margin="normal" />
              <TextField label="Tempat Lahir Pria" name="tempatLahirPria" value={formData.tempatLahirPria} onChange={handleInputChange} fullWidth required margin="normal" />
              <TextField label="Tanggal Lahir Pria" name="tanggalLahirPria" type="date" value={formData.tanggalLahirPria} onChange={handleInputChange} InputLabelProps={{ shrink: true }} fullWidth required margin="normal" />
              <TextField label="Alamat Pria" name="alamatPria" value={formData.alamatPria} onChange={handleInputChange} fullWidth required margin="normal" />
              <TextField label="Telepon Pria" name="teleponPria" value={formData.teleponPria} onChange={handleInputChange} fullWidth required margin="normal" />
              <TextField label="Pekerjaan Pria" name="pekerjaanPria" value={formData.pekerjaanPria} onChange={handleInputChange} fullWidth required margin="normal" />
              <TextField label="Agama Pria Dahulu" name="AgamaPriaDahulu" value={formData.AgamaPriaDahulu} onChange={handleInputChange} fullWidth required margin="normal" />
              <TextField label="Gereja Pria Dahulu" name="GerejaPriaDahulu" value={formData.GerejaPriaDahulu} onChange={handleInputChange} fullWidth required margin="normal" />
              <TextField label="No. Kartu Pria" name="NoKartuPria" value={formData.NoKartuPria} onChange={handleInputChange} fullWidth required margin="normal" />

              <FormControl component="fieldset" margin="normal" fullWidth>
                <InputLabel component="legend" shrink>Pernikahan Pertama Pria?</InputLabel>
                <RadioGroup row name="PernikahanPertamaPria" value={formData.PernikahanPertamaPria} onChange={handleInputChange}>
                  <FormControlLabel value="1" control={<Radio />} label="Ya" />
                  <FormControlLabel value="0" control={<Radio />} label="Tidak" />
                </RadioGroup>
              </FormControl>
              {formData.PernikahanPertamaPria === '0' && (
                <TextField label="Jumlah Anak Pria (Jika Ada)" name="JumlahAnakPria" type="number" value={formData.JumlahAnakPria} onChange={handleInputChange} fullWidth margin="normal" />
              )}
            </Grid>

            {/* Data Wanita */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Data Wanita
              </Typography>
              <TextField label="Nama Lengkap Wanita" name="namaLengkapWanita" value={formData.namaLengkapWanita} onChange={handleInputChange} fullWidth required margin="normal" />
              <TextField label="Tempat Lahir Wanita" name="tempatLahirWanita" value={formData.tempatLahirWanita} onChange={handleInputChange} fullWidth required margin="normal" />
              <TextField label="Tanggal Lahir Wanita" name="tanggalLahirWanita" type="date" value={formData.tanggalLahirWanita} onChange={handleInputChange} InputLabelProps={{ shrink: true }} fullWidth required margin="normal" />
              <TextField label="Alamat Wanita" name="alamatWanita" value={formData.alamatWanita} onChange={handleInputChange} fullWidth required margin="normal" />
              <TextField label="Telepon Wanita" name="teleponWanita" value={formData.teleponWanita} onChange={handleInputChange} fullWidth required margin="normal" />
              <TextField label="Pekerjaan Wanita" name="pekerjaanWanita" value={formData.pekerjaanWanita} onChange={handleInputChange} fullWidth required margin="normal" />
              <TextField label="Agama Wanita Dahulu" name="AgamaWanitaDahulu" value={formData.AgamaWanitaDahulu} onChange={handleInputChange} fullWidth required margin="normal" />
              <TextField label="Gereja Wanita Dahulu" name="GerejaWanitaDahulu" value={formData.GerejaWanitaDahulu} onChange={handleInputChange} fullWidth required margin="normal" />
              <TextField label="No. Kartu Wanita" name="NoKartuWanita" value={formData.NoKartuWanita} onChange={handleInputChange} fullWidth required margin="normal" />

              <FormControl component="fieldset" margin="normal" fullWidth>
                <InputLabel component="legend" shrink>Pernikahan Pertama Wanita?</InputLabel>
                <RadioGroup row name="PernikahanPertamaWanita" value={formData.PernikahanPertamaWanita} onChange={handleInputChange}>
                  <FormControlLabel value="1" control={<Radio />} label="Ya" />
                  <FormControlLabel value="0" control={<Radio />} label="Tidak" />
                </RadioGroup>
              </FormControl>
              {formData.PernikahanPertamaWanita === '0' && (
                <TextField label="Jumlah Anak Wanita (Jika Ada)" name="JumlahAnakWanita" type="number" value={formData.JumlahAnakWanita} onChange={handleInputChange} fullWidth margin="normal" />
              )}
            </Grid>

            {/* Detail Pernikahan */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Detail Pernikahan
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField label="Tanggal Pernikahan" name="tanggalPernikahan" type="date" value={formData.tanggalPernikahan} onChange={handleInputChange} InputLabelProps={{ shrink: true }} fullWidth required margin="normal" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label="Jam Pernikahan" name="jamPernikahan" type="time" value={formData.jamPernikahan} onChange={handleInputChange} InputLabelProps={{ shrink: true }} fullWidth required margin="normal" />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Tempat Pernikahan" name="tempatPernikahan" value={formData.tempatPernikahan} onChange={handleInputChange} fullWidth required margin="normal" />
                </Grid>
              </Grid>
            </Grid>

            {/* Informasi Tambahan */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Informasi Tambahan
              </Typography>
              <TextField label="Bergereja Sejak" name="BergerejaSejak" value={formData.BergerejaSejak} onChange={handleInputChange} fullWidth required margin="normal" />
              <TextField label="Arti Lahir Baru" name="ArtiLahirBaru" value={formData.ArtiLahirBaru} onChange={handleInputChange} multiline rows={4} fullWidth required margin="normal" />
              <TextField label="Lama Perkenalan" name="LamaPerkenalan" value={formData.LamaPerkenalan} onChange={handleInputChange} fullWidth required margin="normal" />

              <FormControl component="fieldset" margin="normal" fullWidth>
                <Typography variant="subtitle1" component="legend" sx={{ mb: 1 }}>
                  Saudara mengakui di hadapan TUHAN bahwa Hubungan Saudara dengan calon teman hidup saudara selama ini SUCI (tidak pernah melakukan hubungan sex)
                </Typography>
                <RadioGroup row name="KomitmenSuci" value={formData.KomitmenSuci} onChange={handleInputChange}>
                  <FormControlLabel value="1" control={<Radio />} label="Ya" />
                  <FormControlLabel value="0" control={<Radio />} label="Tidak" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={updatePernikahanMutation.isLoading}>
                {updatePernikahanMutation.isLoading ? <CircularProgress size={24} /> : 'Simpan Perubahan'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default EditFormPernikahan;
