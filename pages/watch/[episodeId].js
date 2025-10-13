import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import LoadingSpinner from '../../components/LoadingSpinner';
import { animeAPI } from '../../lib/api';

export default function WatchEpisode() {
  const router = useRouter();
  const { episodeId } = router.query;
  const [sources, setSources] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (episodeId) {
      fetchStreamingLinks();
    }
  }, [episodeId]);

  const fetchStreamingLinks = async () => {
    try {
      setLoading(true);
      const response = await animeAPI.getStreamingLinks(episodeId);
      const sourcesData = response.data?.sources || [];
      setSources(sourcesData);
      
      if (sourcesData.length > 0) {
        setSelectedQuality(sourcesData[0].quality);
      }
    } catch (error) {
      console.error('Error fetching streaming links:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSelectedSource = () => {
    return sources.find(source => source.quality === selectedQuality) || sources[0];
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
    <Layout title={`Episode ${episodeId} - Vely Anime`}>
      <div className="container mx-auto px-4 py-8">
        {/* Video Player */}
        <div className="bg-black rounded-2xl overflow-hidden shadow-2xl mb-6">
          <video 
            controls 
            className="w-full h-auto max-h-96"
            src={getSelectedSource()?.url}
            poster="/thumbnail-placeholder.jpg"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Quality Selector */}
        {sources.length > 1 && (
          <div className="bg-gray-800 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 gradient-text">Kualitas Video</h3>
            <div className="flex flex-wrap gap-2">
              {sources.map(source => (
                <button
                  key={source.quality}
                  onClick={() => setSelectedQuality(source.quality)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedQuality === source.quality
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {source.quality}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => router.back()}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    </Layout>
  );
}