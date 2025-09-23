import React, { useState, useEffect, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { AudioTrackService } from "./services/audioTrackService";
import type { AudioTrack } from "./types";

// Lazy load components for better performance
const Background = React.lazy(() => import("./components/Background").then(m => ({ default: m.Background })));
const TopNavigation = React.lazy(() => import("./components/TopNavigation").then(m => ({ default: m.TopNavigation })));
const AlbumArt = React.lazy(() => import("./components/AlbumArt").then(m => ({ default: m.AlbumArt })));
const TrackInfo = React.lazy(() => import("./components/TrackInfo").then(m => ({ default: m.TrackInfo })));
const ProgressBar = React.lazy(() => import("./components/ProgressBar").then(m => ({ default: m.ProgressBar })));
const ControlPanel = React.lazy(() => import("./components/ControlPanel").then(m => ({ default: m.ControlPanel })));
const ErrorState = React.lazy(() => import("./components/ErrorState").then(m => ({ default: m.ErrorState })));

import "./AudioPlayer.css";

/**
 * Main AudioPlayer component with optimized architecture for large audio files
 * Features:
 * - Code splitting for better performance
 * - Custom hooks for state management
 * - Separate service layer for data handling
 * - Modular component structure
 * - Better error handling and loading states
 * - Accessibility improvements
 */
const AudioPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [track, setTrack] = useState<AudioTrack | undefined>(undefined);
  const [trackError, setTrackError] = useState<string | null>(null);
  const [isLoadingTrack, setIsLoadingTrack] = useState<boolean>(true);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);

  const {
    audioRef,
    state,
    actions: {
      togglePlayPause,
      handleSeek,
      toggleMute,
      skipForward,
      skipBackward,
    },
    utils: { formatTime },
  } = useAudioPlayer({ track });

  // Load track data
  useEffect(() => {
    const loadTrack = async () => {
      if (!id) {
        setTrackError("No track ID provided");
        setIsLoadingTrack(false);
        return;
      }

      try {
        setIsLoadingTrack(true);
        setTrackError(null);
        
        const foundTrack = await AudioTrackService.getTrackById(id);
        if (!foundTrack) {
          setTrackError("Track not found in library");
          setIsLoadingTrack(false);
          return;
        }

        // For direct URL access, we'll validate the audio URL but be more lenient
        if (foundTrack.audioUrl) {
          try {
            const isValidUrl = await AudioTrackService.validateAudioUrl(foundTrack.audioUrl);
            if (!isValidUrl) {
              console.warn('Audio URL validation failed, but proceeding with track load');
              // We'll still proceed to load the track and let the audio element handle errors
            }
          } catch (validationError) {
            console.warn('Audio URL validation threw error, but proceeding:', validationError);
            // Continue with track loading even if validation fails
          }
        }

        setTrack(foundTrack);
        setIsLoadingTrack(false);
      } catch (error) {
        console.error("Failed to load track:", error);
        setTrackError("Failed to load track. Please try again.");
        setIsLoadingTrack(false);
      }
    };

    loadTrack();
  }, [id]);

  const handleBack = () => {
    navigate("/audio-library");
  };

  const handleToggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const handleToggleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  // Loading state - show proper loader while fetching track
  if (isLoadingTrack) {
    return (
      <div className="fullscreen-audio-player">
        <Suspense fallback={<div>Loading background...</div>}>
          <Background />
        </Suspense>
        
        <Suspense fallback={<div>Loading navigation...</div>}>
          <TopNavigation onBack={handleBack} />
        </Suspense>
        
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading audio track...</p>
          <p className="loading-subtext">Preparing audio player for direct access</p>
        </div>
      </div>
    );
  }

  // Error state - only show when there's an actual error
  if (trackError) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorState onBack={handleBack} error={trackError} />
      </Suspense>
    );
  }

  // Safety check - if no track and not loading, show error
  if (!track) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorState onBack={handleBack} error="Track data unavailable" />
      </Suspense>
    );
  }

  return (
    <div className="fullscreen-audio-player">
      {/* Hidden audio element with optimized settings for large files */}
      <audio 
        ref={audioRef} 
        src={track.audioUrl} 
        preload="metadata"
        crossOrigin="anonymous"
      />

      <Suspense fallback={<div>Loading background...</div>}>
        <Background track={track} />
      </Suspense>

      <Suspense fallback={<div>Loading navigation...</div>}>
        <TopNavigation onBack={handleBack} />
      </Suspense>

      {/* Main Content Overlay */}
      <div className="content-overlay">
        {/* Left Side - Album Art */}
        <div className="left-content">
          <Suspense fallback={<div className="album-art-skeleton">Loading art...</div>}>
            <AlbumArt track={track} />
          </Suspense>
        </div>

        {/* Right Side - Track Info & Description */}
        <div className="right-content">
          <Suspense fallback={<div>Loading track info...</div>}>
            <TrackInfo track={track} />
          </Suspense>
        </div>
      </div>  

      {/* Bottom Controls */}
      <div className="bottom-controls">
        <Suspense fallback={<div>Loading progress...</div>}>
          <ProgressBar
            currentTime={state.currentTime}
            duration={state.duration}
            buffered={state.buffered}
            isLoading={state.isLoading}
            onSeek={handleSeek}
            formatTime={formatTime}
          />
        </Suspense>

        <Suspense fallback={<div>Loading controls...</div>}>
          <ControlPanel
            state={state}
            onTogglePlayPause={togglePlayPause}
            onSkipBackward={skipBackward}
            onSkipForward={skipForward}
            onToggleMute={toggleMute}
            onToggleShuffle={handleToggleShuffle}
            onToggleRepeat={handleToggleRepeat}
            isShuffle={isShuffle}
            isRepeat={isRepeat}
            disabled={state.isLoading || !track.audioUrl}
          />
        </Suspense>
      </div>

      {/* Audio Loading Overlay - shows when audio file is loading */}
      {state.isLoading && (
        <div className="audio-loading-overlay">
          <div className="audio-loading-content">
            <div className="loading-spinner"></div>
            <p className="loading-text">Preparing audio...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
