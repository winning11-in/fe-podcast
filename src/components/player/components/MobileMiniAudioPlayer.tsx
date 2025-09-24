import React from "react";
import { Box, IconButton, Typography, Avatar } from "@mui/material";
import { Play, Pause, SkipBack, SkipForward, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import {
  setPlaying,
  setCurrentTime,
  setShowMiniPlayer,
} from "../../../store/audioSlice";

const MobileMiniAudioPlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentTrack, isPlaying, currentTime, duration, showMiniPlayer } =
    useAppSelector((state) => state.audio);

  if (!showMiniPlayer || !currentTrack) {
    return null;
  }

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

  const handleNavigateToPlayer = () => {
    navigate(`/audio-player/${currentTrack.id}`);
    dispatch(setShowMiniPlayer(false));
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: 80,
        background:
          "linear-gradient(135deg, rgb(26, 26, 26) 0%, rgba(102, 126, 234, 0.03) 100%)",
        backdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        padding: "12px 16px",
        zIndex: 1200,
        transition: "all 0.3s ease-in-out",
      }}
    >
      {/* Close button */}
      <IconButton
        onClick={() => {
          dispatch(setPlaying(false));
          dispatch(setShowMiniPlayer(false));
        }}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "rgba(255, 255, 255, 0.7)",
          borderRadius: "50%",
          padding: "4px",
          transition: "all 0.2s ease",
          "&:hover": {
            color: "white",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <X size={14} />
      </IconButton>

      {/* Thumbnail and Track info - Clickable to navigate */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          minWidth: 0,
          cursor: "pointer",
          mr: 1,
        }}
        onClick={handleNavigateToPlayer}
      >
        <Avatar
          src={currentTrack.thumbnail}
          alt={currentTrack.title}
          sx={{
            width: 56,
            height: 56,
            borderRadius: "8px",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            mr: 2,
          }}
        />

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body1"
            sx={{
              color: "white",
              fontWeight: 600,
              fontSize: "12px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              mb: 0.5,
            }}
          >
            {currentTrack.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "12px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {currentTrack.author || "Unknown Author"}
          </Typography>
        </Box>
      </Box>

      {/* Controls */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: 1 }}>
        <IconButton
          onClick={handleSkipBackward}
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            borderRadius: "50%",
            padding: "6px",
            transition: "all 0.2s ease",
            "&:hover": {
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              transform: "scale(1.1)",
            },
          }}
        >
          <SkipBack size={18} />
        </IconButton>

        <IconButton
          onClick={handlePlayPause}
          sx={{
            color: "white",
            backgroundColor: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
            borderRadius: "50%",
            padding: "10px",
            boxShadow: "0 4px 20px rgba(255, 107, 107, 0.4)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: "0 6px 30px rgba(255, 107, 107, 0.6)",
            },
            "&:active": {
              transform: "scale(0.95)",
            },
          }}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </IconButton>

        <IconButton
          onClick={handleSkipForward}
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            borderRadius: "50%",
            padding: "6px",
            transition: "all 0.2s ease",
            "&:hover": {
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              transform: "scale(1.1)",
            },
          }}
        >
          <SkipForward size={18} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MobileMiniAudioPlayer;
