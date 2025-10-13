import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import AnimeCard from '../components/AnimeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { animeAPI, donghuaAPI } from '../lib/api';

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState('anime');
  const [searchQuery, setSearchQuery] = useState(q || '');

  useEffect(() => {
    if (q) {
      setSearchQuery(q);
      performSearch();
    }
  }, [q, searchType]);

  const performSearch = async () => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      let searchResults = [];
      
      if (searchType === 'anime') {
        const response = await animeAPI.searchAnime(searchQuery);
        // Response bisa berupa array atau object dengan property results
        searchResults = Array.isArray(response) ? response : response.results || [];
      } else {
        const response = await donghuaAPI.search(searchQuery);
        searchResults = Array.isArray(response) ? response : response.results || [];
      }
      
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <Layout title={`Cari: ${searchQuery} - Vely Anime`}>
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-6 gradient-text text-center">
            Pencarian Anime
          </h1>
          
          {/* Search Form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari anime atau donghua..."
                  className="w-full bg-gray-800 text-white px-6 py-4 rounded-2xl border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 pl-12 text-lg"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold disabled:opacity-50"
              >
                {loading ? 'Mencari...' : 'Cari'}
              </button>
            </div>
          </form>

          {/* Search Type Toggle */}
          <div className="flex justify-center">
            <div className="bg-gray-800 rounded-2xl p-1 flex">
              {[
                { id: 'anime', label: 'Anime' },
                { id: 'donghua', label: 'Donghua' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSearchType(tab.id)}
                  className={`px-6 py-3 rounded-2xl transition-all font-medium ${
                    searchType === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div>
          {q && (
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-300">
                Hasil pencarian untuk: <span className="text-purple-400">"{q}"</span>
              </h2>
              <div className="text-gray-400 text-sm">
                {loading ? 'Mencari...' : `${results.length} hasil ditemukan`}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          )}

          {/* Results Grid */}
          {!loading && results.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {results.map((item) => (
                <AnimeCard key={item.slug} anime={item} />
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && q && results.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">😔</div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                Tidak ada hasil ditemukan
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Coba gunakan kata kunci yang berbeda atau periksa pengejaan Anda.
              </p>
            </div>
          )}

          {/* Empty State - No Search Query */}
          {!loading && !q && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                Masukkan kata kunci pencarian
              </h3>
              <p className="text-gray-500">
                Gunakan kolom pencarian di atas untuk menemukan anime favorit Anda.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}