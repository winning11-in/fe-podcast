import { Clock } from "lucide-react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ContentHeader, ContentTitle } from "./AudioLibrary.styles";
import { useNavigate } from "react-router-dom";

interface VideoItem {
  id: string;
  title: string;
  author: string;
  description: string;
  duration: string;
  views: string;
  date: string;
  youtubeId: string;
  category: string;
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
  zIndex: 1,
}));

const VideoContainer = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  height: "180px",
  overflow: "hidden",
}));

const PlayInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(1),
  fontSize: "0.85rem",
  color: theme.palette.text.secondary,
}));

const VideoLibrary = () => {
  const navigate = useNavigate();

  const handleVideoClick = (video: VideoItem) => {
    navigate(`/video-player/${video.id}`);
  };

  const videoItems: VideoItem[] = [
    {
      id: "1",
      title: "React Tutorial for Beginners",
      author: "Traversy Media",
      description: "Learn React from scratch with this comprehensive tutorial.",
      duration: "1:45:30",
      views: "2.5M",
      date: "2024-09-20",
      youtubeId: "Ke90Tje7VS0",
      category: "React",
    },
    {
      id: "2",
      title: "JavaScript Fundamentals",
      author: "freeCodeCamp",
      description: "Master the fundamentals of JavaScript programming.",
      duration: "3:20:15",
      views: "5.1M",
      date: "2024-09-21",
      youtubeId: "PkZNo7MFNFg",
      category: "JavaScript",
    },
    {
      id: "3",
      title: "CSS Grid Tutorial",
      author: "Kevin Powell",
      description: "Learn CSS Grid with practical examples and projects.",
      duration: "45:22",
      views: "1.8M",
      date: "2024-09-22",
      youtubeId: "0-DYpTmF7Dk",
      category: "CSS",
    },
  ];

  return (
    <SectionContainer>
      <ContentHeader>
        <ContentTitle variant="h4">Video Library</ContentTitle>
      </ContentHeader>
      <CardsWrapper>
        {videoItems.map((video) => (
          <StyledCard key={video.id} onClick={() => handleVideoClick(video)} sx={{ cursor: "pointer" }}>
            <VideoContainer>
              <iframe
                width="100%"
                height="180"
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: "16px 16px 0 0" }}
              />
              <StyledChip label={video.category} color="primary" />
            </VideoContainer>
            <CardContent sx={{ textAlign: "left" }}>
              <Typography variant="h6" fontWeight={600}>
                {video.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {video.author}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {video.description}
              </Typography>
              <PlayInfo>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Clock size={16} />
                  <Typography variant="body2" color="text.secondary">
                    {video.duration}
                  </Typography>
                </Box>
                <Typography color="success.main" fontWeight={600}>
                  {video.views} views
                </Typography>
              </PlayInfo>
            </CardContent>
          </StyledCard>
        ))}
      </CardsWrapper>
    </SectionContainer>
  );
};

export default VideoLibrary;