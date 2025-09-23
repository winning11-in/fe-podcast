import React from "react";
import { Play, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { INTERNET_AUDIO, WEB_DEVELOPMENT } from "../utils/Audio";
import { ContentHeader, ContentTitle } from "./AudioLibrary.styles";

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

const SectionContainer = styled(Box)(() => ({
  textAlign: "center",
}));

const CardsWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(5),
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: theme.spacing(4),
}));

const StyledCard = styled(Card)(() => ({
  borderRadius: "16px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  overflow: "hidden",
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1.5),
  left: theme.spacing(1.5),
  fontWeight: 600,
  fontSize: "0.75rem",
}));

const PlayButton = styled(IconButton)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "rgba(0,0,0,0.45)",
  color: "#fff",
  zIndex: 2,
  "&:hover": {
    background: "rgba(0,0,0,0.55)",
  },
}));

const PlayInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(1),
  fontSize: "0.85rem",
  color: theme.palette.text.secondary,
}));

const AudioLibrary = () => {
  const navigate = useNavigate();

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
        <ContentTitle variant="h4">Audio Library</ContentTitle>
      </ContentHeader>{" "}
      <CardsWrapper>
        {audioTracks.map((track) => (
          <StyledCard
            key={track.id}
            onClick={() => handleTrackClick(track)}
            sx={{ cursor: "pointer" }}
          >
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="180"
                image={track.thumbnail}
                alt={track.title}
                onError={handleImageError}
              />
              <StyledChip label={track.category} color="primary" />
              <PlayButton aria-label="play" size="large">
                <Play size={22} />
              </PlayButton>
            </Box>
            <CardContent sx={{ textAlign: "left" }}>
              <Typography variant="h6" fontWeight={600}>
                {track.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {track.author}
              </Typography>

              <PlayInfo>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Clock size={16} />
                  <Typography variant="body2" color="text.secondary">
                    {track.duration}
                  </Typography>
                </Box>
                <Typography color="success.main" fontWeight={600}>
                  {track.listeners} listeners
                </Typography>
              </PlayInfo>
            </CardContent>
          </StyledCard>
        ))}
      </CardsWrapper>
    </SectionContainer>
  );
};

export default AudioLibrary;
