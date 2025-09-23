import React from "react";
import { Play, Clock, Grid, List, Heart, DownloadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CardContent,
  CardMedia,
  IconButton,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { INTERNET_AUDIO, WEB_DEVELOPMENT } from "../utils/Audio";
import {
  SectionContainer,
  CardsWrapper,
  StyledCard,
  StyledChip,
  PlayButton,
  ActionsRow,
  HeaderRow,
  Controls,
  SearchInput,
  ContentHeader,
  AudioContainer,
  OverlayGradient,
} from "./AudioLibrary.styled";
import { useThemeContext } from "../hooks/useThemeContext";

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

const AudioLibrary = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeContext();
  const [view, setView] = React.useState<"grid" | "list">("grid");

  const handleViewChange = (
    _event: React.MouseEvent<HTMLElement>,
    next: "grid" | "list" | null
  ) => {
    if (next) setView(next);
  };

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
    `)}`;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = getDefaultAudioThumbnail();
  };

  const audioTracks: AudioTrack[] = [
    {
      id: "1",
      title: "इंटरनेट का जादू - कैसे काम करता है हमारा डिजिटल संसार",
      author: "Digital Education Hindi",
      description:
        "ARPANET से लेकर आज के इंटरनेट तक - समझिए कैसे काम करता है हमारा डिजिटल संसार।",
      duration: "25:30",
      listeners: "3,547",
      date: "2024-09-20",
      thumbnail:
        "https://res.cloudinary.com/dj3xx136b/image/upload/v1758615092/j0maltggz7tjhnrsp5q1.png",
      category: "Technology",
      audioUrl: INTERNET_AUDIO,
    },
    {
      id: "2",
      title: "CORS क्या है? क्यों जरूरी है? - वेब सिक्यूरिटी",
      author: "Web Security Hindi",
      description:
        "CORS की पूरी जानकारी - क्यों जरूरी है, कैसे काम करता है, और वेब सिक्यूरिटी में इसकी भूमिका।",
      duration: "18:42",
      listeners: "2,891",
      date: "2024-09-21",
      thumbnail:
        "https://res.cloudinary.com/dj3xx136b/image/upload/v1758615175/txikr2f46omistu5f0rq.png",
      category: "Web Security",
      audioUrl: WEB_DEVELOPMENT,
    },
    {
      id: "3",
      title: "Machine Learning Basics",
      author: "Sarah Chen",
      description:
        "An introduction to machine learning fundamentals and key concepts.",
      duration: "3:30",
      listeners: "15.2K",
      date: "2024-09-22",
      thumbnail: "/assets/ml.png",
      category: "AI/ML",
      audioUrl:
        "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    },
  ];

  const handleTrackClick = (track: AudioTrack) => {
    navigate(`/audio-player/${track.id}`);
  };

  return (
    <SectionContainer>
      <ContentHeader>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            mb: 0.5,
            background: "linear-gradient(90deg,#00e5ff,#ff9800)",
            WebkitBackgroundClip: isDarkMode ? "text" : "initial",
            WebkitTextFillColor: isDarkMode ? "transparent" : "initial",
          }}
        >
          Audio Library
        </Typography>
      </ContentHeader>

      <HeaderRow>
        <Controls>
          <SearchInput
            placeholder="Search audio tracks..."
            inputProps={{ "aria-label": "search audio tracks" }}
          />
          <Select
            defaultValue="all"
            size="small"
            sx={{
              minWidth: 160,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00e5ff",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00bcd4",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00e5ff",
              },
            }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="technology">Technology</MenuItem>
            <MenuItem value="web-security">Web Security</MenuItem>
            <MenuItem value="ai-ml">AI/ML</MenuItem>
          </Select>
        </Controls>

        <Controls>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            size="small"
            sx={{
              background: (t) =>
                t.palette.mode === "dark"
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.05)",
              borderRadius: 2,
              padding: 0.5,
              "& .MuiToggleButton-root": {
                color: (t) => t.palette.text.secondary,
                border: "none",
                borderRadius: "8px !important",
                px: 2,
                py: 1,
                "&.Mui-selected": {
                  background: "#00e5ff",
                  color: (t) => (t.palette.mode === "dark" ? "#000" : "#fff"),
                  "&:hover": {
                    background: "#00bcd4",
                  },
                },
                "&:hover": {
                  background: (t) => t.palette.action.hover,
                },
              },
            }}
          >
            <ToggleButton value="grid" aria-label="grid view">
              <Grid size={16} />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <List size={16} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Controls>
      </HeaderRow>

      <CardsWrapper view={view}>
        {audioTracks.map((track) => (
          <StyledCard
            key={track.id}
            view={view}
            onClick={() => handleTrackClick(track)}
          >
            <AudioContainer view={view}>
              <CardMedia
                component="img"
                height={view === "list" ? 120 : 180}
                image={track.thumbnail}
                alt={track.title}
                onError={handleImageError}
              />
              <OverlayGradient />
              <StyledChip label={track.category} color="primary" />
              <PlayButton aria-label="play" size="large">
                <Play size={22} />
              </PlayButton>
            </AudioContainer>
            <CardContent
              sx={{
                textAlign: "left",
                flex: view === "list" ? 1 : undefined,
                p: view === "list" ? 2 : undefined,
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="start"
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} noWrap>
                    {track.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {track.author} • {new Date(track.date).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box>
                  <IconButton size="small" aria-label="like audio">
                    <Heart size={16} />
                  </IconButton>
                  <IconButton size="small" aria-label="download audio">
                    <DownloadCloud size={16} />
                  </IconButton>
                </Box>
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
                noWrap
              >
                {track.description}
              </Typography>

              <ActionsRow>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Clock size={16} />
                  <Typography variant="body2" color="text.secondary">
                    {track.duration}
                  </Typography>
                </Box>
                <Typography color="#00c4d6" fontWeight={600}>
                  {track.listeners} listeners
                </Typography>
              </ActionsRow>
            </CardContent>
          </StyledCard>
        ))}
      </CardsWrapper>
    </SectionContainer>
  );
};

export default AudioLibrary;
