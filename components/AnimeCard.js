import Link from 'next/link';
import { FiPlay, FiCalendar, FiEye } from 'react-icons/fi';

export default function AnimeCard({ anime, badge = null }) {
  // Format date jika ada
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return dateString;
  };

  return (
    <Link href={`/anime/${anime.slug}`}>
      <div className="anime-card bg-gray-800 rounded-xl overflow-hidden shadow-lg cursor-pointer group border border-gray-700 hover:border-purple-500 transition-all duration-300">
        <div className="relative aspect-3/4 overflow-hidden">
          <img 
            src={anime.poster} 
            alt={anime.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = '/api/placeholder/300/400?text=No+Image';
            }}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badge untuk ranking */}
          {badge && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded text-xs font-bold shadow-lg">
              {badge}
            </div>
          )}
          
          {/* Current Episode */}
          <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-semibold backdrop-blur-sm">
            {anime.current_episode || 'Episode 1'}
          </div>
          
          {/* Play Button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-2xl">
              <FiPlay className="text-white text-xl ml-1" />
            </div>
          </div>
          
          {/* Bottom info overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center justify-between text-xs text-gray-300">
              {anime.release_day && (
                <div className="flex items-center space-x-1">
                  <FiCalendar className="text-purple-400" size={10} />
                  <span>{anime.release_day}</span>
                </div>
              )}
              {anime.newest_release_date && (
                <div className="flex items-center space-x-1">
                  <FiEye className="text-pink-400" size={10} />
                  <span>{formatDate(anime.newest_release_date)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Title and Info */}
        <div className="p-4">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-purple-300 transition-colors duration-300 leading-tight mb-2">
            {anime.title}
          </h3>
          
          {/* Additional info jika ada */}
          {(anime.type || anime.rating) && (
            <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
              {anime.type && (
                <span className="bg-gray-700 px-2 py-1 rounded">{anime.type}</span>
              )}
              {anime.rating && (
                <span className="flex items-center space-x-1">
                  <span className="text-yellow-400">⭐</span>
                  <span>{anime.rating}</span>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}