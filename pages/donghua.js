import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AnimeCard from '../components/AnimeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { donghuaAPI } from '../lib/api';

export default function Donghua() {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [donghua, setDonghua] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonghua();
  }, [activeTab]);

  const fetchDonghua = async () => {
    try {
      setLoading(true);
      let response;
      
      switch (activeTab) {
        case 'ongoing':
          response = await donghuaAPI.getOngoing();
          break;
        case 'completed':
          response = await donghuaAPI.getCompleted();
          break;
        case 'all':
        default:
          response = await donghuaAPI.getHome();
          break;
      }
      
      setDonghua(response.data?.results || []);
    } catch (error) {
      console.error('Error fetching donghua:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Donghua - Vely Anime">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Donghua</h1>
          <p className="text-gray-400 text-lg">
            Nikmati koleksi donghua terbaik dari China
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-full p-1 flex">
            {['all', 'ongoing', 'completed'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {tab === 'all' ? 'Semua' : tab === 'ongoing' ? 'Sedang Tayang' : 'Selesai'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {donghua.map(item => (
              <AnimeCard key={item.id} anime={item} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && donghua.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              Tidak ada donghua yang ditemukan
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}