import type { ListItemButtonProps } from "@mui/material/ListItemButton";

interface StyledListItemButtonProps extends ListItemButtonProps {
  $active?: boolean;
}
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";

import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
const StyledNavLink = styled(NavLink)(() => ({
  textDecoration: "none",
  width: "100%",
  display: "block",
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "$active",
})<StyledListItemButtonProps>(({ $active }) => ({
  marginBottom: "12px",
  paddingTop: "0.4em",
  paddingBottom: "0.4em",
  borderRadius: "10px",
  transition: "background 0.2s, color 0.2s",
  background: $active ? "#fff" : "inherit",
  color: $active ? "#222" : "#fff",
  "&:hover": {
    background: $active ? "#fff" : "#3733b3",
    color: $active ? "#222" : "#fff",
  },
  "& .MuiListItemIcon-root": {
    color: $active ? "#222" : "#fff",
    transition: "color 0.2s",
  },
}));

const drawerWidth = 240;

export default function Sidebar() {
  const navItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Dashboard", icon: <LibraryMusicIcon />, path: "/dashboard" },
  ];
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "#4440cc",
          color: "#e6eef8",
          padding: "0px 12px",
        },
      }}
    >
      <Toolbar />

      <List>
        {navItems.map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
            <StyledNavLink to={path} end={path === "/"}>
              {({ isActive }) => (
                <StyledListItemButton $active={isActive}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </StyledListItemButton>
              )}
            </StyledNavLink>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
