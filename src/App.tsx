import "./styles/layout.css";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
import Home from "./components/Home";
import AudioLibrary from "./components/AudioLibrary";
import AudioPlayer from "./components/player/AudioPlayer";
import { useThemeContext } from "./hooks/useThemeContext";

function App() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useMediaQuery("(max-width:639px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isDarkMode } = useThemeContext();

  const isAudioPlayerPage = location.pathname.startsWith("/audio-player");

  const rootStyle: React.CSSProperties = {
    fontFamily: "'Roboto', sans-serif",
    minHeight: "100vh",
    width: "100%",
  };

  const bodyStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const headerWrapperStyle: React.CSSProperties = {
    height: "54px",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1100,
    background: isMobile
      ? isDarkMode
        ? "linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)"
        : "linear-gradient(180deg, #4440cc 0%, #3733b3 100%)"
      : "transparent",
    display: isMobile ? "block" : "none",
  };

  const contentContainerStyle: React.CSSProperties = {
    display: "flex",
    flex: 1,
    minHeight: 0,
    marginTop: isMobile ? "64px" : 0,
  };

  const sidebarWrapperStyle: React.CSSProperties = {
    width: isAudioPlayerPage ? 0 : isMobile ? 0 : collapsed ? 64 : 240,
    transition: "width 0.25s ease",
    flex: "0 0 auto",
    overflow: "hidden",
  };

  const mainAreaStyle: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
  };

  const contentStyle: React.CSSProperties = {
    flexGrow: 1,
    padding: isAudioPlayerPage ? "0" : "24px",
    overflowX: "hidden" as const,
    overflowY: "auto",
  };

  return (
    <>
      <CssBaseline />
      <div style={rootStyle}>
        <div style={headerWrapperStyle}>
          <Header
            isMobile={isMobile}
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
          />
        </div>

        <div style={bodyStyle}>
          <div style={contentContainerStyle}>
            {!isAudioPlayerPage && (
              <div style={sidebarWrapperStyle}>
                <Sidebar
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  isMobile={isMobile}
                  drawerOpen={drawerOpen}
                  setDrawerOpen={setDrawerOpen}
                />
              </div>
            )}

            <div style={mainAreaStyle}>
              <main style={contentStyle}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/audio-library" element={<AudioLibrary />} />
                  <Route path="/audio-player/:id" element={<AudioPlayer />} />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
