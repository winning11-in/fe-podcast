import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  ListItemButton,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

import {
  Home,
  // LayoutList,
  PanelLeftOpen,
  PanelLeftClose,
  Music,
  Sun,
  Moon,
} from "lucide-react";

import type { ListItemButtonProps } from "@mui/material/ListItemButton";
import { useThemeContext } from "../../hooks/useThemeContext";

interface SidebarProps {
  collapsed?: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isMobile?: boolean;
  drawerOpen?: boolean;
  setDrawerOpen?: (open: boolean) => void;
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
  shouldForwardProp: (prop) => prop !== "$active" && prop !== "$isDarkMode",
})<StyledListItemButtonProps & { $isDarkMode?: boolean }>(
  ({ $active, $isDarkMode }) => ({
    marginBottom: 12,
    padding: "0.4em",
    paddingLeft: "10px",
    borderRadius: 10,
    transition: "background 0.2s, color 0.2s",
    background: $active ? ($isDarkMode ? "#333" : "#fff") : "inherit",
    color: $active ? ($isDarkMode ? "#90caf9" : "#3733b3") : "#fff",

    "&:hover": {
      background: $active
        ? $isDarkMode
          ? "#333"
          : "#fff"
        : $isDarkMode
        ? "#333"
        : "#3733b3",
      color: $active ? ($isDarkMode ? "#90caf9" : "#3733b3") : "#fff",
    },

    "& .MuiListItemIcon-root": {
      color: $active ? ($isDarkMode ? "#90caf9" : "#3733b3") : "#fff",
      transition: "color 0.2s",
    },
  })
);

const NAV_ITEMS = [
  { text: "Home", icon: <Home size={18} />, path: "/" },
  // { text: "Dashboard", icon: <LayoutList size={18} />, path: "/dashboard" },
  { text: "Audio Library", icon: <Music size={18} />, path: "/audio-library" },
];

const ThemeToggleButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "$isDarkMode" && prop !== "$collapsed",
})<{ $isDarkMode?: boolean; $collapsed?: boolean }>(
  ({ $isDarkMode, $collapsed }) => ({
    width: $collapsed ? 40 : "100%",
    height: $collapsed ? 40 : 48,
    borderRadius: $collapsed ? "50%" : 12,
    background: $isDarkMode
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(255, 255, 255, 0.2)",
    border: `1px solid ${
      $isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.3)"
    }`,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: $collapsed ? 0 : 12,
    padding: $collapsed ? 8 : "12px 16px",
    margin: $collapsed ? "0 auto" : 0,
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
    position: "relative",
    overflow: "hidden",

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: $isDarkMode
        ? "linear-gradient(135deg, rgba(144, 202, 249, 0.1) 0%, rgba(33, 150, 243, 0.1) 100%)"
        : "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 100%)",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },

    "&:hover": {
      background: $isDarkMode
        ? "rgba(255, 255, 255, 0.15)"
        : "rgba(255, 255, 255, 0.3)",
      borderColor: $isDarkMode
        ? "rgba(144, 202, 249, 0.4)"
        : "rgba(255, 255, 255, 0.5)",
      transform: "translateY(-1px)",
      boxShadow: $isDarkMode
        ? "0 4px 12px rgba(144, 202, 249, 0.2)"
        : "0 4px 12px rgba(255, 255, 255, 0.1)",

      "&::before": {
        opacity: 1,
      },
    },

    "&:active": {
      transform: "translateY(0)",
    },
  })
);

const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  setCollapsed,
  isMobile = false,
  drawerOpen = false,
  setDrawerOpen,
}) => {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const drawerWidth = isMobile ? 240 : (collapsed ? 64 : 240);

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? drawerOpen : true}
      onClose={isMobile ? () => setDrawerOpen?.(false) : undefined}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: isDarkMode
            ? "linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)"
            : "linear-gradient(180deg, #4440cc 0%, #3733b3 100%)",
          color: "#fff",
          padding: "0px 12px",
          borderRight: isDarkMode ? "1px solid #333" : "none",
          boxShadow: isDarkMode
            ? "2px 0 8px rgba(0,0,0,0.3)"
            : "2px 0 8px rgba(68, 64, 204, 0.2)",
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
          onClick={() => isMobile ? setDrawerOpen?.(false) : setCollapsed(!collapsed)}
          sx={{ color: "#fff", cursor: "pointer" }}
        >
          {isMobile ? (
            <PanelLeftClose size={22} />
          ) : collapsed ? (
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
                  $isDarkMode={isDarkMode}
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

      {/* Theme Toggle - only show on desktop */}
      {!isMobile && (
        <Box
          sx={{
            mt: "auto",
            mb: 2,
            px: 2,
            display: "flex",
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <ThemeToggleButton
            $isDarkMode={isDarkMode}
            $collapsed={collapsed}
            onClick={toggleTheme}
            disableRipple
          >
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            {!collapsed && (
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#fff",
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                {isDarkMode ? "Dark Mode" : "Light Mode"}
              </Typography>
            )}
          </ThemeToggleButton>
        </Box>
      )}
    </Drawer>
  );
};

export default Sidebar;
