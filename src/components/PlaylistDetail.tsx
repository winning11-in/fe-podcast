import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  IconButton,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import {
  ArrowLeft,
  Play,
  Pause,
  Heart,
  MoreHorizontal,
  Clock,
  Music,
  Users,
  Share,
} from "lucide-react";
import { useThemeContext } from "../hooks/useThemeContext";
import { getPlaylistById, type Track } from "../utils/playlistData";
import { useAppDispatch } from "../store/hooks";
import { setCurrentTrack, setPlaying, setShowMiniPlayer } from "../store/audioSlice";

const PlaylistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isDarkMode } = useThemeContext();
  const dispatch = useAppDispatch();
  const [currentPlaying, setCurrentPlaying] = React.useState<string | null>(null);

  const playlist = id ? getPlaylistById(id) : null;

  if (!playlist) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isDarkMode
            ? "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)"
            : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Typography variant="h6" sx={{ color: isDarkMode ? "#fff" : "#000" }}>
          Playlist not found
        </Typography>
      </Box>
    );
  }

  const handlePlayTrack = (track: Track) => {
    // Set the current track in Redux store
    dispatch(setCurrentTrack(track));
    dispatch(setPlaying(true));
    dispatch(setShowMiniPlayer(true));
    setCurrentPlaying(track.id);
  };

  const handleBack = () => {
    navigate("/playlists");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      {/* Header with back button */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={handleBack}
          sx={{
            color: isDarkMode ? "#00e5ff" : "#1976d2",
            mb: 2,
            "&:hover": {
              background: isDarkMode
                ? "rgba(0,229,255,0.1)"
                : "rgba(25,118,210,0.1)",
            },
          }}
        >
          Back to Playlists
        </Button>
      </Box>

      {/* Playlist Header */}
      <Box
        sx={{
          display: "flex",
          gap: 4,
          mb: 4,
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        {/* Playlist Cover */}
        <Box
          sx={{
            width: 300,
            height: 300,
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: isDarkMode
              ? "0 20px 40px rgba(0,229,255,0.2)"
              : "0 20px 40px rgba(0,0,0,0.15)",
            position: "relative",
          }}
        >
          <CardMedia
            component="img"
            height="100%"
            image={playlist.thumbnail}
            alt={playlist.title}
            sx={{
              objectFit: "cover",
              filter: "brightness(0.9) contrast(1.1)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.3s ease",
              "&:hover": { opacity: 1 },
            }}
          >
            <IconButton
              sx={{
                background: "rgba(0,229,255,0.9)",
                color: "#000",
                width: 80,
                height: 80,
                border: "3px solid rgba(255,255,255,0.3)",
                "&:hover": {
                  background: "#00e5ff",
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 24px rgba(0,229,255,0.5)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <Play size={40} />
            </IconButton>
          </Box>
        </Box>

        {/* Playlist Info */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 2,
              background: isDarkMode
                ? "linear-gradient(90deg, #00e5ff, #ff9800)"
                : "linear-gradient(90deg, #1976d2, #42a5f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {playlist.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
              mb: 3,
              lineHeight: 1.6,
              fontSize: "1.1rem",
            }}
          >
            {playlist.description}
          </Typography>

          {/* Stats */}
          <Box sx={{ display: "flex", gap: 3, mb: 3, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Music
                size={18}
                style={{ color: isDarkMode ? "#00e5ff" : "#1976d2" }}
              />
              <Typography
                variant="body2"
                sx={{ color: isDarkMode ? "#fff" : "#000" }}
              >
                {playlist.trackCount} tracks
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Clock
                size={18}
                style={{ color: isDarkMode ? "#00e5ff" : "#1976d2" }}
              />
              <Typography
                variant="body2"
                sx={{ color: isDarkMode ? "#fff" : "#000" }}
              >
                {playlist.duration}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Users
                size={18}
                style={{ color: isDarkMode ? "#00e5ff" : "#1976d2" }}
              />
              <Typography
                variant="body2"
                sx={{ color: isDarkMode ? "#fff" : "#000" }}
              >
                {playlist.isPublic ? "Public" : "Private"}
              </Typography>
            </Box>
          </Box>

          {/* Tags */}
          <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
            {playlist.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                sx={{
                  background: isDarkMode
                    ? "rgba(0,229,255,0.1)"
                    : "rgba(25,118,210,0.1)",
                  color: isDarkMode ? "#00e5ff" : "#1976d2",
                  border: `1px solid ${
                    isDarkMode ? "rgba(0,229,255,0.3)" : "rgba(25,118,210,0.3)"
                  }`,
                }}
              />
            ))}
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              startIcon={<Play size={20} />}
              sx={{
                background: isDarkMode
                  ? "linear-gradient(90deg, #00e5ff, #ff9800)"
                  : "linear-gradient(90deg, #1976d2, #42a5f5)",
                color: "#fff",
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 24px rgba(0,229,255,0.4)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Play All
            </Button>
            <Button
              variant="outlined"
              startIcon={<Heart size={20} />}
              sx={{
                borderColor: isDarkMode
                  ? "rgba(0,229,255,0.5)"
                  : "rgba(25,118,210,0.5)",
                color: isDarkMode ? "#00e5ff" : "#1976d2",
                px: 3,
                py: 1.5,
                borderRadius: 3,
                "&:hover": {
                  borderColor: isDarkMode ? "#00e5ff" : "#1976d2",
                  background: isDarkMode
                    ? "rgba(0,229,255,0.1)"
                    : "rgba(25,118,210,0.1)",
                },
              }}
            >
              Like
            </Button>
            <Button
              variant="outlined"
              startIcon={<Share size={20} />}
              sx={{
                borderColor: isDarkMode
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(0,0,0,0.3)",
                color: isDarkMode ? "#fff" : "#000",
                px: 3,
                py: 1.5,
                borderRadius: 3,
                "&:hover": {
                  borderColor: isDarkMode ? "#fff" : "#000",
                  background: isDarkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.1)",
                },
              }}
            >
              Share
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Tracks List */}
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: isDarkMode ? "#fff" : "#000",
          }}
        >
          Tracks
        </Typography>

        <Card
          sx={{
            background: isDarkMode
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,0.9)",
            backdropFilter: "blur(20px)",
            border: `1px solid ${
              isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"
            }`,
            borderRadius: 3,
          }}
        >
          <List sx={{ py: 0 }}>
            {playlist.tracks.map((track: Track, index: number) => (
              <ListItem
                key={track.id}
                sx={{
                  borderBottom:
                    index < playlist.tracks.length - 1
                      ? `1px solid ${
                          isDarkMode
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.08)"
                        }`
                      : "none",
                  "&:hover": {
                    background: isDarkMode
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.02)",
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    src={track.thumbnail}
                    sx={{
                      width: 50,
                      height: 50,
                      mr: 2,
                      border: `2px solid ${
                        isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"
                      }`,
                    }}
                  >
                    <Music size={24} />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "medium",
                        color: isDarkMode ? "#fff" : "#000",
                        mb: 0.5,
                      }}
                    >
                      {track.title}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isDarkMode
                            ? "rgba(255,255,255,0.6)"
                            : "rgba(0,0,0,0.6)",
                        }}
                      >
                        {track.author}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: isDarkMode
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(0,0,0,0.5)",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Clock size={12} />
                        {track.duration}
                      </Typography>
                    </Box>
                  }
                />

                <ListItemSecondaryAction>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      onClick={() => handlePlayTrack(track)}
                      sx={{
                        color:
                          currentPlaying === track.id
                            ? isDarkMode
                              ? "#00e5ff"
                              : "#1976d2"
                            : isDarkMode
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(0,0,0,0.5)",
                        "&:hover": {
                          color: isDarkMode ? "#00e5ff" : "#1976d2",
                        },
                      }}
                    >
                      {currentPlaying === track.id ? (
                        <Pause size={20} />
                      ) : (
                        <Play size={20} />
                      )}
                    </IconButton>
                    <IconButton
                      sx={{
                        color: isDarkMode
                          ? "rgba(255,255,255,0.5)"
                          : "rgba(0,0,0,0.5)",
                        "&:hover": {
                          color: "#ff4081",
                        },
                      }}
                    >
                      <Heart size={18} />
                    </IconButton>
                    <IconButton
                      sx={{
                        color: isDarkMode
                          ? "rgba(255,255,255,0.5)"
                          : "rgba(0,0,0,0.5)",
                      }}
                    >
                      <MoreHorizontal size={18} />
                    </IconButton>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Card>
      </Box>
    </Box>
  );
};

export default PlaylistDetail;
