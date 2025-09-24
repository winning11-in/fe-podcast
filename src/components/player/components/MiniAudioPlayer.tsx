import React from "react";
import { Box, IconButton, Typography, Avatar, Slider, useMediaQuery, useTheme } from "@mui/material";
import { Play, Pause, SkipBack, SkipForward, Maximize2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import {
  setPlaying,
  setCurrentTime,
  setShowMiniPlayer,
} from "../../../store/audioSlice";
import MobileMiniAudioPlayer from "./MobileMiniAudioPlayer";

const MiniAudioPlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { currentTrack, isPlaying, currentTime, duration, showMiniPlayer } =
    useAppSelector((state) => state.audio);

  if (!showMiniPlayer || !currentTrack) {
    return null;
  }

  // Render mobile version for small screens
  if (isMobile) {
    return <MobileMiniAudioPlayer />;
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

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 360,
        background:
          "linear-gradient(135deg, rgb(26, 26, 26) 0%, rgba(102, 126, 234, 0.03) 100%)",
        backdropFilter: "blur(24px)",
        borderRadius: "20px",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow:
          "0 25px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 255, 255, 0.1)",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        zIndex: 1200,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow:
            "0 30px 100px rgba(0, 0, 0, 0.7), 0 0 50px rgba(255, 255, 255, 0.15)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            fontWeight: 600,
            fontSize: "12px",
          }}
        >
          NOW PLAYING
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={() => {
              navigate(`/audio-player/${currentTrack.id}`);
              dispatch(setShowMiniPlayer(false));
            }}
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              borderRadius: "50%",
              padding: "6px",
              transition: "all 0.2s ease",
              "&:hover": {
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <Maximize2 size={16} />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(setPlaying(false));
              dispatch(setShowMiniPlayer(false));
            }}
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              borderRadius: "50%",
              padding: "6px",
              transition: "all 0.2s ease",
              "&:hover": {
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <X size={16} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Avatar
          src={currentTrack.thumbnail}
          alt={currentTrack.title}
          sx={{
            width: 120,
            height: 120,
            borderRadius: "16px",
            border: "3px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
      </Box>

      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography
          variant="body1"
          sx={{
            color: "white",
            fontWeight: 600,
            fontSize: "16px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            mb: 0.5,
          }}
        >
          {currentTrack.title}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={handleSkipBackward}
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              borderRadius: "50%",
              padding: "8px",
              transition: "all 0.2s ease",
              "&:hover": {
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transform: "scale(1.1)",
              },
            }}
          >
            <SkipBack size={20} />
          </IconButton>
          <IconButton
            onClick={handlePlayPause}
            sx={{
              color: "white",
              backgroundColor: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
              borderRadius: "50%",
              padding: "12px",
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
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </IconButton>
          <IconButton
            onClick={handleSkipForward}
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              borderRadius: "50%",
              padding: "8px",
              transition: "all 0.2s ease",
              "&:hover": {
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transform: "scale(1.1)",
              },
            }}
          >
            <SkipForward size={20} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, mb: 2 }}>
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "12px",
            fontFamily: "monospace",
          }}
        >
          {formatTime(currentTime)}
        </Typography>
        <Slider
          value={currentTime}
          max={duration}
          onChange={(_, newValue) =>
            dispatch(setCurrentTime(newValue as number))
          }
          sx={{
            flex: 1,
            color: "#fff",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 12,
              height: 12,
              backgroundColor: "#fff",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              },
            },
            "& .MuiSlider-track": {
              backgroundColor: "#fff",
              height: 4,
            },
            "& .MuiSlider-rail": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              height: 4,
            },
          }}
        />
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "12px",
            fontFamily: "monospace",
          }}
        >
          {formatTime(duration)}
        </Typography>
      </Box>
    </Box>
  );
};

export default MiniAudioPlayer;
