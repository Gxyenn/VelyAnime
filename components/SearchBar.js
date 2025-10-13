import { useState } from 'react';
import { useRouter } from 'next/router';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ placeholder = "Cari anime...", className = "" }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-700 text-white px-4 py-3 rounded-2xl pl-12 
                 focus:outline-none focus:ring-2 focus:ring-purple-500 
                 placeholder-gray-400 transition-all"
      />
      <FiSearch className="absolute left-4 top-3.5 text-gray-400 text-xl" />
      <button
        type="submit"
        className="absolute right-2 top-1 bg-purple-600 hover:bg-purple-700 
                 text-white px-4 py-1.5 rounded-lg transition-colors"
      >
        Cari
      </button>
    </form>
  );
}