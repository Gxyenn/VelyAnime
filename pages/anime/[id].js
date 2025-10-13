import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { animeAPI } from '../../lib/api';

export default function AnimeDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [anime, setAnime] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchAnimeDetail();
    }
  }, [id]);

  const fetchAnimeDetail = async () => {
    try {
      setLoading(true);
      const [detailResponse, episodesResponse] = await Promise.all([
        animeAPI.getAnimeDetail(id),
        animeAPI.getEpisodes(id)
      ]);
      
      setAnime(detailResponse.data);
      setEpisodes(episodesResponse.data || []);
    } catch (error) {
      console.error('Error fetching anime detail:', error);
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

  if (!anime) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-400">Anime tidak ditemukan</h2>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${anime.title} - Vely Anime`}>
      <div className="container mx-auto px-4 py-8">
        {/* Anime Info */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="lg:w-1/4">
            <img 
              src={anime.image} 
              alt={anime.title}
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
          
          <div className="lg:w-3/4">
            <h1 className="text-4xl font-bold mb-4 gradient-text">{anime.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {anime.genres?.map(genre => (
                <span key={genre} className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-gray-400 text-sm">Status</div>
                <div className="font-semibold">{anime.status || 'Unknown'}</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-gray-400 text-sm">Episode</div>
                <div className="font-semibold">{anime.totalEpisodes || '?'}</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-gray-400 text-sm">Rating</div>
                <div className="font-semibold">{anime.rating || 'N/A'}</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-gray-400 text-sm">Tipe</div>
                <div className="font-semibold">{anime.type || 'TV'}</div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-3 gradient-text">Sinopsis</h3>
              <p className="text-gray-300 leading-relaxed">
                {anime.description || 'Tidak ada deskripsi tersedia.'}
              </p>
            </div>
          </div>
        </div>

        {/* Episodes List */}
        <div className="bg-gray-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Daftar Episode</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {episodes.map(episode => (
              <a
                key={episode.id}
                href={`/watch/${episode.id}`}
                className="bg-gray-700 hover:bg-purple-600 rounded-lg p-4 text-center transition-all duration-300 transform hover:scale-105"
              >
                <div className="font-semibold">Episode {episode.number}</div>
                {episode.title && (
                  <div className="text-xs text-gray-400 mt-1 truncate">
                    {episode.title}
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}