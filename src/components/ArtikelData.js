import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import DynamicTable from './DynamicTable';
import './ArtikelData.css';
import Swal from 'sweetalert2';

const ExpandableContent = ({ content }) => {
  const [expanded, setExpanded] = React.useState(false);

  const truncateWords = (text, limit) => {
    const words = text.split(' ');
    return words.slice(0, limit).join(' ') + (words.length > limit ? '...' : '');
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      {expanded ? content : truncateWords(content, 5)}
      <span
        onClick={toggleExpanded}
        style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px' }}
      >
        {expanded ? 'Tutup' : 'Baca Selengkapnya'}
      </span>
    </div>
  );
};

function ArtikelData() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch data artikel
  const fetchArtikelData = async () => {
    try {
      const response = await fetch(`https://api.gppkcbn.org/cbn/v1/artikel/getAllArticle`);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      const data = await response.json();
      console.log('================tt====================');
      console.log(data);
      console.log('====================================');
      return data.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Delete artikel
  const deleteArtikel = async (id) => {
    try {
      const response = await fetch(`https://api.gppkcbn.org/cbn/v1/artikel/deleteOneData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ id: id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete article');
      }
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ['artikelData'],
    queryFn: fetchArtikelData,
    onSuccess: (data) => {
      if (!Array.isArray(data.data)) {
        throw new Error('Data should be an array');
      }
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteArtikel,
    onSuccess: () => {
      queryClient.invalidateQueries(['artikelData']);
      Swal.fire({
        title: 'Artikel Berhasil Dihapus',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    },
    onError: (error) => {
      Swal.fire({
        title: 'Gagal Menghapus Artikel',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Artikel ini akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p>Loading data...</p>;
  if (error) return <p>There was an error loading the data.</p>;

  const columns = [
    { key: 'title', label: 'Judul Artikel' },
    {
      key: 'content',
      label: 'Konten',
      render: (item) => <ExpandableContent content={item.content}/>,
    },
    { key: 'kategori', label: 'Kategori' },
    {
      key: 'url',
      label: 'Gambar',
      render: (item) => <img src={item.url} alt={item.title} style={{ width: '200px', height: 'auto' }} />,
    },
    {
      key: 'created_at',
      label: 'Dibuat Pada',
      render: (item) => moment(item.created_at).format('dddd, DD/MM/YYYY HH:mm'),
    },
    {
      key: 'actions',
      label: 'Aksi',
      render: (item) => (
        <div className="actions">
          <button className="btn-delete" onClick={() => handleDelete(item.idArtikel)}>Hapus</button>
          <button className="btn-secondary" onClick={() => navigate(`/dashboard/edit-article/${item.idArtikel}`)}>Edit</button>
        </div>
      ),
    },
  ];

  return (
    <div className="artikel-data">
      <div className="artikel-data-header">
        <h2>Data Manajemen Artikel</h2>
        <button className="btn-primary" onClick={() => navigate('/dashboard/add-article')}>
          + Tambah Data
        </button>
      </div>
      <DynamicTable columns={columns} data={data} />
    </div>
  );
}

export default ArtikelData;
