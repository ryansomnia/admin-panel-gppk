import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box, CircularProgress, Alert } from '@mui/material';
import { Card as MuiCard, CardContent as MuiCardContent } from '@mui/material';
import { Badge as MuiBadge } from '@mui/material';
import { Divider } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const DetailKartu = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [kartuJemaatData, setkartuJemaatData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataKartuJemaatList = queryClient.getQueryData(['dataKartuJemaat']);
        if (dataKartuJemaatList) {
          const data = dataKartuJemaatList.find(item => item.id === parseInt(id));
          if (data) {
            setkartuJemaatData(data);
          } else {
            setError(new Error(`dataKartuJemaat data with ID ${id} not found`));
          }
        } else {
          setError(new Error(`dataKartuJemaat data is not available.`));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    } else {
      setLoading(false);
      setError(new Error("ID is not provided"));
    }
  }, [id, queryClient]);


  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (err) {
      console.error("Error formatting date", err);
      return "Invalid Date";
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={80} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ margin: 'auto', padding: 3 }}>
        <Alert severity="error">
          Error: {error.message}
        </Alert>
      </Box>
    );
  }

  if (!kartuJemaatData) {
    return (
      <Box sx={{ margin: 'auto', padding: 3 }}>
        <Alert severity="warning">
          No Kartu data available.
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: 'auto',
        padding: 4,
      }}
    >
      <MuiCard
        className="shadow-xl border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl"
      >
        <MuiCardContent className="p-6 space-y-8">
          <Typography
            variant="h2"
            gutterBottom
            align="center"
            className="text-gray-900 font-extrabold tracking-tight"
          >
            Detail Kartu
          </Typography>
          <Divider className="bg-gray-200" />
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 uppercase tracking-wider"
              >
                Nama Lengkap:
              </Typography>
              <Typography
              
                variant="h5" className="text-gray-900 font-medium text-lg">
                {kartuJemaatData.full_name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 uppercase tracking-wider"
              >
               No Kartu:
              </Typography>
              <Typography  variant="h5" className="text-gray-900 font-medium text-lg">
                {kartuJemaatData.id}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 uppercase tracking-wider"
              >
                Tanggal Lahir:
              </Typography>
              <Typography  variant="h5" className="text-gray-900">
                {formatDate(kartuJemaatData.tanggal_lahir)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 uppercase tracking-wider"
              >
                Tempat Lahir:
              </Typography>
              <Typography  variant="h5" className="text-gray-900">
                {kartuJemaatData.tempat_lahir}
                </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 uppercase tracking-wider"
              >
                Alamat:
              </Typography>
              <Typography   variant="h5" className="text-gray-900">
                {kartuJemaatData.address}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 uppercase tracking-wider"
              >
                Nomor Handphone / Email:
              </Typography>
              <Typography   variant="h5" className="text-gray-900">
                {kartuJemaatData.phone_number} / {kartuJemaatData.email}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 uppercase tracking-wider"
              >
                Pendidikan Terakhir: 
              </Typography>
              <Typography  variant="h5" className="text-gray-900">
                {kartuJemaatData.pendidikan}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 uppercase tracking-wider"
              >
               Pekerjaan:
              </Typography>
              <Typography  variant="h5" className="text-gray-900">
                {kartuJemaatData.pekerjaan}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 uppercase tracking-wider"
              >
                Kepercayaan Lama:
              </Typography>
              <Typography  variant="h5" className="text-gray-900">
                {kartuJemaatData.kepercayaan_lama}
              </Typography>
            </Grid>
             <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 uppercase tracking-wider"
              >
                Status Nikah:
              </Typography>
              <Typography  variant="h5" className="text-gray-900">
                {kartuJemaatData.statusNikah}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 uppercase tracking-wider"
              >
                Tanggal Input:
              </Typography>
              <Typography  variant="h5" className="text-gray-900">
                {formatDate(kartuJemaatData.tanggal_join)}
              </Typography>
            </Grid>
          </Grid>
        </MuiCardContent>
      </MuiCard>
    </Box>
  );
};

export default DetailKartu;
