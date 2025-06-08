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
import kopImage from '../images/kop.png';

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
    width: '35%',
    fontSize: 13
  },
  labelText: {
    fontSize: 13
  },
  value: {
    width: '70%',
    fontSize: 13
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
 
  tableCell: {
    margin: 2,
    fontSize: 10
  },
  tableCellHeader: {
    margin: 2,
    fontSize: 15,
    fontWeight: 'bold'
  }
});


function DetailPernikahan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
 
  const [formData, setFormData] = useState({
    nama_lengkap_pria: '',
    alamat_pria: '',
    alamat_wanita: '',
    created_at: '', 
    jam_pernikahan: '',
    nama_lengkap_wanita:'', 
    pekerjaan_pria:'', 
    pekerjaan_wanita :'', 
    tanggal_lahir_pria: '',
    tanggal_lahir_wanita: '',
    tanggal_pernikahan: '',
    telepon_pria: '',
    telepon_wanita: '',
    tempat_lahir_pria: '',
    tempat_lahir_wanita: '',
    tempat_pernikahan: '',
    agama_pria_dahulu:'',
    agama_wanita_dahulu:'',
    bergereja_sejak:'',
    no_kartu_pria:'',
    no_kartu_wanita:'',
    gereja_pria_dahulu:'',
    gereja_wanita_dahulu:'',
    arti_lahir_baru:'',
    pernikahan_pertama_pria:'',
    pernikahan_pertama_wanita:'',
    jumlah_anak_pria:'',
    jumlah_anak_wanita:'',
    lama_perkenalan:'',
    komitmen_suci:''

  });

  // Contoh penggunaan React Query untuk mengambil data
  const { data: dataPernikahan, isLoading, error } = useQuery({
    queryKey: ['dataPernikahan']
    // queryFn: ... // Tambahkan fungsi fetch data jika diperlukan
  });

  // Set data dari hasil fetch
  useEffect(() => {
    if (dataPernikahan && id) {
      const pernikahan = dataPernikahan.find((item) => item.id === parseInt(id));
     console.log('===============pernikahan=====================');
     console.log(pernikahan);
     console.log('====================================');
      if (pernikahan) {
        setFormData({
          nama_pria:pernikahan.namaLengkapPria || '',
          tempat_lahir_pria:pernikahan.tempatLahirPria|| '',
          alamat_pria:pernikahan.alamatPria || '',
          telepon_pria:pernikahan.teleponPria || '',
          pekerjaan_pria:pernikahan.pekerjaanPria|| '',
          nama_wanita:pernikahan.namaLengkapWanita || '',
          tempat_lahir_wanita:pernikahan.tempatLahirWanita || '',
          alamat_wanita:pernikahan.alamatWanita || '',
          telepon_wanita:pernikahan.teleponWanita || '',
          pekerjaan_wanita:pernikahan.pekerjaanWanita || '',
          agama_pria_dahulu:pernikahan.agamaPriaDahulu|| '',
          agama_wanita_dahulu:pernikahan.agamaWanitaDahulu|| '',
          nama_pernikahan:pernikahan.namaPernikahan || '',
          bergereja_sejak:pernikahan.bergerejaSejak || '',
          no_kartu_pria:pernikahan.noKartuPria || '',
          no_kartu_wanita:pernikahan.noKartuWanita || '',
          gereja_pria_dahulu:pernikahan.gerejaPriaDahulu || '',
          gereja_wanita_dahulu:pernikahan.gerejaWanitaDahulu || '',
          arti_lahir_baru:pernikahan.artiLahirBaru || '',
          pernikahan_pertama_pria: pernikahan.pernikahanPertamaPria === 1 ? 'ya' : 'tidak',
          pernikahan_pertama_wanita: pernikahan.pernikahanPertamaWanita === 1 ? 'ya' : 'tidak',
          jumlah_anak_pria:pernikahan.jumlahAnakPria || 0,
          jumlah_anak_wanita:pernikahan.jumlahAnakWanita || 0,
          lama_perkenalan:pernikahan.lamaPerkenalan || '',
          komitmen_suci:pernikahan.komitmenSuci === 1 ? 'ya' : 'tidak',




          
        });
      }
    }
  }, [dataPernikahan, id]);

  if (isLoading) return <CircularProgress />;
  if (!dataPernikahan) return <Typography>Data not found.</Typography>;

 
  // Dokumen PDF
  const MyDocument = (
    <Document>
      <Page style={styles.page}>
        <View style={styles.headerContainer}>
          <Image src={kopImage} style={{marginBottom:4}} />
        </View>
        <View style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' /* Contoh tinggi, sesuaikan */ }}>
        <Text style={{ fontWeight: 'bold', fontSize: 17,  }}>Form Pernikahan</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={{ fontWeight: 'bold', marginBottom: 4, fontSize: 14, }}>Pria</Text>
          <View style={styles.formRow}>
            <Text style={styles.label}>Nama</Text>
            <Text style={styles.value}>: {formData.nama_pria || ''}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Tempat/Tgl Lahir</Text>
            <Text style={styles.value}>
              : {formData.tempat_lahir_pria || ''}, {moment(formData.tanggalLahir).format('DD-MM-YYYY')}
            </Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Alamat, No. Telp.</Text>
            <Text style={styles.value}>: {formData.alamat_pria || ''}, {formData.telepon_pria || ''}</Text>
          </View>
         
          
          <View style={styles.formRow}>
            <Text style={styles.label}>Pekerjaan</Text>
            <Text style={styles.value}>: {formData.pekerjaan_pria || ''}</Text>
          </View>
          
        </View>
        <View style={styles.sectionContainer}>
          <Text style={{ fontWeight: 'bold', marginBottom: 4, fontSize: 14, }}>Wanita</Text>
          <View style={styles.formRow}>
            <Text style={styles.label}>Nama </Text>
            <Text style={styles.value}>: {formData.nama_wanita || ''}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Tempat/Tgl Lahir</Text>
            <Text style={styles.value}>: {formData.tempat_lahir_wanita || ''}, {moment(formData.tanggalLahir).format('DD-MM-YYYY')}
            </Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Alamat No. Telp.</Text>
            <Text style={styles.value}>: {formData.alamat_wanita || ''}, {formData.telepon_wanita || ''}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Pekerjaan</Text>
            <Text style={styles.value}>: {formData.pekerjaan_wanita || ''}</Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.formRow}>
            <Text style={styles.label}>Kepercayaan Lama Pria</Text>
            <Text style={styles.value}>: {formData.agama_pria_dahulu || ''}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Kepercayaan Lama Wanita</Text>
            <Text style={styles.value}>: {formData.agama_wanita_dahulu || ''}, {moment(formData.tanggalLahir).format('DD-MM-YYYY')}
            </Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.labelText}>Menghadiri Kebaktian GPPK CBN sejak : {formData.bergereja_sejak || ''}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Nomor Kartu Jemaat Pria</Text>
            <Text style={styles.value}>: {formData.no_kartu_pria || ''}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Nomor Kartu Jemaat Wanita</Text>
            <Text style={styles.value}>: {formData.no_kartu_wanita || ''}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Gereja Asal Pria</Text>
            <Text style={styles.value}>: {formData.gereja_pria_dahulu || ''}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Gereja Asal Wanita</Text>
            <Text style={styles.value}>: {formData.gereja_wanita_dahulu || ''}</Text>
          </View>
          </View>
          <View style={styles.sectionContainer}>

          <View style={styles.formRow}>
            <Text style={styles.labelText}>Arti Lahir Baru Ialah : ... {formData.arti_lahir_baru}</Text>
          </View>
          </View>
          <View style={styles.sectionContainer}>

          <View style={styles.formRow}>
            <Text style={styles.label}>Pernikahan Pertama Pria</Text>
            <Text style={styles.value}>: {formData.pernikahan_pertama_pria || ''}, memiliki anak : {formData.jumlah_anak_pria}</Text>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Pernikahan Pertama Wanita</Text>
            <Text style={styles.value}>: {formData.pernikahan_pertama_wanita || ''}, memiliki anak : {formData.jumlah_anak_wanita}</Text>
          </View>
          </View>
          <View style={styles.sectionContainer}>

          <View style={styles.formRow}>
            <Text style={styles.labelText}>Saudara mengakui di hadapan TUHAN bahwa Hubungan Saudara dengan calon teman hidup saudara selama ini SUCI (tidak pernah melakukan hubungan sex) : </Text>
          </View>
       
          <View style={styles.formRow}>
            <Text style={{fontSize:15, fontWeight:'bold'}}> - {formData.komitmen_suci}
            </Text>
          </View>
          </View>
         



        
       
      </Page>
    </Document>
  );

  return (
    <Box sx={{ padding: 4 }}>
         <Typography variant="h4" gutterBottom>
          Detail Formulir Pernikahan
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
        <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' /* Contoh tinggi, sesuaikan */ }}>
  <h2>Form Pernikahan</h2>
</div>

     

         {/* Part Ayah */}
         <div style={{ marginBottom: '1rem' }}>
          <h4 style={{marginBottom: '0.3rem'}}>Pria</h4>
          {/* Baris 1 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{ width: '30%'}}>
              Nama Pria
            </div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.nama_pria}</div>
          </div>
          {/* Baris 2 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%' }}>
              Tempat/Tgl Lahir
            </div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>
              {formData.tempat_lahir_pria}, {moment(formData.tanggal_lahir_pria).format('DD-MM-YYYY')}
            </div>
          </div>
          {/* Baris 3 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%' }}>Alamat, No. Telp.</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.alamat_pria}, {formData.telepon_pria}</div>
          </div>
     
         
          {/* Baris 6 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%' }}>Pekerjaan</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.pekerjaan_pria}</div>
          </div>
         
    
      {/* Part Ibu */}
          <h4 style={{marginBottom: '0.3rem'}}>Wanita</h4>
          {/* Baris 1 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{ width: '30%'}}>
              Nama Wanita
            </div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.nama_wanita}</div>
          </div>
          {/* Baris 2 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%' }}>
              Tempat/Tgl Lahir
            </div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>
              {formData.tempat_lahir_wanita}, {moment(formData.tanggal_lahir_wanita).format('DD-MM-YYYY')}
            </div>
          </div>
          {/* Baris 3 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%' }}>Alamat No. Telp.</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.alamat_wanita}, {formData.telepon_wanita}</div>
          </div>
      
       
          {/* Baris 6 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%' }}>Pekerjaan</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.pekerjaan_wanita}</div>
          </div>
         
        </div>
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{ width: '30%'}}>
              Kepercayaan Lama Pria
            </div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.agama_pria_dahulu}</div>
          </div>
          {/* Baris 2 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '30%' }}>
            Kepercayaan Lama Wanita
            </div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>
            <div>{formData.agama_wanita_dahulu}</div>
            </div>
          </div>
          {/* Baris 3 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div>Menghadiri Kebaktian GPPK CBN sejak : {formData.bergereja_sejak}</div>
          </div>
      
       
          {/* Baris 6 */}
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '35%' }}>Nomor Kartu Jemaat Pria</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.no_kartu_pria}</div>
          </div>
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '35%' }}>Nomor Kartu Jemaat Wanita</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.no_kartu_wanita}</div>
          </div>

            {/* Baris 6 */}
            <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '35%' }}>Gereja Asal Pria</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.gereja_pria_dahulu}</div>
          </div>
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '35%' }}>Gereja Asal Wanita</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.gereja_wanita_dahulu}</div>
          </div>
          <Typography style={{fontSize:15, marginTop:'5%'}} paragraph>
          Arti Lahir Baru Ialah : ... {formData.arti_lahir_baru}
        </Typography>

        <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '35%' }}>Pernikahan Pertama Pria</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.pernikahan_pertama_pria}, memiliki anak : {formData.jumlah_anak_pria}</div> 
          </div>
          <div style={{ display: 'flex', marginBottom: '0.3rem' }}>
            <div style={{  width: '35%' }}>Pernikahan Pertama Wanita</div>
            <div style={{ marginRight: 4 }}>:</div>
            <div>{formData.pernikahan_pertama_wanita},  memiliki anak : {formData.jumlah_anak_wanita}</div>
          </div>

          <Typography style={{fontSize:15, marginTop:'5%'}} paragraph>
          Lamanya Saudara berkenalan dengan calon saudara : ... {formData.lama_perkenalan}
        </Typography>

        <Typography style={{fontSize:15, marginTop:'2%', marginBottom:'0'}} paragraph>
        Saudara mengakui di hadapan TUHAN bahwa Hubungan Saudara dengan calon teman hidup saudara selama ini SUCI (tidak pernah melakukan hubungan sex) : 
        </Typography>
        <Typography style={{fontSize:17,marginTop:'0', fontWeight:'bold' }} paragraph>
        - {formData.komitmen_suci}
        </Typography>
        <PDFDownloadLink document={MyDocument} fileName="form-pernikahan.pdf">
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

export default DetailPernikahan;
