import React, { useState } from 'react';
import { Play, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AudioLibrary.css';

interface AudioTrack {
  id: string;
  title: string;
  author: string;
  description: string;
  duration: string;
  listeners: string;
  date: string;
  thumbnail: string;
  category: string;
  audioUrl?: string;
}

interface Video {
  id: string;
  title: string;
  channel: string;
  duration: string;
  views: string;
  thumbnail: string;
  embedUrl?: string;
}

const AudioLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'audio' | 'videos'>('audio');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Default audio thumbnail fallback
  const getDefaultAudioThumbnail = () => {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="300" height="200" fill="url(#grad)"/>
        <circle cx="150" cy="100" r="30" fill="rgba(255,255,255,0.2)"/>
        <polygon points="140,85 140,115 165,100" fill="white"/>
        <text x="150" y="140" text-anchor="middle" fill="white" font-family="Arial" font-size="12">Audio Track</text>
      </svg>
    `)}`
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = getDefaultAudioThumbnail();
  };

  // Sample data - replace with real data
  const audioTracks: AudioTrack[] = [
    {
      id: '1',
      title: 'इंटरनेट का जादू - कैसे काम करता है हमारा डिजिटल संसार',
      author: 'Digital Education Hindi',
      description: 'ARPANET से लेकर आज के इंटरनेट तक - समझिए कैसे काम करता है हमारा डिजिटल संसार।',
      duration: '25:30',
      listeners: '3,547',
      date: '2024-09-20',
      thumbnail: 'https://res.cloudinary.com/dgvoocfla/image/upload/c_thumb,w_300,h_200/v1758557619/%E0%A4%87%E0%A4%82%E0%A4%9F%E0%A4%B0%E0%A4%A8%E0%A5%87%E0%A4%9F_%E0%A4%95%E0%A4%BE_%E0%A4%9C%E0%A4%BE%E0%A4%A6%E0%A5%82__%E0%A4%95%E0%A5%88%E0%A4%B8%E0%A5%87_%E0%A4%95%E0%A4%BE%E0%A4%AE_%E0%A4%95%E0%A4%B0%E0%A4%A4%E0%A4%BE_%E0%A4%B9%E0%A5%88_%E0%A4%B9%E0%A4%AE%E0%A4%BE%E0%A4%B0%E0%A4%BE_%E0%A4%A1%E0%A4%BF%E0%A4%9C%E0%A4%BF%E0%A4%9F%E0%A4%B2_%E0%A4%B8%E0%A4%82%E0%A4%B8%E0%A4%BE%E0%A4%B0_-_ARPANET__kajgmt.mp4',
      category: 'Technology',
      audioUrl: 'https://res.cloudinary.com/dgvoocfla/video/upload/v1758557619/%E0%A4%87%E0%A4%82%E0%A4%9F%E0%A4%B0%E0%A4%A8%E0%A5%87%E0%A4%9F_%E0%A4%95%E0%A4%BE_%E0%A4%9C%E0%A4%BE%E0%A4%A6%E0%A5%82__%E0%A4%95%E0%A5%88%E0%A4%B8%E0%A5%87_%E0%A4%95%E0%A4%BE%E0%A4%AE_%E0%A4%95%E0%A4%B0%E0%A4%A4%E0%A4%BE_%E0%A4%B9%E0%A5%88_%E0%A4%B9%E0%A4%AE%E0%A4%BE%E0%A4%B0%E0%A4%BE_%E0%A4%A1%E0%A4%BF%E0%A4%9C%E0%A4%BF%E0%A4%9F%E0%A4%B2_%E0%A4%B8%E0%A4%82%E0%A4%B8%E0%A4%BE%E0%A4%B0_-_ARPANET__kajgmt.mp4'
    },
    {
      id: '2',
      title: 'CORS क्या है? क्यों जरूरी है? - वेब सिक्यूरिटी',
      author: 'Web Security Hindi',
      description: 'CORS की पूरी जानकारी - क्यों जरूरी है, कैसे काम करता है, और वेब सिक्यूरिटी में इसकी भूमिका।',
      duration: '18:42',
      listeners: '2,891',
      date: '2024-09-21',
      thumbnail: 'https://res.cloudinary.com/dgvoocfla/image/upload/c_thumb,w_300,h_200/v1758559504/CORS_%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A4%BE_%E0%A4%B9%E0%A5%88__%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A5%8B%E0%A4%82_%E0%A5%9B%E0%A4%B0%E0%A5%82%E0%A4%B0%E0%A5%80_%E0%A4%B9%E0%A5%88__%E0%A5%9B%E0%A5%80%E0%A4%B0%E0%A5%8B_%E0%A4%B8%E0%A5%87_%E0%A4%8F%E0%A4%A1%E0%A4%B5%E0%A4%BE%E0%A4%82%E0%A4%B8_%E0%A4%A4%E0%A4%95__%E0%A4%B5%E0%A5%87%E0%A4%AC_%E0%A4%B8%E0%A4%BF%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A5%8B%E0%A4%B0%E0%A4%BF%E0%A4%9F%E0%A5%80_vqfxlu.mp4',
      category: 'Web Security',
      audioUrl: 'https://res.cloudinary.com/dgvoocfla/video/upload/v1758559504/CORS_%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A4%BE_%E0%A4%B9%E0%A5%88__%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A5%8B%E0%A4%82_%E0%A5%9B%E0%A4%B0%E0%A5%82%E0%A4%B0%E0%A5%80_%E0%A4%B9%E0%A5%88__%E0%A5%9B%E0%A5%80%E0%A4%B0%E0%A5%8B_%E0%A4%B8%E0%A5%87_%E0%A4%8F%E0%A4%A1%E0%A4%B5%E0%A4%BE%E0%A4%82%E0%A4%B8_%E0%A4%A4%E0%A4%95__%E0%A4%B5%E0%A5%87%E0%A4%AC_%E0%A4%B8%E0%A4%BF%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A5%8B%E0%A4%B0%E0%A4%BF%E0%A4%9F%E0%A5%80_vqfxlu.mp4'
    },
  ];

  const videos: Video[] = [
    {
      id: '1',
      title: 'Machine Learning Algorithms Explained',
      channel: 'TechEd Academy',
      duration: '15:42',
      views: '1.2M',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '2',
      title: 'React Hooks Deep Dive Tutorial',
      channel: 'WebDev Masters',
      duration: '22:18',
      views: '890K',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '3',
      title: 'Cloud Computing Best Practices',
      channel: 'Cloud Academy',
      duration: '18:35',
      views: '654K',
      thumbnail: '/api/placeholder/300/200'
    }
  ];

  const filteredAudioTracks = audioTracks.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.channel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTrackClick = (track: AudioTrack) => {
    navigate(`/audio-player/${track.id}`);
  };

  return (
    <div className="audio-library">
      {/* Header */}
      <div className="library-header">
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'audio' ? 'active' : ''}`}
            onClick={() => setActiveTab('audio')}
          >
            <span className="tab-icon">🎵</span>
            Audio Library
          </button>
          <button 
            className={`tab-button ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            <span className="tab-icon">📺</span>
            Related Videos
          </button>
        </div>
        
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search educational content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Audio Library Tab */}
      {activeTab === 'audio' && (
        <div className="audio-content">
          <div className="content-header">
            <h1>
              <span className="content-icon">📊</span>
              Audio Library
            </h1>
            <div className="track-count">
              {filteredAudioTracks.length} tracks available
            </div>
          </div>

          <div className="audio-grid">
            {filteredAudioTracks.map((track) => (
              <div 
                key={track.id} 
                className="audio-card"
                onClick={() => handleTrackClick(track)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-thumbnail">
                  <img 
                    src={track.thumbnail} 
                    alt={track.title}
                    onError={handleImageError}
                  />
                  <div className="play-overlay">
                    <Play className="play-icon" size={24} />
                  </div>
                  <div className="category-badge">{track.category}</div>
                </div>
                
                <div className="card-content">
                  <h3 className="track-title">{track.title}</h3>
                  <p className="track-author">by {track.author}</p>
                  <p className="track-description">{track.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Videos Tab */}
      {activeTab === 'videos' && (
        <div className="videos-content">
          <div className="content-header">
            <h1>Related Educational Videos</h1>
            <p className="content-subtitle">
              Enhance your learning with visual tutorials and demonstrations
            </p>
          </div>

          <div className="video-featured">
            <div className="featured-video">
              <div className="video-embed">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Featured Educational Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className="video-sidebar">
              <h3>More Videos</h3>
              {filteredVideos.map((video) => (
                <div key={video.id} className="video-card-small">
                  <div className="video-thumbnail-small">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      onError={handleImageError}
                    />
                    <div className="video-duration">{video.duration}</div>
                  </div>
                  <div className="video-info-small">
                    <h4>{video.title}</h4>
                    <p>{video.channel}</p>
                    <span className="video-views">{video.views} views</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioLibrary;