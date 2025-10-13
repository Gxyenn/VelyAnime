import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AnimeCard from '../components/AnimeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { animeAPI } from '../lib/api';

export default function Ongoing() {
  const [ongoingAnime, setOngoingAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOngoingAnime();
  }, []);

  const fetchOngoingAnime = async () => {
    try {
      setLoading(true);
      const response = await animeAPI.getOngoing();
      setOngoingAnime(response.data?.results || []);
    } catch (error) {
      console.error('Error fetching ongoing anime:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Anime Ongoing - Vely Anime">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 gradient-text">Anime Sedang Tayang</h1>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {ongoingAnime.map(anime => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}

        {!loading && ongoingAnime.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              Tidak ada anime yang sedang tayang
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}