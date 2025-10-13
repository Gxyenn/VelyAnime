import { useState, useRef, useEffect } from 'react';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize } from 'react-icons/fi';

export default function VideoPlayer({ sources, poster }) {
  const videoRef = useRef(null);
  const [selectedQuality, setSelectedQuality] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (sources.length > 0 && !selectedQuality) {
      setSelectedQuality(sources[0].quality);
    }
  }, [sources]);

  const getSelectedSource = () => {
    return sources.find(source => source.quality === selectedQuality) || sources[0];
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * duration;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
      {/* Video Element */}
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full h-auto max-h-96"
          poster={poster}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={togglePlay}
        >
          <source src={getSelectedSource()?.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Custom Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          {/* Progress Bar */}
          <div 
            className="w-full bg-gray-600 h-1 rounded mb-4 cursor-pointer"
            onClick={handleProgressClick}
          >
            <div 
              className="bg-purple-600 h-1 rounded transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="text-white hover:text-purple-400 transition-colors"
              >
                {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-purple-400 transition-colors"
                >
                  {isMuted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-purple-600"
                />
              </div>

              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Quality Selector */}
              {sources.length > 1 && (
                <select
                  value={selectedQuality}
                  onChange={(e) => setSelectedQuality(e.target.value)}
                  className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-600 focus:outline-none focus:border-purple-500"
                >
                  {sources.map(source => (
                    <option key={source.quality} value={source.quality}>
                      {source.quality}
                    </option>
                  ))}
                </select>
              )}

              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-purple-400 transition-colors"
              >
                <FiMaximize size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}