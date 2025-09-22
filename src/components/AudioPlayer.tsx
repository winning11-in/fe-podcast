import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ArrowLeft,
  //   Clock,
  //   Users,
  //   Calendar
} from "lucide-react";
import "./AudioPlayer.css";

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

const AudioPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sample data - in real app, fetch from API or context
  const audioTracks: AudioTrack[] = [
    {
      id: "1",
      title: "इंटरनेट का जादू - कैसे काम करता है हमारा डिजिटल संसार",
      author: "Digital Education Hindi",
      description:
        "ARPANET से लेकर आज के इंटरनेट तक - समझिए कैसे काम करता है हमारा डिजिटल संसार। इस एपिसोड में हम जानेंगे कि कैसे इंटरनेट का विकास हुआ, TCP/IP प्रोटोकॉल कैसे काम करता है, और कैसे डेटा पैकेट्स की मदद से information transfer होती है।",
      duration: "25:30",
      listeners: "3,547",
      date: "2024-09-20",
      thumbnail:
        "https://res.cloudinary.com/dgvoocfla/video/upload/v1758557619/%E0%A4%87%E0%A4%82%E0%A4%9F%E0%A4%B0%E0%A4%A8%E0%A5%87%E0%A4%9F_%E0%A4%95%E0%A4%BE_%E0%A4%9C%E0%A4%BE%E0%A4%A6%E0%A5%82__%E0%A4%95%E0%A5%88%E0%A4%B8%E0%A5%87_%E0%A4%95%E0%A4%BE%E0%A4%AE_%E0%A4%95%E0%A4%B0%E0%A4%A4%E0%A4%BE_%E0%A4%B9%E0%A5%88_%E0%A4%B9%E0%A4%AE%E0%A4%BE%E0%A4%B0%E0%A4%BE_%E0%A4%A1%E0%A4%BF%E0%A4%9C%E0%A4%BF%E0%A4%9F%E0%A4%B2_%E0%A4%B8%E0%A4%82%E0%A4%B8%E0%A4%BE%E0%A4%B0_-_ARPANET__kajgmt.mp4",
      category: "Technology",
      audioUrl:
        "https://res.cloudinary.com/dgvoocfla/video/upload/v1758557619/%E0%A4%87%E0%A4%82%E0%A4%9F%E0%A4%B0%E0%A4%A8%E0%A5%87%E0%A4%9F_%E0%A4%95%E0%A4%BE_%E0%A4%9C%E0%A4%BE%E0%A4%A6%E0%A5%82__%E0%A4%95%E0%A5%88%E0%A4%B8%E0%A5%87_%E0%A4%95%E0%A4%BE%E0%A4%AE_%E0%A4%95%E0%A4%B0%E0%A4%A4%E0%A4%BE_%E0%A4%B9%E0%A5%88_%E0%A4%B9%E0%A4%AE%E0%A4%BE%E0%A4%B0%E0%A4%BE_%E0%A4%A1%E0%A4%BF%E0%A4%9C%E0%A4%BF%E0%A4%9F%E0%A4%B2_%E0%A4%B8%E0%A4%82%E0%A4%B8%E0%A4%BE%E0%A4%B0_-_ARPANET__kajgmt.mp4",
    },
    {
      id: "2",
      title: "CORS क्या है? क्यों जरूरी है? - वेब सिक्यूरिटी",
      author: "Web Security Hindi",
      description:
        "CORS (Cross-Origin Resource Sharing) की पूरी जानकारी - क्यों जरूरी है, कैसे काम करता है, और वेब सिक्यूरिटी में इसकी भूमिका। Same-Origin Policy से लेकर modern web security तक का सफर।",
      duration: "18:42",
      listeners: "2,891",
      date: "2024-09-21",
      thumbnail:
        "https://res.cloudinary.com/dgvoocfla/image/upload/c_thumb,w_400,h_300/v1758559504/CORS_%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A4%BE_%E0%A4%B9%E0%A5%88__%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A5%8B%E0%A4%82_%E0%A5%9B%E0%A4%B0%E0%A5%82%E0%A4%B0%E0%A5%80_%E0%A4%B9%E0%A5%88__%E0%A5%9B%E0%A5%80%E0%A4%B0%E0%A5%8B_%E0%A4%B8%E0%A5%87_%E0%A4%8F%E0%A4%A1%E0%A4%B5%E0%A4%BE%E0%A4%82%E0%A4%B8_%E0%A4%A4%E0%A4%95__%E0%A4%B5%E0%A5%87%E0%A4%AC_%E0%A4%B8%E0%A4%BF%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A5%8B%E0%A4%B0%E0%A4%BF%E0%A4%9F%E0%A5%80_vqfxlu.mp4",
      category: "Web Security",
      audioUrl:
        "https://res.cloudinary.com/dgvoocfla/video/upload/v1758559504/CORS_%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A4%BE_%E0%A4%B9%E0%A5%88__%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A5%8B%E0%A4%82_%E0%A5%9B%E0%A4%B0%E0%A5%82%E0%A4%B0%E0%A5%80_%E0%A4%B9%E0%A5%88__%E0%A5%9B%E0%A5%80%E0%A4%B0%E0%A5%8B_%E0%A4%B8%E0%A5%87_%E0%A4%8F%E0%A4%A1%E0%A4%B5%E0%A4%BE%E0%A4%82%E0%A4%B8_%E0%A4%A4%E0%A4%95__%E0%A4%B5%E0%A5%87%E0%A4%AC_%E0%A4%B8%E0%A4%BF%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A5%8B%E0%A4%B0%E0%A4%BF%E0%A4%9F%E0%A5%80_vqfxlu.mp4",
    },
  ];

  const track = audioTracks.find((t) => t.id === id);

  useEffect(() => {
    if (audioRef.current && track?.audioUrl) {
      const audio = audioRef.current;

      console.log("Audio element:", audio);
      console.log("Audio src:", audio.src);
      console.log("Track audioUrl:", track.audioUrl);

      const handleLoadedMetadata = () => {
        console.log("Metadata loaded - Duration:", audio.duration);
        setDuration(audio.duration);
        setIsLoading(false);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };

      const handleError = (e: Event) => {
        console.error("Audio error:", e);
        setIsLoading(false);
      };

      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("error", handleError);

      return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("error", handleError);
      };
    }
  }, [track]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const togglePlayPause = () => {
    console.log("Toggle play/pause called, isPlaying:", isPlaying);
    if (audioRef.current) {
      console.log("Audio element exists");
      if (isPlaying) {
        console.log("Pausing audio");
        audioRef.current.pause();
      } else {
        console.log("Playing audio");
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    } else {
      console.log("Audio element not found");
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Handle seek called:", e.target.value);
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      console.log("Setting audio currentTime to:", time);
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

//   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const vol = parseFloat(e.target.value);
//     setVolume(vol);
//     if (audioRef.current) {
//       audioRef.current.volume = vol;
//     }
//     setIsMuted(vol === 0);
//   };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 15,
        duration
      );
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 15,
        0
      );
    }
  };

  if (!track) {
    return (
      <div className="audio-player-error">
        <h2>Track Not Found</h2>
        <button onClick={() => navigate("/audio-library")}>
          Back to Library
        </button>
      </div>
    );
  }

  return (
    <div className="fullscreen-audio-player">
      <audio ref={audioRef} src={track.audioUrl} preload="metadata" />

      {/* Background Image */}
      <div className="background-container">
        <img
          src={track.thumbnail}
          alt={track.title}
          className="background-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "data:image/svg+xml," +
              encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
                <rect width="400" height="300" fill="#667eea"/>
                <circle cx="200" cy="150" r="60" fill="white" opacity="0.8"/>
                <polygon points="180,120 180,180 220,150" fill="#667eea"/>
              </svg>
            `);
          }}
        />
        <div className="background-overlay"></div>
      </div>

      {/* Top Navigation */}
      <div className="top-navigation">
        <button onClick={() => navigate("/audio-library")} className="back-btn">
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Main Content Overlay */}
      <div className="content-overlay">
        {/* Left Side - Album Art & Info */}
        <div className="left-content">
          <div className="album-art">
            <img
              src={track.thumbnail}
              alt={track.title}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "data:image/svg+xml," +
                  encodeURIComponent(`
                  <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
                    <rect width="400" height="300" fill="#20B2AA"/>
                    <circle cx="200" cy="150" r="60" fill="white" opacity="0.9"/>
                    <polygon points="180,120 180,180 220,150" fill="#20B2AA"/>
                  </svg>
                `);
              }}
            />
          </div>
        </div>

        {/* Right Side - Track Info & Description */}
        <div className="right-content">
          <div className="track-details">
            <h1 className="track-title">{track.title}</h1>
            <p className="track-artist">{track.author}</p>

            <div className="track-description">
              <p>{track.description}</p>
            </div>

            {/* <div className="track-metadata">
              <div className="metadata-item">
                <Clock size={16} />
                <span>{track.duration}</span>
              </div>
              <div className="metadata-item">
                <Users size={16} />
                <span>{track.listeners} listeners</span>
              </div>
              <div className="metadata-item">
                <Calendar size={16} />
                <span>{track.date}</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="bottom-controls">
        {/* Debug Info */}
        {/* <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '12px',
          zIndex: 1000
        }}>
          <div>Loading: {isLoading ? 'Yes' : 'No'}</div>
          <div>Playing: {isPlaying ? 'Yes' : 'No'}</div>
          <div>Current Time: {currentTime.toFixed(1)}s</div>
          <div>Duration: {duration.toFixed(1)}s</div>
          <div>Audio URL: {track?.audioUrl ? 'Set' : 'Not set'}</div>
        </div> */}

        {/* Track Info for Mobile */}
        <div className="mobile-track-info">
          <h2 className="mobile-track-title">{track.title}</h2>
          <p className="mobile-track-artist">{track.author}</p>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            onInput={handleSeek}
            className="progress-slider"
            disabled={isLoading}
            step="0.1"
          />
        </div>
        <div className="time-display-container">
          <span className="current-time">
            {formatTime(currentTime) || "0:00"} /{" "}
            {formatTime(duration) || "0:00"}
          </span>
          {/* <span className="total-time">
            {duration > 0 ? duration.toFixed(1) + "s" : "Loading..."}
          </span> */}
        </div>

        {/* Control Buttons */}
        <div className="control-panel">
          <div className="left-controls">
            <button className="control-btn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
            <button className="control-btn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </button>
          </div>

          <div className="main-controls">
            <button onClick={skipBackward} className="skip-btn">
              <SkipBack size={20} />
            </button>

            <button
              onClick={togglePlayPause}
              className="play-pause-btn"
              disabled={isLoading || !track.audioUrl}
            >
              {isLoading ? (
                <div className="loading-spinner" />
              ) : isPlaying ? (
                <Pause size={24} />
              ) : (
                <Play size={24} />
              )}
            </button>

            <button onClick={skipForward} className="skip-btn">
              <SkipForward size={20} />
            </button>
          </div>

          <div className="right-controls">
            <button onClick={toggleMute} className="volume-btn">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button className="menu-btn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 12h18v2H3zm0-5h18v2H3zm0 10h18v2H3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
