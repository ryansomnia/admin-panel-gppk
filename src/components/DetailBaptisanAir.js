import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography
} from '@mui/material';
import {
  PDFDownloadLink,
  Image,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font
} from '@react-pdf/renderer';
import kopImage from '../images/kopgppk.png';

// Registrasi font
Font.register({
  family: 'Helvetica',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/helvetica/v20/oYpQySZ43eM7RG0YtEemzH0.ttf'
    },
    {
      src: 'https://fonts.gstatic.com/s/helvetica/v20/oYpQySZ43eM7RG0YtEemzH0.ttf',
      fontWeight: 'bold'
    }
  ]
});

// Gaya untuk dokumen PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.4
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 10
  },
  headerImage: {
    width: 500, // sesuaikan lebar gambar kop
    height: 'auto'
  },
 
  sectionContainer: {
    marginBottom: 10,
    paddingHorizontal: 10
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 4
  },
  label: {
    width: '30%',
    fontSize: 9
  },
  value: {
    width: '70%',
    textDecoration: 'underline',
    fontSize: 9

  },
  statementText: {
    marginTop: 10,
    marginBottom: 4,
    fontStyle: 'italic'
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  signatureBox: {
    width: '45%'
  },
  signatureLine: {
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '70%'
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20
  },

  // Style untuk Tabel Keluarga
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000'
  },
  tableRow: {
    flexDirection: 'row'
  },
  // Tiap kolom beri lebar sesuai jumlah kolom total
  // Mis. 5% utk No, 15% utk Nama, dst. Sesuaikan agar total 100%
  tableColNo: {
    width: '5%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000'
  },
  tableColNama: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000'
  },
  tableColHubKeluarga: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000'
  },
  tableColStatus: {
    width: '15%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000'
  },
  tableColUsia: {
    width: '10%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000'
  },
  tableColAgama: {
    width: '10%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000'
  },
  tableColBaptis: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000'
  },
  // Style untuk sel (isi)
  tableCell: {
    margin: 2,
    fontSize: 10
  },
  // Style untuk header sel
  tableCellHeader: {
    margin: 2,
    fontSize: 10,
    fontWeight: 'bold'
  }
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
    pernyataan: false
  });

  // Contoh penggunaan React Query untuk mengambil data
  const { data: dataBaptism, isLoading, error } = useQuery({
    queryKey: ['dataBaptism']
    // queryFn: ... // Tambahkan fungsi fetch data jika diperlukan
  });

  // Set data dari hasil fetch
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
          pernyataan: baptism.Pernyataan || false
        });
      }
    }
  }, [dataBaptism, id]);

  if (isLoading) return <CircularProgress />;
  if (!dataBaptism) return <Typography>Data not found.</Typography>;

   // Persiapan data untuk tabel keluarga
   let familyRows;
   if (formData.keluarga.length > 5) {
     // Jika data keluarga lebih dari 5, tampilkan semua
     familyRows = formData.keluarga.map((item, i) => (
       <View style={styles.tableRow} key={i}>
         <View style={styles.tableColNo}>
           <Text style={styles.tableCell}>{i + 1}</Text>
         </View>
         <View style={styles.tableColNama}>
           <Text style={styles.tableCell}>{item.nama || ''}</Text>
         </View>
         <View style={styles.tableColHubKeluarga}>
           <Text style={styles.tableCell}>{item.hubungan || ''}</Text>
         </View>
         <View style={styles.tableColStatus}>
           <Text style={styles.tableCell}>{item.statusMenikah || ''}</Text>
         </View>
         <View style={styles.tableColUsia}>
           <Text style={styles.tableCell}>{item.usia || ''}</Text>
         </View>
         <View style={styles.tableColAgama}>
           <Text style={styles.tableCell}>{item.agama || ''}</Text>
         </View>
         <View style={styles.tableColBaptis}>
           <Text style={styles.tableCell}>{item.sudahDibaptis|| ''}</Text>
         </View>
       </View>
     ));
   } else {
     // Jika data keluarga <= 5, buat array sepanjang 5 dan isi sesuai data (jika ada), sisanya kosong
     familyRows = Array(5)
       .fill(null)
       .map((_, i) => {
         const item = formData.keluarga[i] || {}; // jika data belum ada, item akan kosong
         return (
           <View style={styles.tableRow} key={i}>
             <View style={styles.tableColNo}>
               <Text style={styles.tableCell}>{i + 1}</Text>
             </View>
             <View style={styles.tableColNama}>
               <Text style={styles.tableCell}>{item.nama || ''}</Text>
             </View>
             <View style={styles.tableColHubKeluarga}>
               <Text style={styles.tableCell}>{item.hubungan || ''}</Text>
             </View>
             <View style={styles.tableColStatus}>
               <Text style={styles.tableCell}>{item.statusMenikah || ''}</Text>
             </View>
             <View style={styles.tableColUsia}>
               <Text style={styles.tableCell}>{item.usia || ''}</Text>
             </View>
             <View style={styles.tableColAgama}>
               <Text style={styles.tableCell}>{item.agama || ''}</Text>
             </View>
             <View style={styles.tableColBaptis}>
               <Text style={styles.tableCell}>{item.sudahDibaptis|| ''}</Text>
             </View>
           </View>
         );
       });
   }
 
  // Dokumen PDF
  const MyDocument = (
    <Document>
      <Page style={styles.page}>
        {/* Header hanya menggunakan gambar kop */}
        <View style={styles.headerContainer}>
          <Image src={kopImage} style={styles.headerImage} />
        </View>

        {/* <View style={styles.divider} /> */}

        {/* Data Diri */}
        <View style={styles.sectionContainer}>
          <View style={styles.formRow}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <Text style={styles.value}>: {formData.namaLengkap || ' '}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Tempat/Tgl Lahir</Text>
            <Text style={styles.value}>: {formData.tempatLahir}, {moment(formData.tanggalLahir).format('DD-MM-YYYY')}
            </Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Alamat</Text>
            <Text style={styles.value}>: {formData.alamat}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>No. HP</Text>
            <Text style={styles.value}>: {formData.noHP}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Pendidikan</Text>
            <Text style={styles.value}>: {formData.pendidikanTerakhir}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Pekerjaan</Text>
            <Text style={styles.value}>: {formData.pekerjaan}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>KKA</Text>
            <Text style={styles.value}>: {formData.kka}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>
            : {formData.status}{' '}
            {formData.tanggalMenikah ? `(Menikah pada ${moment(formData.tanggalMenikah).format('DD-MM-YYYY')})` : ''}
            </Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Kepercayaan Lama</Text>
            <Text style={styles.value}>: {formData.kepercayaanLama}</Text>
          </View>
        </View>

        {/* <View style={styles.divider} /> */}
 {/* Bagian Keluarga */}
 <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Penjelasan Mengenai Keluarga</Text>
          <View style={styles.table}>
            {/* Header Tabel */}
            <View style={styles.tableRow}>
              <View style={styles.tableColNo}>
                <Text style={styles.tableCellHeader}>No</Text>
              </View>
              <View style={styles.tableColNama}>
                <Text style={styles.tableCellHeader}>Nama</Text>
              </View>
              <View style={styles.tableColHubKeluarga}>
                <Text style={styles.tableCellHeader}>Hub. Keluarga (Dengan Anda)</Text>
              </View>
              <View style={styles.tableColStatus}>
                <Text style={styles.tableCellHeader}>Status Menikah/Belum</Text>
              </View>
              <View style={styles.tableColUsia}>
                <Text style={styles.tableCellHeader}>Usia</Text>
              </View>
              <View style={styles.tableColAgama}>
                <Text style={styles.tableCellHeader}>Agama</Text>
              </View>
              <View style={styles.tableColBaptis}>
                <Text style={styles.tableCellHeader}>Sudah Dibaptis Selam/Belum</Text>
              </View>
            </View>
            {/* Isi Tabel */}
            {familyRows}
          </View>
        </View>
        {/* Pernyataan */}
        <View style={styles.sectionContainer}>
        <Text style={{ textAlign: 'center', fontStyle: 'italic', fontSize: 9}}>
    “Saya mengaku dengan mulut saya bahwa YESUS KRISTUS adalah TUHAN dan saya percaya di dalam hati bahwa TUHAN telah membangkitkan DIA dari antara orang mati.
    Saya percaya dan saya mau di BAPTIS, maka saya selamat.” (Markus 16:16; Roma 10:9)
  </Text>
  <Text style={[styles.statementText, { textAlign: 'center', fontSize: 9 }]}>
    Dengan ini saya menyatakan menerima BAPTISAN SELAM atas keyakinan dan kehendak saya sendiri.
  </Text>
        </View>

        {/* <View style={styles.divider} /> */}

        {/* Bagian Tanda Tangan */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Diisi oleh Sekretariat</Text>
            <Text>Tempat/Tgl Baptis: ........................................</Text>
            <Text>Pelaksana: ........................................</Text>
            <Text>Saksi: ........................................</Text>

            <Text style={{ marginTop: 15 }}>
              Harap Sertakan Pas Photo 3x4, 2 lembar.
            </Text>
          </View>
          <View style={styles.signatureBox}>
            <Text>Cibinong, {moment().format('DD-MM-YYYY')}</Text>
            <Text>Yang mendaftar,</Text>
            <View style={styles.signatureLine} />
            <Text>(Nama Jelas)</Text>
          </View>
        </View>

      </Page>
    </Document>
  );

  return (
    <Box sx={{ padding: 4 }}>
         <Typography variant="h4" gutterBottom>
          Detail Formulir Baptisan Air
        </Typography>
      <Paper elevation={3} sx={{ padding: 4 }}>
        {/* Preview Halaman Web */}
        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <img
            src={kopImage}
            alt="Kop GPPK"
            style={{ width: '100%', marginBottom: 10 }}
          />
        </div>

     

         {/* BAGIAN DATA DIRI - WEB PREVIEW */}
         <div style={{ marginBottom: '1rem' }}>
          {/* Baris 1 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{ width: '30%', fontWeight: 'bold' }}>
              Nama Lengkap
            </div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.namaLengkap}</div>
          </div>
          {/* Baris 2 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%', fontWeight: 'bold' }}>
              Tempat/Tgl Lahir
            </div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>
              {formData.tempatLahir}, {moment(formData.tanggalLahir).format('DD-MM-YYYY')}
            </div>
          </div>
          {/* Baris 3 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%', fontWeight: 'bold' }}>Alamat</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.alamat}</div>
          </div>
          {/* Baris 4 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%', fontWeight: 'bold' }}>No. HP</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.noHP}</div>
          </div>
          {/* Baris 5 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%', fontWeight: 'bold' }}>Pendidikan</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.pendidikanTerakhir}</div>
          </div>
          {/* Baris 6 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%', fontWeight: 'bold' }}>Pekerjaan</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.pekerjaan}</div>
          </div>
          {/* Baris 7 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%', fontWeight: 'bold' }}>KKA</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.kka}</div>
          </div>
          {/* Baris 8 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{ width: '30%', fontWeight: 'bold' }}>Status</div>

            <div style={{ marginRight: 4 }}>:</div>
            <div>
              {formData.status}{' '}
              {formData.tanggalMenikah
                ? `(Menikah pada ${moment(formData.tanggalMenikah).format('DD-MM-YYYY')})`
                : ''}
            </div>
          </div>
          {/* Baris 9 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%', fontWeight: 'bold' }}>
              Kepercayaan Lama
            </div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.kepercayaanLama}</div>
          </div>
        </div>
{/* Tabel Keluarga (untuk preview web, opsional) */}
<Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          Penjelasan Mengenai Keluarga
        </Typography>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
          <table
            style={{
              borderCollapse: 'collapse',
              width: '100%',
              border: '1px solid #000'
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ border: '1px solid #000', padding: '4px' }}>No</th>
                <th style={{ border: '1px solid #000', padding: '4px' }}>Nama</th>
                <th style={{ border: '1px solid #000', padding: '4px' }}>
                  Hub. Keluarga (Dengan Anda)
                </th>
                <th style={{ border: '1px solid #000', padding: '4px' }}>
                  Status Menikah/Belum
                </th>
                <th style={{ border: '1px solid #000', padding: '4px' }}>Usia</th>
                <th style={{ border: '1px solid #000', padding: '4px' }}>Agama</th>
                <th style={{ border: '1px solid #000', padding: '4px' }}>
                  Sudah Dibaptis Selam/Belum
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.keluarga.length > 5
                ? formData.keluarga.map((item, i) => (
                    <tr key={i}>
                      <td style={{ border: '1px solid #000', padding: '4px' }}>{i + 1}</td>
                      <td style={{ border: '1px solid #000', padding: '4px' }}>
                        {item.nama || ''}
                      </td>
                      <td style={{ border: '1px solid #000', padding: '4px' }}>
                        {item.hubungan || ''}
                      </td>
                      <td style={{ border: '1px solid #000', padding: '4px' }}>
                        {item.statusMenikah || ''}
                      </td>
                      <td style={{ border: '1px solid #000', padding: '4px' }}>
                        {item.usia || ''}
                      </td>
                      <td style={{ border: '1px solid #000', padding: '4px' }}>
                        {item.agama || ''}
                      </td>
                      <td style={{ border: '1px solid #000', padding: '4px' }}>
                        {item.sudahDibaptis|| ''}
                      </td>
                    </tr>
                  ))
                : Array(5)
                    .fill(null)
                    .map((_, i) => {
                      const item = formData.keluarga[i] || {};
                      return (
                        <tr key={i}>
                          <td style={{ border: '1px solid #000', padding: '4px' }}>{i + 1}</td>
                          <td style={{ border: '1px solid #000', padding: '4px' }}>
                            {item.nama || ''}
                          </td>
                          <td style={{ border: '1px solid #000', padding: '4px' }}>
                            {item.hubungan || ''}
                          </td>
                          <td style={{ border: '1px solid #000', padding: '4px' }}>
                            {item.statusMenikah || ''}
                          </td>
                          <td style={{ border: '1px solid #000', padding: '4px' }}>
                            {item.usia || ''}
                          </td>
                          <td style={{ border: '1px solid #000', padding: '4px' }}>
                            {item.agama || ''}
                          </td>
                          <td style={{ border: '1px solid #000', padding: '4px' }}>
                            {item.sudahDibaptis|| ''}
                          </td>
                        </tr>
                      );
                    })}
            </tbody>
          </table>
        </div>
        <Typography paragraph>
          “Saya mengaku dengan mulut saya bahwa YESUS KRISTUS adalah TUHAN dan saya percaya di dalam hati bahwa TUHAN telah
          membangkitkan DIA dari antara orang mati. Saya percaya dan saya mau di BAPTIS, maka saya selamat.” (Markus 16:16; Roma 10:9)
        </Typography>
        <Typography paragraph sx={{ fontStyle: 'italic' }}>
          Dengan ini saya menyatakan menerima BAPTISAN SELAM atas keyakinan dan kehendak saya sendiri.
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ width: '45%' }}>
            <Typography sx={{ fontWeight: 'bold', marginBottom: 1 }}>
              Diisi oleh Sekretariat
            </Typography>
            <Typography>Tempat/Tgl Baptis: ........................................</Typography>
            <Typography>Pelaksana: ........................................</Typography>
            <Typography>Saksi: ........................................</Typography>

            <br></br>
            <Text variant="body2" align="center" sx={{ marginBottom: 2 }}>
          Harap sertakan pas foto 3x4 sebanyak 2 lembar.
        </Text>

          </div>
          
          <div style={{ width: '45%' }}>
            <Typography>Cibinong, {moment().format('DD-MM-YYYY')}</Typography>
            <Typography>Yang mendaftar,</Typography>
            <div
              style={{
                marginTop: 30,
                borderBottom: '1px solid #000',
                width: '70%'
              }}
            />
            <Typography>(Nama Jelas)</Typography>
          </div>
        </div>

       
        <PDFDownloadLink document={MyDocument} fileName="baptisan-air-detail.pdf">
          {({ loading }) => (
            <Button variant="contained" color="primary">
              {loading ? 'Loading document...' : 'Unduh PDF'}
            </Button>
          )}
        </PDFDownloadLink>
      </Paper>
    </Box>
  );
}

export default DetailBaptisanAir;
