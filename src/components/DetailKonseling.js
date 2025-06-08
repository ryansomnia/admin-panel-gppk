import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box, CircularProgress, Alert } from '@mui/material';
import { Card as MuiCard, CardContent as MuiCardContent } from '@mui/material';
import { Badge as MuiBadge } from '@mui/material';
import { Divider } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const DetailKonseling = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [konselingData, setKonselingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataKonselingList = queryClient.getQueryData(['dataKonseling']);
        if (dataKonselingList) {
          const data = dataKonselingList.find(item => item.id === parseInt(id));
          if (data) {
            setKonselingData(data);
          } else {
            setError(new Error(`Konseling data with ID ${id} not found`));
          }
        } else {
          setError(new Error(`Konseling data is not available.`));
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

  if (!konselingData) {
    return (
      <Box sx={{ margin: 'auto', padding: 3 }}>
        <Alert severity="warning">
          No konseling data available.
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
            Detail Konseling
          </Typography>
          <Divider className="bg-gray-200" />
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 uppercase tracking-wider"
              >
                Jenis Konsultasi:
              </Typography>
              <MuiBadge
                color="primary"
                className="bg-blue-100/80 text-blue-800 border-blue-300/50"
              >
                {konselingData.jenisKonsultasi}
              </MuiBadge>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 uppercase tracking-wider"
              >
                Nama Lengkap:
              </Typography>
              <Typography className="text-gray-900 font-medium text-lg">
                {konselingData.fullName}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 uppercase tracking-wider"
              >
                Tanggal Lahir:
              </Typography>
              <Typography className="text-gray-900">
                {formatDate(konselingData.tanggalLahir)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 uppercase tracking-wider"
              >
                Jenis Kelamin:
              </Typography>
              <Typography className="text-gray-900">
                {konselingData.sex}
                </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 uppercase tracking-wider"
              >
                Status Pernikahan:
              </Typography>
              <Typography className="text-gray-900">
                {konselingData.statusPernikahan}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 uppercase tracking-wider"
              >
                Nomor Handphone:
              </Typography>
              <Typography className="text-gray-900">
                {konselingData.noHP}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 uppercase tracking-wider"
              >
                Alamat:
              </Typography>
              <Typography className="text-gray-900">
                {konselingData.alamat}
              </Typography>
            </Grid>
             <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 uppercase tracking-wider"
              >
                Isi Konsultasi:
              </Typography>
              <Typography className="text-gray-900">
                {konselingData.isi}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 uppercase tracking-wider"
              >
                Tanggal Input:
              </Typography>
              <Typography className="text-gray-900">
                {formatDate(konselingData.dateInsert)}
              </Typography>
            </Grid>
          </Grid>
        </MuiCardContent>
      </MuiCard>
    </Box>
  );
};

export default DetailKonseling;
