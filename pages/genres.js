import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AnimeCard from '../components/AnimeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { animeAPI } from '../lib/api';

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [animeByGenre, setAnimeByGenre] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      fetchAnimeByGenre();
    }
  }, [selectedGenre]);

  const fetchGenres = async () => {
    try {
      const response = await animeAPI.getGenres();
      setGenres(response.data || []);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchAnimeByGenre = async () => {
    try {
      setLoading(true);
      const response = await animeAPI.getAnimeByGenre(selectedGenre);
      setAnimeByGenre(response.data?.results || []);
    } catch (error) {
      console.error('Error fetching anime by genre:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Genre Anime - Vely Anime">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 gradient-text">Genre Anime</h1>
        
        {/* Genre List */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-300">Pilih Genre</h2>
          <div className="flex flex-wrap gap-2">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedGenre === genre
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Anime by Selected Genre */}
        {selectedGenre && (
          <div>
            <h2 className="text-2xl font-bold mb-6 gradient-text">
              Anime Genre: {selectedGenre}
            </h2>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {animeByGenre.map(anime => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!selectedGenre && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              Pilih genre untuk melihat daftar anime
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}