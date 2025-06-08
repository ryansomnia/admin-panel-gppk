import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
  Grid,
  Divider
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
import kopImage from '../images/koppenyerahananak.png';

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
    width: 500,
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
  tableCell: {
    margin: 2,
    fontSize: 10
  },
  tableCellHeader: {
    margin: 2,
    fontSize: 10,
    fontWeight: 'bold'
  }
});


function DetailPenyerahanAnak() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
 
  const [formData, setFormData] = useState({
    nama_ayah: '',
    tempat_tanggal_lahir_ayah: '',
    alamat_ayah: '',
    telepon_ayah: '',
    tempat_tanggal_baptis_ayah: '',
    pendidikan_terakhir_ayah: '',
    pekerjaan_ayah: '',
    kka_ayah: '',
    wilayah_ayah: '',
    nama_ibu: '',
    tempat_tanggal_lahir_ibu: '',
    alamat_ibu: '',
    telepon_ibu: '',
    tempat_tanggal_baptis_ibu: '',
    pendidikan_terakhir_ibu: '',
    pekerjaan_ibu: '',
    kka_ibu: '',
    wilayah_ibu: '',
    nama_anak: '',
    tempat_tanggal_lahir_anak: ''
  });

  // Contoh penggunaan React Query untuk mengambil data
  const { data: dataAnak, isLoading, error } = useQuery({
    queryKey: ['dataAnak']
    // queryFn: ... // Tambahkan fungsi fetch data jika diperlukan
  });

  // Set data dari hasil fetch
  useEffect(() => {
    if (dataAnak && id) {
      const anak = dataAnak.find((item) => item.id === parseInt(id));
     console.log('===============anak=====================');
     console.log(anak);
     console.log('====================================');
      if (anak) {
        setFormData({
          nama_ayah:anak.nama_ayah || '',
          tempat_tanggal_lahir_ayah:anak.tempat_tanggal_lahir_ayah || '',
          alamat_ayah:anak.alamat_ayah || '',
          telepon_ayah:anak.telepon_ayah || '',
          tempat_tanggal_baptis_ayah:anak.tempat_tanggal_baptis_ayah || '',
          pendidikan_terakhir_ayah:anak.pendidikan_terakhir_ayah || '',
          pekerjaan_ayah:anak. pekerjaan_ayah|| '',
          kka_ayah:anak.kka_ayah || '',
          wilayah_ayah:anak.wilayah_ayah || '',
          nama_ibu:anak.nama_ibu || '',
          tempat_tanggal_lahir_ibu:anak.tempat_tanggal_lahir_ibu || '',
          alamat_ibu:anak.alamat_ibu || '',
          telepon_ibu:anak.telepon_ibu || '',
          tempat_tanggal_baptis_ibu:anak.tempat_tanggal_baptis_ibu || '',
          pendidikan_terakhir_ibu:anak.pendidikan_terakhir_ibu || '',
          pekerjaan_ibu:anak.pekerjaan_ibu || '',
          kka_ibu:anak.kka_ibu || '',
          wilayah_ibu:anak.wilayah_ibu || '',
          nama_anak:anak.nama_anak || '',
          tempat_tanggal_lahir_anak:anak.tempat_tanggal_lahir_anak || '',
        });
      }
    }
  }, [dataAnak, id]);

  if (isLoading) return <CircularProgress />;
  if (!dataAnak) return <Typography>Data not found.</Typography>;

 
  // Dokumen PDF
  const MyDocument = (
    <Document>
      <Page style={styles.page}>
        <View style={styles.headerContainer}>
          <Image src={kopImage} style={{marginBottom:4}} />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Ayah</Text>
          <View style={styles.formRow}>
            <Text style={styles.label}>Nama Ayah</Text>
            <Text style={styles.value}>: {formData.nama_ayah || ''}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Tempat/Tgl Lahir</Text>
            <Text style={styles.value}>
              : {formData.tempat_tanggal_lahir_ayah || ''}, {moment(formData.tanggalLahir).format('DD-MM-YYYY')}
            </Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Alamat No. Telp.</Text>
            <Text style={styles.value}>: {formData.alamat_ayah || ''}, {formData.telepon_ayah || ''}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Tempat/tgl Baptis</Text>
            <Text style={styles.value}>: {formData.tempat_tanggal_baptis_ayah || ''}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Pendidikan</Text>
            <Text style={styles.value}>: {formData.pendidikan_terakhir_ayah || ''}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Pekerjaan</Text>
            <Text style={styles.value}>: {formData.pekerjaan_ayah || ''}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>KKA</Text>
            <Text style={styles.value}>: {formData.kka_ayah || ''}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Wilayah</Text>
            <Text style={styles.value}>: {formData.wilayah_ayah || ''}</Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Ibu</Text>
          <View style={styles.formRow}>
            <Text style={styles.label}>Nama Ibu</Text>
            <Text style={styles.value}>: {formData.nama_ibu || ''}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Tempat/Tgl Lahir</Text>
            <Text style={styles.value}>
              : {formData.tempat_tanggal_lahir_ibu || ''}, {moment(formData.tanggalLahir).format('DD-MM-YYYY')}
            </Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Alamat No. Telp.</Text>
            <Text style={styles.value}>: {formData.alamat_ibu || ''}, {formData.telepon_ibu || ''}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Tempat/tgl Baptis</Text>
            <Text style={styles.value}>: {formData.tempat_tanggal_baptis_ibu || ''}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Pendidikan</Text>
            <Text style={styles.value}>: {formData.pendidikan_terakhir_ibu || ''}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Pekerjaan</Text>
            <Text style={styles.value}>: {formData.pekerjaan_ibu || ''}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>KKA</Text>
            <Text style={styles.value}>: {formData.kka_ibu || ''}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Wilayah</Text>
            <Text style={styles.value}>: {formData.wilayah_ibu || ''}</Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={{ fontSize: 10, fontStyle: 'normal' }}>
            Dengan ini kami menyatakan dihadapan TUHAN dan JemaatNya dengan kesungguhan hati ingin menyerahkan anak kami:
          </Text>
          <Text style={{fontSize: 10, fontWeight: 'bold', marginBottom: 0 }}>
            Nama Anak: {formData.nama_anak || ''}
          </Text>
          <Text style={{fontSize: 10, marginTop: 0, marginBottom: 5, fontWeight: 'bold' }}>
            Tempat/tanggal lahir: {formData.tempat_tanggal_lahir_anak || ''}
          </Text>
          <Text style={{ fontSize: 10 }}>
            Dalam Kebaktian di Gereja GPPK CBN - Christ Bless Nation. Kami berjanji untuk menuntun anak kami untuk takut akan TUHAN
            dan mengajarnya sesuai dengan FIRMAN TUHAN dalam setiap langkahnya.
          </Text>
          
          <Text style={{marginTop:10, fontSize: 9, fontStyle: 'italic' }}>
            &quot;Apa yang kuperintahkan kepadamu pada hari ini haruslah engkau perhatikan, haruslah engkau mengajarkannya
            berulang-ulang kepada anak-anakmu dan membicarakannya apabila engkau duduk di rumahmu, apabila engkau sedang
            dalam perjalanan, apabila engkau berbaring dan apabila engkau bangun.&quot; - Ulangan 6:6-7
          </Text>
        </View>
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={{fontSize: 10, fontWeight: 'bold', marginBottom: 4 }}>Diisi oleh Sekretariat</Text>
            <Text>Tempat/Tgl Dedikasi: ........................................</Text>
            <Text>Pelaksana: ........................................</Text>
          </View>
          <View style={ styles.signatureBox}>
            <Text style={{fontSize: 10}} >Cibinong, {moment().format('DD-MM-YYYY')}</Text>
            <Text style={{fontSize: 10}} >Yang mendaftar,</Text>
            <View style={styles.signatureLine} />
            <Text style={{fontSize: 10}} >(Nama Jelas)</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <Box sx={{ padding: 4 }}>
         <Typography variant="h4" gutterBottom>
          Detail Formulir Penyerahan Anak
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

     

         {/* Part Ayah */}
         <div style={{ marginBottom: '1rem' }}>
          <h4 style={{marginBottom: '0.3rem'}}>Ayah</h4>
          {/* Baris 1 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{ width: '30%'}}>
              Nama Ayah
            </div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.nama_ayah}</div>
          </div>
          {/* Baris 2 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%' }}>
              Tempat/Tgl Lahir
            </div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>
              {formData.tempat_tanggal_lahir_ayah}, {moment(formData.tanggalLahir).format('DD-MM-YYYY')}
            </div>
          </div>
          {/* Baris 3 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%' }}>Alamat No. Telp.</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.alamat_ayah}, {formData.telepon_ayah}</div>
          </div>
          {/* Baris 4 */}
        

          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%'}}>Tempat/tgl Baptis</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.tempat_tanggal_baptis_ayah}</div>
          </div>
          {/* Baris 5 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%' }}>Pendidikan</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.pendidikan_terakhir_ayah}</div>
          </div>
          {/* Baris 6 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%' }}>Pekerjaan</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.pekerjaan_ayah}</div>
          </div>
          {/* Baris 7 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%' }}>KKA</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.kka_ayah}</div>
          </div>
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%' }}>Wilayah</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.wilayah_ayah}</div>
          </div>
    
      {/* Part Ibu */}
          <h4 style={{marginBottom: '0.3rem'}}>Ibu</h4>
          {/* Baris 1 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{ width: '30%'}}>
              Nama Ibu
            </div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.nama_ibu}</div>
          </div>
          {/* Baris 2 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%' }}>
              Tempat/Tgl Lahir
            </div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>
              {formData.tempat_tanggal_lahir_ibu}, {moment(formData.tanggalLahir).format('DD-MM-YYYY')}
            </div>
          </div>
          {/* Baris 3 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%' }}>Alamat No. Telp.</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.alamat_ibu}, {formData.telepon_ibu}</div>
          </div>
          {/* Baris 4 */}
        

          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%'}}>Tempat/tgl Baptis</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.tempat_tanggal_baptis_ibu}</div>
          </div>
          {/* Baris 5 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%' }}>Pendidikan</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.pendidikan_terakhir_ibu}</div>
          </div>
          {/* Baris 6 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%' }}>Pekerjaan</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.pekerjaan_ibu}</div>
          </div>
          {/* Baris 7 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%' }}>KKA</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.kka_ibu}</div>
          </div>
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%' }}>Wilayah</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.wilayah_ibu}</div>
          </div>
    
       
        </div>
{/* Tabel Keluarga (untuk preview web, opsional) */}
{/* <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          Penjelasan Mengenai Keluarga
        </Typography>
        <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
       
        </div> */}
        {/* <Typography paragraph>
          “Saya mengaku dengan mulut saya bahwa YESUS KRISTUS adalah TUHAN dan saya percaya di dalam hati bahwa TUHAN telah
          membangkitkan DIA dari antara orang mati. Saya percaya dan saya mau di BAPTIS, maka saya selamat.” (Markus 16:16; Roma 10:9)
        </Typography> */}
        <Typography paragraph sx={{ fontStyle: 'normal', marginTop:0 }}>
          Dengan ini kami menyatakan dihadapan TUHAN dan JemaatNya dengan kesungguhan hati ingin menyerahkan anak kami:
        </Typography>
        <Typography style={{marginBottom:0}} paragraph sx={{ fontStyle: 'normal', fontWeight:'bold' }}>
         Nama Anak: {formData.nama_anak}
        </Typography>
        <Typography style={{marginTop:0, marginBottom:30}} paragraph sx={{ fontStyle: 'normal', fontWeight:'bold' }}>
        Tempat/tanggal lahir: {formData.tempat_tanggal_lahir_anak}
        </Typography>

        <Typography style={{fontSize:15}} paragraph>
          Dalam Kebaktian di Gereja GPPK CBN - Christ Bless Nation. 
          Kami berjanji untuk 
          menuntun anak kami untuk takut akan TUHAN
          dan mengajarnya sesuai dengan FIRMAN TUHAN dalam setiap langkahnya.
        </Typography>

        <Typography style={{fontSize:13, fontStyle:'italic'}} paragraph>
          "Apa yang kuperintahkan kepadamu pada
           hari ini haruslah engkau perhatikan, 
           haruslah engkau mengajarkannya 
           berulang-ulang kepada anak-anakmu 
           dan membicarakannya apabila engkau 
           duduk di rumahmu, apabila engkau sedang 
           dalam perjalanan, apabila engkau berbaring 
           dan apabila engkau bangun." - Ulangan 6:6-7
         </Typography>


        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ width: '45%' }}>
            <Typography sx={{ fontWeight: 'bold', marginBottom: 1 }}>
              Diisi oleh Sekretariat
            </Typography>
            <Typography>Tempat/Tgl Dedikasi: ........................................</Typography>
            <Typography>Pelaksana: ........................................</Typography>

            <br></br>
          

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

       
        <PDFDownloadLink document={MyDocument} fileName="penyerahan-anak-detail.pdf">
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

export default DetailPenyerahanAnak;
