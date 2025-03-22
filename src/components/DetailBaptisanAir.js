import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { Button, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { PDFDownloadLink, Image, Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import kopImage from '../images/kopgppk.png'; // Impor gambar kop

Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/v20/oYpQySZ43eM7RG0YtEemzH0.ttf' },
    { src: 'https://fonts.gstatic.com/s/helvetica/v20/oYpQySZ43eM7RG0YtEemzH0.ttf', fontWeight: 'bold' },
  ],
});
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  body:{
    lineHeight: 1.6,
    margin: 0,
    padding: '20px'
  },
  container:{
    maxWidth: '800px',
    margin: '0 auto'
  },

  formTitle: {
    textAlign: 'center',
    marginBottom: 0, // Sesuaikan margin sesuai kebutuhan
  },
  formSection: {
    marginBottom: 0, // Sesuaikan margin sesuai kebutuhan
    paddingVertical: 2, // Tambahkan padding vertikal jika perlu

  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0, // atau nilai yang lebih kecil seperti 2 atau 3

  },
  text: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    marginBottom: 0, // atau nilai yang lebih kecil seperti 2 atau 3
padding:0
  },
  // header: {
  //   fontSize: 18,
  //   marginBottom: 10,
  //   textAlign: 'center',
  // },
  // subHeader: {
  //   fontSize: 14,
  //   marginBottom: 10,
  //   textAlign: 'center',
  // },
  // statement: {
  //   fontSize: 12,
  //   marginBottom: 20,
  //   textAlign: 'center',
  //   fontStyle: 'italic',
  // },
  // signature: {
  //   marginTop: 20,
  //   textAlign: 'center',
  // },
});

function DetailBaptisanAir() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    namaLengkap: '',
    tempatLahir: '',
    tanggalLahir: '',
    alamat: '',
    noHP: '',
    pendidikanTerakhir: '',
    pekerjaan: '',
    kka: '',
    status: '',
    tanggalMenikah: '',
    kepercayaanLama: '',
    jumlahKeluarga: '',
    keluarga: [],
    pernyataan: false,
  });

  const { data: dataBaptism, isLoading, error } = useQuery({
    queryKey: ['dataBaptism'],
    // queryFn dapat ditambahkan jika Anda mengambil data dari API di sini
  });

  useEffect(() => {
    if (dataBaptism && id) {
      const baptism = dataBaptism.find((item) => item.id === parseInt(id));
      if (baptism) {
        setFormData({
          namaLengkap: baptism.NamaLengkap || '',
          tempatLahir: baptism.TempatLahir || '',
          tanggalLahir: baptism.TanggalLahir || '',
          alamat: baptism.Alamat || '',
          noHP: baptism.NoHP || '',
          pendidikanTerakhir: baptism.PendidikanTerakhir || '',
          pekerjaan: baptism.Pekerjaan || '',
          kka: baptism.KKA || '',
          status: baptism.StatusPernikahan || '',
          tanggalMenikah: baptism.TanggalMenikah || '',
          kepercayaanLama: baptism.KepercayaanLama || '',
          jumlahKeluarga: baptism.JumlahKeluarga || '',
          keluarga: baptism.Keluarga || [],
          pernyataan: baptism.Pernyataan || false,
        });
      }
    }
  }, [dataBaptism, id]);

  if (isLoading) return <CircularProgress />;
  // if (error) return <Typography color="error">Error loading data.</Typography>;
  if (!dataBaptism) return <Typography>Data not found.</Typography>;

  const MyDocument = (
    <Document>
      <Page style={styles.page}>
        <View style={styles.body}>
          <View style={styles.container}></View>
          <Image src="/images/kopgppk.png" style={styles.logo} />

  <View style={styles.formSection}>
    <View style={styles.formRow}>
      <Text style={styles.text}>Nama Lengkap: {formData.namaLengkap}</Text>
     </View>
     <View style={styles.formRow}>
      <Text style={styles.text}>TTL: {formData.tempatLahir}, { moment(formData.tanggalLahir).format('DD-MM-YYYY') }</Text>
     </View>
     <View style={styles.formRow}>
      <Text style={styles.text}>Nomor Handphone: {formData.noHP}</Text>
     </View>
     <View style={styles.formRow}>
      <Text style={styles.text}>Alamat: {formData.alamat}</Text>
     </View>
     <View style={styles.formRow}>
      <Text style={styles.text}>Pendidikan Terakhir: {formData.pendidikanTerakhir}</Text>
     </View>
     <View style={styles.formRow}>
      <Text style={styles.text}>Pekerjaan: {formData.pekerjaan}</Text>
     </View>
     <View style={styles.formRow}>
      <Text style={styles.text}>KKA: {formData.kka}</Text>
     </View>
     <View style={styles.formRow}>
      <Text style={styles.text}>Status: {formData.status}</Text>
     </View>
     <View style={styles.formRow}>
      <Text style={styles.text}>Kepercayaan Lama: {formData.kepercayaanLama}</Text>
     </View>
  </View>



        
        </View>

{/*        
        <View style={styles.section}>
          <Text style={styles.text}><strong>Nama Lengkap:</strong> {formData.namaLengkap}</Text>
          <Text style={styles.text}><strong>Tempat/Tanggal Lahir:</strong> {formData.tempatLahir}, {moment(formData.tanggalLahir).format('DD-MM-YYYY')}</Text>
          <Text style={styles.text}><strong>No Telp/HP:</strong> {formData.noHP}</Text>
          <Text style={styles.text}><strong>Alamat Rumah:</strong> {formData.alamat}</Text>
          <Text style={styles.text}><strong>Jenis Kelamin:</strong> {formData.jenisKelamin}</Text>
          <Text style={styles.text}><strong>Status Pernikahan:</strong> {formData.status}</Text>
          <Text style={styles.text}><strong>Pekerjaan:</strong> {formData.pekerjaan}</Text>
        </View>
        <View style={styles.signature}>
          <Text style={styles.text}>Saya yang bertanda tangan di bawah ini menyatakan bahwa saya percaya kepada TUHAN YESUS KRISTUS untuk pengampunan dosa-dosa saya dan menerima-Nya sebagai Tuhan dan Juruselamat pribadi saya.</Text>
          <Text style={styles.text}><strong>Nama Lengkap:</strong> {formData.namaLengkap}</Text>
          <Text style={styles.text}><strong>Tanggal:</strong> {moment().format('DD-MM-YYYY')}</Text>
          <Text style={styles.text}><strong>Tanda Tangan:</strong> ______________________</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}><strong>Dibaptiskan oleh:</strong> {formData.dibaptiskanOleh}</Text>
          <Text style={styles.text}><strong>Tanggal Baptisan:</strong> {formData.tanggalBaptisan}</Text>
          <Text style={styles.text}><strong>Tempat Baptisan:</strong> {formData.tempatBaptisan}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}><strong>Catatan Penggembalaan:</strong> {formData.catatanPenggembalaan}</Text>
        </View>  */}
      </Page>
    </Document>
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Detail Formulir Baptisan Air
        </Typography>
       {/* Bagian Formulir (sesuaikan dengan data Anda) */}
       <div className="mb-4">
       <div className="w-full mb-4"> {/* Parent div dengan lebar penuh */}
                    <img src={kopImage} alt="Kop GPPK" className="w-2 h-auto object-contain" />
                </div>
          <div className="flex items-center mb-2">
            <label className="mr-2">Nama Lengkap:</label>
            <div className="flex-grow border-b border-gray-400 ml-2"></div>
          </div>
          <div className="flex items-center mb-2">
            <label className="mr-2">Tempat/Tgl Lahir:</label>
            <div className="flex-grow border-b border-gray-400 ml-2"></div>
          </div>
          <div className="flex items-center mb-2">
            <label className="mr-2">Alamat/No.HP:</label>
            <div className="flex-grow border-b border-gray-400 ml-2"></div>
          </div>
          <div className="flex items-center mb-2">
            <label className="mr-2">Pendidikan Terakhir:</label>
            <div className="flex-grow border-b border-gray-400 ml-2"></div>
          </div>
          <div className="flex items-center mb-2">
            <label className="mr-2">Pekerjaan:</label>
            <div className="flex-grow border-b border-gray-400 ml-2"></div>
          </div>
          <div className="flex items-center mb-2">
            <label className="mr-2">KKA:</label>
            <div className="flex-grow border-b border-gray-400 ml-2"></div>
          </div>
          <div className="flex items-center mb-2">
            <label className="mr-2">Status:</label>
            <label className="mr-2"><input type="radio" name="status" value="menikah" className="mr-1" /> Menikah</label>
            <label className="mr-2"><input type="radio" name="status" value="belum" className="mr-1" /> Belum</label>
            <label className="mr-2">Tgl:</label>
            <div className="w-12 border-b border-gray-400 ml-2"></div>
          </div>
          <div className="flex items-center mb-2">
            <label className="mr-2">Kepercayaan Lama:</label>
            <label className="mr-2"><input type="radio" name="kepercayaan" value="islam" className="mr-1" /> 1. Islam</label>
            <label className="mr-2"><input type="radio" name="kepercayaan" value="hindu" className="mr-1" /> 2. Hindu</label>
            <label className="mr-2"><input type="radio" name="kepercayaan" value="budha" className="mr-1" /> 3. Budha</label>
            <label className="mr-2"><input type="radio" name="kepercayaan" value="katolik" className="mr-1" /> 4. Katolik</label>
            <label className="mr-2"><input type="radio" name="kepercayaan" value="lainnya" className="mr-1" /> 5. Lainnya</label>
          </div>
        </div>

        <div className="mb-4">
    <h3 className="font-semibold mb-2">Penjelasan Mengenai Keluarga</h3>
    <div className="overflow-x-auto"> {/* Menambahkan scroll horizontal jika tabel terlalu lebar */}
        <table className="min-w-full border-collapse border border-gray-500">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-500 px-4 py-2">No</th>
                    <th className="border border-gray-500 px-4 py-2">Nama</th>
                    <th className="border border-gray-500 px-4 py-2">Hub. Keluarga (Dengan Anda)</th>
                    <th className="border border-gray-500 px-4 py-2">Status Menikah/Belum</th>
                    <th className="border border-gray-500 px-4 py-2">Usia</th>
                    <th className="border border-gray-500 px-4 py-2">Agama</th>
                    <th className="border border-gray-500 px-4 py-2">Sudah Dibaptis Selam/Belum</th>
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: 10 }).map((_, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}> {/* Memberikan warna selang-seling pada baris */}
                        <td className="border border-gray-500 px-4 py-2">{index + 1}</td>
                        <td className="border border-gray-500 px-4 py-2"></td>
                        <td className="border border-gray-500 px-4 py-2"></td>
                        <td className="border border-gray-500 px-4 py-2"></td>
                        <td className="border border-gray-500 px-4 py-2"></td>
                        <td className="border border-gray-500 px-4 py-2"></td>
                        <td className="border border-gray-500 px-4 py-2"></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
        {/* Bagian Pernyataan */}
        <div className="mb-4">
          <p className="mb-2">"Saya mengaku dengan mulut saya bahwa YESUS KRISTUS adalah TUHAN dan saya percaya di dalam hati bahwa TUHAN telah membangkitkan DIA dari antara orang mati. Saya percaya dan saya mau di BAPTIS, maka saya selamat." (Markus 16:16; Roma 10:9)</p>
          <p>"Dengan ini saya menyatakan menerima BAPTISAN SELAM atas keyakinan dan kehendak saya sendiri."</p>
        </div>

        {/* Bagian Tanda Tangan */}
        <div className="flex justify-between mb-4">
          <div className="w-1/2">
            <h3 className="font-semibold mb-2">Di isi oleh Sekretariat</h3>
            <p>Tempat/Tgl Baptis: .....................................................</p>
            <p>Pelaksana: .....................................................</p>
            <p>Saksi: .....................................................</p>
          </div>
          <div className="w-1/2">
            <p>Cibinong, .....................................................</p>
            <p>Yang mendaftar: .....................................................</p>
            <p>( .................................................... )</p>
            <p>Nama Jelas</p>
          </div>
        </div>

        {/* Bagian Foto */}
        <div className="text-center">
          <p>Harap Sertakan Pas Photo 3x4, 2 lembar.</p>
        </div>
        <div className="mt-4">

        <PDFDownloadLink document={MyDocument} fileName="baptisan-air-detail.pdf">
          {({ loading }) => (loading ? 'Loading document...' : 'Unduh PDF')}
        </PDFDownloadLink>
        </div>
      </Paper>
    </Box>
  );
}

export default DetailBaptisanAir;