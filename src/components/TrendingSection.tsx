import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Clock, Flame, Play, Pause } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { INTERNET_AUDIO, WEB_DEVELOPMENT } from "../utils/Audio";

const cardData = [
  {
    tag: "Frontend",
    image: "/assets/hook.png",
    audio: INTERNET_AUDIO,
    title: "Introduction to Internet",
    author: "DPK",
    time: "38:15",
    plays: "12.4K",
  },
  {
    tag: "DevOps",
    image: "/assets/cloud.png",
    audio: WEB_DEVELOPMENT,
    title: "Web Development Essentials",
    author: "AJ",
    time: "52:20",
    plays: "8.9K",
  },
  {
    tag: "AI/ML",
    image: "/assets/ml.png",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    title: "Machine Learning Basics",
    author: "Sarah Chen",
    time: "45:30",
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

const ProgressWrapper = styled(Box)(() => ({
  marginTop: 8,
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // create audio element once
    audioRef.current = new Audio();

    const audio = audioRef.current;

    const onTimeUpdate = () => setTime(audio.currentTime || 0);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setIsPlaying(false);
      setTime(0);
      setCurrentIndex(null);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audioRef.current = null;
    };
  }, []);

  const togglePlay = (idx: number, src?: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    // if switching to a different track
    if (currentIndex !== idx) {
      // switch source and start playing
      audio.src = src || "";
      audio.currentTime = 0;
      audio
        .play()
        .then(() => {
          setCurrentIndex(idx);
          setIsPlaying(true);
        })
        .catch(() => {
          // play failed (autoplay policy) - mark index so UI reflects user intent
          setCurrentIndex(idx);
          setIsPlaying(false);
        });
      return;
    }

    // same track -> toggle
    if (audio.paused) {
      audio.play();
      // will be set by play event
    } else {
      audio.pause();
      // will be set by pause event
    }
  };

  const seek = (percent: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = (percent / 100) * duration;
  };

  const onProgressClick = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget as HTMLDivElement;
    const rect = el.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    seek(percent);
  };

  const formatTime = (sec: number) => {
    if (!sec || Number.isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

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
          <StyledCard key={idx}>
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="180"
                image={card.image}
                alt={card.title}
              />
              <StyledChip label={card.tag} color="primary" />
              <PlayButton
                aria-label={
                  currentIndex === idx && isPlaying ? "pause" : "play"
                }
                onClick={() => togglePlay(idx, card.audio)}
                size="large"
              >
                {currentIndex === idx && isPlaying ? (
                  <Pause size={22} />
                ) : (
                  <Play size={22} />
                )}
              </PlayButton>
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
                  {/* show running time if this card is playing, otherwise show total time from data */}
                  <Typography variant="body2" color="text.secondary">
                    {currentIndex === idx ? formatTime(time) : card.time}
                  </Typography>
                </Box>
                <Typography color="success.main" fontWeight={600}>
                  {card.plays} plays
                </Typography>
              </PlayInfo>

              {/* progress bar for current playing track */}
              {currentIndex === idx && (
                <ProgressWrapper>
                  <LinearProgress
                    variant="determinate"
                    value={duration ? (time / duration) * 100 : 0}
                    sx={{ height: 6, borderRadius: 3 }}
                    onClick={onProgressClick}
                  />
                  <Box display="flex" justifyContent="space-between" mt={0.5}>
                    <Typography variant="caption">
                      {formatTime(time)}
                    </Typography>
                    <Typography variant="caption">
                      {formatTime(duration)}
                    </Typography>
                  </Box>
                </ProgressWrapper>
              )}
            </CardContent>
          </StyledCard>
        ))}
      </CardsWrapper>
    </SectionContainer>
  );
}
