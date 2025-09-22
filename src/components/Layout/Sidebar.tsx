import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  ListItemButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

import { Home, LayoutList, PanelLeftOpen, PanelLeftClose, Music } from "lucide-react";

import type { ListItemButtonProps } from "@mui/material/ListItemButton";

interface SidebarProps {
  collapsed?: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

interface StyledListItemButtonProps extends ListItemButtonProps {
  $active?: boolean;
}

const StyledNavLink = styled(NavLink)(() => ({
  textDecoration: "none",
  width: "100%",
  display: "block",
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "$active",
})<StyledListItemButtonProps>(({ $active }) => ({
  marginBottom: 12,
  padding: "0.4em",
  paddingLeft: "10px",
  borderRadius: 10,
  transition: "background 0.2s, color 0.2s",
  background: $active ? "#fff" : "inherit",
  color: $active ? "#3733b3" : "#fff",

  "&:hover": {
    background: $active ? "#fff" : "#3733b3",
    color: $active ? "#3733b3" : "#fff",
  },

  "& .MuiListItemIcon-root": {
    color: $active ? "#3733b3" : "#fff",
    transition: "color 0.2s",
  },
}));

const NAV_ITEMS = [
  { text: "Home", icon: <Home size={18} />, path: "/" },
  { text: "Dashboard", icon: <LayoutList size={18} />, path: "/dashboard" },
  { text: "Audio Library", icon: <Music size={18} />, path: "/audio-library" },
];

const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  setCollapsed,
}) => {
  const drawerWidth = collapsed ? 64 : 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "#4440cc",
          color: "#e6eef8",
          padding: "0px 12px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1,
          my: 2,
        }}
      >
        <Typography variant="h5" sx={{ color: "#fff" }}>
          {collapsed ? "" : "Podcasts"}
        </Typography>
        <Box
          onClick={() => setCollapsed(!collapsed)}
          sx={{ color: "#fff", cursor: "pointer" }}
        >
          {collapsed ? (
            <PanelLeftOpen size={22} />
          ) : (
            <PanelLeftClose size={22} />
          )}
        </Box>
      </Box>

      <List sx={{ mt: 4 }}>
        {NAV_ITEMS.map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
            <StyledNavLink to={path} end={path === "/"}>
              {({ isActive }) => (
                <StyledListItemButton
                  $active={isActive}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: collapsed ? "center" : "flex-start",
                    gap: collapsed ? 0 : 1,
                    px: collapsed ? "8px" : undefined,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 1 }}>
                    {icon}
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary={text} />}
                </StyledListItemButton>
              )}
            </StyledNavLink>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
