
import "./styles/layout.css";
 import Sidebar from "./components/Layout/Sidebar";
import { CssBaseline, useTheme } from "@mui/material";
 import { Routes, Route, useLocation } from "react-router-dom";
 import Dashboard from "./components/Dashboard";
import { useState } from "react";
import Home from "./components/Home";
import AudioLibrary from "./components/AudioLibrary";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const theme = useTheme();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Check if we're on the audio player page
  const isAudioPlayerPage = location.pathname.startsWith('/audio-player');

  const rootStyle: React.CSSProperties = {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Roboto', sans-serif",
    minHeight: "100vh",
    width: "100%",
  };

  const bodyStyle: React.CSSProperties = {
    display: "flex",
    flex: 1,
    minHeight: 0, 
  };

  const sidebarWrapperStyle: React.CSSProperties = {
    width: isAudioPlayerPage ? 0 : (collapsed ? 64 : 240),
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
    backgroundColor: theme.palette.background.default,
    overflowY: "auto",
  };

  return (
    <>
      <CssBaseline />
      <div style={rootStyle}>
        {/* <div style={headerWrapperStyle}>
          <Header />
        </div> */}

        <div style={bodyStyle}>
          {!isAudioPlayerPage && (
            <div style={sidebarWrapperStyle}>
              <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
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
    </>
  );
}

export default App;
