import React from 'react';
import { Box, IconButton, Typography, Avatar } from '@mui/material';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import {
  setPlaying,
  setCurrentTime,
  setShowMiniPlayer,
} from '../../../store/audioSlice';

const MiniAudioPlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentTrack, isPlaying, currentTime, duration, showMiniPlayer } = useAppSelector(
    (state) => state.audio
  );

  if (!showMiniPlayer || !currentTrack) {
    return null;
  }

  const formatTime = (time: number): string => {
    if (!isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    dispatch(setPlaying(!isPlaying));
  };

  const handleSkipForward = () => {
    const newTime = Math.min(currentTime + 15, duration);
    dispatch(setCurrentTime(newTime));
  };

  const handleSkipBackward = () => {
    const newTime = Math.max(currentTime - 15, 0);
    dispatch(setCurrentTime(newTime));
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 360,
         backgroundColor: 'rgba(28, 28, 28, 0.95)',
        backdropFilter: 'blur(24px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 20px',
        zIndex: 1200,
      }}
    >
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography
          variant="caption"
          sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600, fontSize: '12px' }}
        >
          NOW PLAYING
        </Typography>
        <IconButton
          onClick={() => {
            navigate(`/audio-player/${currentTrack.id}`);
            dispatch(setShowMiniPlayer(false));
          }}
          sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
        >
          <Maximize2 size={16} />
        </IconButton>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Thumbnail */}
        <Avatar
          src={currentTrack.thumbnail}
          alt={currentTrack.title}
          sx={{
            width: 60,
            height: 60,
            borderRadius: '8px',
          }}
        />

        {/* Track Info */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body1"
            sx={{
              color: 'white',
              fontWeight: 600,
              fontSize: '14px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {currentTrack.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '12px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {currentTrack.author}
          </Typography>
        </Box>

        {/* Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={handleSkipBackward}
            sx={{ color: 'white' }}
          >
            <SkipBack size={18} />
          </IconButton>
          <IconButton
            onClick={handlePlayPause}
            sx={{ color: 'white' }}
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </IconButton>
          <IconButton
            onClick={handleSkipForward}
            sx={{ color: 'white' }}
          >
            <SkipForward size={18} />
          </IconButton>
          <IconButton sx={{ color: 'white' }}>
            <Volume2 size={18} />
          </IconButton>
        </Box>
      </Box>

      {/* Progress Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
        <Typography
          variant="caption"
          sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px', fontFamily: 'monospace' }}
        >
          {formatTime(currentTime)}
        </Typography>
        <Box
          sx={{
            flex: 1,
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '2px',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${progressPercentage}%`,
              backgroundColor: '#fff',
              borderRadius: '2px',
            }}
          />
        </Box>
        <Typography
          variant="caption"
          sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px', fontFamily: 'monospace' }}
        >
          {formatTime(duration)}
        </Typography>
      </Box>
    </Box>
  );
};

export default MiniAudioPlayer;