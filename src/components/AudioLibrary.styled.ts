import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Chip,
  IconButton,
  InputBase,
} from "@mui/material";

export const SectionContainer = styled(Box)(() => ({
  textAlign: "left",
}));

export const CardsWrapper = styled(Box)<{ view?: "grid" | "list" }>(({ theme, view = "grid" }) => ({
  marginTop: theme.spacing(4),
  display: view === "grid" ? "grid" : "flex",
  flexDirection: view === "list" ? "column" : undefined,
  gridTemplateColumns: view === "grid" ? "repeat(auto-fit, minmax(300px, 1fr))" : undefined,
  gap: theme.spacing(view === "list" ? 2 : 3),
}));

export const StyledCard = styled(Card)<{ view?: "grid" | "list" }>(({ theme, view = "grid" }) => ({
  borderRadius: 12,
  overflow: "hidden",
  border: `1px solid ${theme.palette.divider}`,
  display: "flex",
  flexDirection: view === "list" ? "row" : "column",
  width: view === "list" ? "100%" : undefined,
  justifyContent: "space-between",
  background: "linear-gradient(135deg, rgba(0,229,255,0.05), rgba(255,152,0,0.05))",
  cursor: "pointer",
}));

export const AudioContainer = styled(Box)<{ view?: "grid" | "list" }>(({ theme, view = "grid" }) => ({
  position: "relative",
  width: view === "list" ? 200 : "100%",
  height: view === "list" ? 120 : 180,
  overflow: "hidden",
  background: theme.palette.action.hover,
  flexShrink: 0,
}));

export const OverlayGradient = styled(Box)(() => ({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: '40%',
  background: 'linear-gradient(180deg, rgba(0,229,255,0) 0%, rgba(0,229,255,0.2) 100%)',
  zIndex: 2,
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1.5),
  left: theme.spacing(1.5),
  fontWeight: 600,
  fontSize: "0.75rem",
}));

export const PlayButton = styled(IconButton)(() => ({
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

export const ActionsRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: theme.spacing(1),
}));

export const HeaderRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const Controls = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const SearchInput = styled(InputBase)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(0.5, 1.5),
  borderRadius: 8,
  border: `1px solid #00e5ff`,
  width: 360,
  '&:hover': {
    borderColor: '#00bcd4',
  },
  '&.Mui-focused': {
    borderColor: '#00e5ff',
    boxShadow: '0 0 0 2px rgba(0,229,255,0.2)',
  },
}));

export const ContentHeader = styled(Box)(() => ({
  marginBottom: "2rem",
}));

export const ContentTitle = styled("h4")<{ isDarkMode?: boolean }>(({ isDarkMode }) => ({
  fontSize: "2rem",
  fontWeight: "bold",
  margin: 0,
  background: "linear-gradient(90deg,#00e5ff,#ff9800)",
  WebkitBackgroundClip: isDarkMode ? "text" : "initial",
  WebkitTextFillColor: isDarkMode ? "transparent" : "initial",
}));