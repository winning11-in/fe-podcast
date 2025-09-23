import React, { useState, useEffect, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { AudioTrackService } from "./services/audioTrackService";
import type { AudioTrack } from "./types";

// Lazy load components for better performance
const TopNavigation = React.lazy(() =>
  import("./components/TopNavigation").then((m) => ({
    default: m.TopNavigation,
  }))
);
const AlbumArt = React.lazy(() =>
  import("./components/AlbumArt").then((m) => ({ default: m.AlbumArt }))
);

const ProgressBar = React.lazy(() =>
  import("./components/ProgressBar").then((m) => ({ default: m.ProgressBar }))
);
const ControlPanel = React.lazy(() =>
  import("./components/ControlPanel").then((m) => ({ default: m.ControlPanel }))
);
const ErrorState = React.lazy(() =>
  import("./components/ErrorState").then((m) => ({ default: m.ErrorState }))
);

import "./AudioPlayer.css";

const AudioPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [track, setTrack] = useState<AudioTrack | undefined>(undefined);
  const [trackError, setTrackError] = useState<string | null>(null);
  const [isLoadingTrack, setIsLoadingTrack] = useState<boolean>(true);

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
            const isValidUrl = await AudioTrackService.validateAudioUrl(
              foundTrack.audioUrl
            );
            if (!isValidUrl) {
              console.warn(
                "Audio URL validation failed, but proceeding with track load"
              );
              // We'll still proceed to load the track and let the audio element handle errors
            }
          } catch (validationError) {
            console.warn(
              "Audio URL validation threw error, but proceeding:",
              validationError
            );
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
    navigate(-1);
  };

  if (isLoadingTrack) {
    return (
      <div className="fullscreen-audio-player">
        <Suspense fallback={<div>Loading navigation...</div>}>
          <TopNavigation onBack={handleBack} track={track} />
        </Suspense>

        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading audio track...</p>
          <p className="loading-subtext">
            Preparing audio player for direct access
          </p>
        </div>
      </div>
    );
  }

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
      <div
        className="blurred-background"
        style={{
          backgroundImage: `url(${track.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <audio
        ref={audioRef}
        src={track.audioUrl}
        preload="metadata"
        crossOrigin="anonymous"
      />

      <Suspense fallback={<div>Loading navigation...</div>}>
        <TopNavigation onBack={handleBack} track={track} />
      </Suspense>

      <div className="content-overlay">
        <div className="left-content">
          <Suspense fallback={<div>Loading album art...</div>}>
            <AlbumArt />
          </Suspense>
        </div>
      </div>

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
            disabled={state.isLoading || !track.audioUrl}
          />
        </Suspense>
      </div>

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
