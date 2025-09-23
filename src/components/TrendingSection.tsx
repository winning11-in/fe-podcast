import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Clock, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { INTERNET_AUDIO, WEB_DEVELOPMENT } from "../utils/Audio";

const cardData = [
  {
    id: "1",
    tag: "Tech History",
    image: "/assets/Internet.png",
    audio: INTERNET_AUDIO,
    title: "Introduction to Internet",
    author: "DPK",
    time: "25:30",
    plays: "12.4K",
  },
  {
    id: "2",
    tag: "Web Development",
    image: "/assets/web-d.png",
    audio: WEB_DEVELOPMENT,
    title: "Web Development Essentials",
    author: "AJ",
    time: "18:42",
    plays: "8.9K",
  },
  {
    id: "3",
    tag: "AI/ML",
    image: "/assets/ml.png",
    audio: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    title: "Machine Learning Basics",
    author: "Sarah Chen",
    time: "3:30",
    plays: "15.2K",
  },
];

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

const PlayInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(1),
  fontSize: "0.85rem",
  color: theme.palette.text.secondary,
}));

export default function TrendingSection() {
  const navigate = useNavigate();

  return (
    <SectionContainer>
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        gap={1}
      >
        <Flame size={20} color="#00BFA6" />
        <Typography variant="h6" fontWeight={600}>
          Trending Now
        </Typography>
        <Chip
          label="Hot Topics"
          size="small"
          color="success"
          variant="outlined"
        />
      </Box>

      <CardsWrapper>
        {cardData.map((card, idx) => (
          <StyledCard key={idx} onClick={() => navigate(`/audio-player/${card.id}`)} sx={{ cursor: "pointer" }}>
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="180"
                image={card.image}
                alt={card.title}
              />
              <StyledChip label={card.tag} color="primary" />
            </Box>
            <CardContent sx={{ textAlign: "left" }}>
              <Typography variant="h6" fontWeight={600}>
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.author}
              </Typography>

              <PlayInfo>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Clock size={16} />
                  <Typography variant="body2" color="text.secondary">
                    {card.time}
                  </Typography>
                </Box>
                <Typography color="success.main" fontWeight={600}>
                  {card.plays} plays
                </Typography>
              </PlayInfo>
            </CardContent>
          </StyledCard>
        ))}
      </CardsWrapper>
    </SectionContainer>
  );
}
