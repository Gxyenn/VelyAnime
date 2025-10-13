import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-800/95 backdrop-blur-sm z-50 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative group">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center transform rotate-180 text-white font-bold text-xl group-hover:scale-110 transition-transform">
                V
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-300 rounded-full group-hover:animate-pulse"></div>
            </div>
            <span className="text-xl font-bold gradient-text">Vely Anime</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/ongoing" className="text-gray-300 hover:text-white transition-colors">
              Ongoing
            </Link>
            <Link href="/genres" className="text-gray-300 hover:text-white transition-colors">
              Genres
            </Link>
            <Link href="/donghua" className="text-gray-300 hover:text-white transition-colors">
              Donghua
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari anime..."
                className="bg-gray-700 text-white px-4 py-2 rounded-full pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-300 hover:text-white">
                Home
              </Link>
              <Link href="/ongoing" className="text-gray-300 hover:text-white">
                Ongoing
              </Link>
              <Link href="/genres" className="text-gray-300 hover:text-white">
                Genres
              </Link>
              <Link href="/donghua" className="text-gray-300 hover:text-white">
                Donghua
              </Link>
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari anime..."
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg w-full pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}