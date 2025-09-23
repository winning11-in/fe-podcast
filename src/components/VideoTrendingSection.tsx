import { Box, Typography, Card, CardContent, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Clock, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface VideoItem {
  id: string;
  title: string;
  author: string;
  duration: string;
  views: string;
  youtubeId: string;
  category: string;
}

const videoData: VideoItem[] = [
  {
    id: "1",
    title: "React Tutorial for Beginners",
    author: "Traversy Media",
    duration: "1:45:30",
    views: "2.5M",
    youtubeId: "Ke90Tje7VS0",
    category: "React",
  },
  {
    id: "2",
    title: "JavaScript Fundamentals",
    author: "freeCodeCamp",
    duration: "3:20:15",
    views: "5.1M",
    youtubeId: "PkZNo7MFNFg",
    category: "JavaScript",
  },
  {
    id: "3",
    title: "CSS Grid Tutorial",
    author: "Kevin Powell",
    duration: "45:22",
    views: "1.8M",
    youtubeId: "0-DYpTmF7Dk",
    category: "CSS",
  },
];

const SectionContainer = styled(Box)(() => ({
  textAlign: "center",
  marginBottom: "40px",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 700,
  marginBottom: theme.spacing(4),
  color: theme.palette.text.primary,
}));

const CardsWrapper = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: theme.spacing(3),
  marginTop: theme.spacing(3),
}));

const StyledCard = styled(Card)(() => ({
  borderRadius: "16px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  overflow: "hidden",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
  },
}));

const VideoContainer = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  height: "180px",
  overflow: "hidden",
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1.5),
  left: theme.spacing(1.5),
  fontWeight: 600,
  fontSize: "0.75rem",
  backgroundColor: "#ff6b35",
  color: "#fff",
  zIndex: 1,
}));

const TrendingChip = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1.5),
  right: theme.spacing(1.5),
  fontWeight: 600,
  fontSize: "0.75rem",
  backgroundColor: "#ff4757",
  color: "#fff",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  gap: "4px",
}));

const PlayInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(1),
  fontSize: "0.85rem",
  color: theme.palette.text.secondary,
}));

const VideoTrendingSection = () => {
  const navigate = useNavigate();

  const handleVideoClick = (videoId: string) => {
    navigate(`/video-player/${videoId}`);
  };

  return (
    <SectionContainer>
      <SectionTitle variant="h4">Trending Videos</SectionTitle>
      <CardsWrapper>
        {videoData.map((video) => (
          <StyledCard key={video.id} onClick={() => handleVideoClick(video.id)}>
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
              <StyledChip label={video.category} />
              <TrendingChip icon={<Flame size={14} />} label="Trending" />
            </VideoContainer>
            <CardContent sx={{ textAlign: "left", pb: 2 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                {video.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {video.author}
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

export default VideoTrendingSection;
