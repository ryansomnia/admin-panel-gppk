import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditKka = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    leader: "",
    contact: "",
    day: "",
    time: "",
    area: "",
    image: null, // Menyimpan file gambar yang baru dipilih
  });
  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const kkaData = queryClient.getQueryData(["dataKKA"]);
  const kka = kkaData?.find((item) => item.id === parseInt(id));
  const [initialLoad, setInitialLoad] = useState(true); // Untuk menghindari race condition

  useEffect(() => {
    if (kka && initialLoad) {
      setFormData({
        id: kka.id || "",
        name: kka.name || "",
        category: kka.category || "",
        leader: kka.leader || "",
        contact: kka.contact || "",
        day: kka.day || "",
        time: kka.time || "",
        area: kka.area || "",
        image: null, // Reset image saat form diisi dari data yang ada
      });
      setPreviewImage(kka.image);
      setInitialLoad(false);
    } else if (!kka && kkaData && initialLoad) {
      Swal.fire({
        title: "Data Tidak Ditemukan",
        text: "Data KKA dengan ID tersebut tidak ditemukan.",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(() => navigate("/dashboard/kka"));
      setInitialLoad(false);
    }
  }, [kka, kkaData, id, navigate, initialLoad]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreviewImage(file ? URL.createObjectURL(file) : "");
  };

  const updateKkaMutation = useMutation({
    mutationFn: async (updatedData) => {
      setIsLoading(true);
      const data = new FormData();
      data.append("id", updatedData.id);
      data.append("name", updatedData.name);
      data.append("category", updatedData.category);
      data.append("leader", updatedData.leader);
      data.append("contact", updatedData.contact);
      data.append("day", updatedData.day);
      data.append("time", updatedData.time);
      data.append("area", updatedData.area);
    if (updatedData.image) {
        data.append("img", updatedData.image); // Ubah 'image' menjadi 'img'
      }

      const response = await fetch("https://api.gppkcbn.org/cbn/v1/kka/editOne", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      setIsLoading(false);
      if (!response.ok) {
        throw new Error(result?.message || "Gagal memperbarui kka");
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["dataKKA"]);
      Swal.fire({
        title: "Sukses",
        text: "KKA berhasil diperbarui!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => navigate("/dashboard/kka"));
    },
    onError: (error) => {
      Swal.fire({
        title: "Error",
        text: error.message || "Terjadi kesalahan saat memperbarui data",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateKkaMutation.mutate(formData);
  };

  if (!kka && kkaData) {
    return <Typography>Data KKA tidak ditemukan.</Typography>;
  }

  if (!kkaData) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Edit Data KKA
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nama KKA"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Kategori"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Ketua"
              name="leader"
              value={formData.leader}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Kontak Leader"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Hari"
              name="day"
              value={formData.day}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Jam"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Area"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ margin: "20px 0" }}
            />
            {previewImage && (
              <Box mt={2}>
                <Typography variant="subtitle1">Preview Gambar:</Typography>
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Box>
            )}
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Simpan Perubahan"}
          </Button>
          <Button onClick={() => navigate("/dashboard/kka")} sx={{ ml: 2 }}>
            Batal
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditKka;