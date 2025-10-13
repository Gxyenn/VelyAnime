import Head from 'next/head';
import Navbar from './Navbar';

export default function Layout({ children, title = "Vely Anime" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Stream anime terbaik dengan kualitas tinggi di Vely Anime" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-800 border-t border-gray-700 py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-4">
              {/* Logo V Terbalik dengan Chibi */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center transform rotate-180 text-white font-bold text-2xl">
                  V
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-purple-300 rounded-full"></div>
              </div>
              <span className="ml-3 text-2xl font-bold gradient-text">Vely Anime</span>
            </div>
            <p className="text-gray-400">
              &copy; 2024 Vely Anime. Semua hak cipta dilindungi.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}