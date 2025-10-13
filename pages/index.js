import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AnimeCard from '../components/AnimeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { animeAPI } from '../lib/api';

export default function Home() {
  const [ongoingAnime, setOngoingAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [homeResponse, popularResponse] = await Promise.all([
        animeAPI.getHome(),
        animeAPI.getPopular().catch(() => ({ ongoing_anime: [] })) // Fallback jika endpoint tidak ada
      ]);
      
      // Data dari home endpoint
      setOngoingAnime(homeResponse.ongoing_anime || []);
      
      // Data dari popular endpoint atau fallback ke ongoing_anime
      setPopularAnime(popularResponse.ongoing_anime || homeResponse.ongoing_anime?.slice(0, 12) || []);
      
    } catch (error) {
      console.error('Error fetching home data:', error);
      setError('Gagal memuat data anime. Silakan refresh halaman.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Vely Anime - Streaming Anime Terbaik">
      {/* Hero Section dengan Logo Vely Anime */}
      <section className="relative h-96 bg-gradient-to-r from-purple-900 via-pink-800 to-purple-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative text-center text-white z-10">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center transform rotate-180 text-white font-bold text-4xl shadow-2xl">
                V
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-300 rounded-full animate-pulse"></div>
            </div>
            <span className="ml-4 text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Vely Anime
            </span>
          </div>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Temukan anime terbaik dengan kualitas streaming tinggi. Gratis dan tanpa iklan mengganggu.
          </p>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="bg-red-600 text-white p-4 text-center">
          {error}
          <button 
            onClick={fetchHomeData}
            className="ml-4 bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-sm"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Popular Anime Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold gradient-text border-l-4 border-purple-500 pl-4">
            Anime Populer
          </h2>
          <div className="text-gray-400 text-sm">
            {popularAnime.length} anime tersedia
          </div>
        </div>
        
        {popularAnime.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {popularAnime.map((anime, index) => (
              <AnimeCard 
                key={anime.slug} 
                anime={anime}
                badge={index < 3 ? `#${index + 1}` : null}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Tidak ada anime populer yang ditemukan
          </div>
        )}
      </section>

      {/* Ongoing Anime Section */}
      <section className="container mx-auto px-4 py-12 bg-gray-800/50 rounded-2xl mx-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold gradient-text border-l-4 border-pink-500 pl-4">
            Sedang Tayang
          </h2>
          <div className="flex items-center space-x-2 text-pink-400">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Update Terbaru</span>
          </div>
        </div>
        
        {ongoingAnime.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {ongoingAnime.map(anime => (
              <AnimeCard key={anime.slug} anime={anime} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Tidak ada anime yang sedang tayang
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-800/50 p-6 rounded-2xl">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">🎬</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Kualitas HD</h3>
            <p className="text-gray-400">Streaming anime dengan kualitas tinggi dan server cepat</p>
          </div>
          
          <div className="bg-gray-800/50 p-6 rounded-2xl">
            <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Update Cepat</h3>
            <p className="text-gray-400">Episode terbaru tersedia segera setelah rilis</p>
          </div>
          
          <div className="bg-gray-800/50 p-6 rounded-2xl">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl">📱</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Responsif</h3>
            <p className="text-gray-400">Akses dari perangkat apapun dengan tampilan optimal</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}