
import "./styles/layout.css";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import { CssBaseline, useTheme } from "@mui/material";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

function App() {
  const theme = useTheme();
  const [menuVisible] = useState(true); 

   const rootStyle: React.CSSProperties = {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Roboto', sans-serif",
    minHeight: "100vh",
    width: "100%",
  };

  const sidebarStyle: React.CSSProperties = {
    position: "fixed",
    left: 0,
    top: 0,
    height: "100vh",
    zIndex: 1200,
    overflowY: "auto" as const,
    width: menuVisible ? "240px" : "64px",
    transition: "width 0.3s ease",
  };

  const mainAreaStyle: React.CSSProperties = {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    marginLeft: menuVisible ? "240px" : "64px",
    transition: "margin-left 0.3s ease",
  };

  const headerWrapperStyle: React.CSSProperties = {
    position: "sticky" as const,
    top: 0,
    zIndex: 1100,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  };

  const contentStyle: React.CSSProperties = {
    flexGrow: 1,
    padding: "24px",
    overflowX: "hidden" as const,
    backgroundColor: theme.palette.background.default,
  };

  return (
    <>
      <CssBaseline />
      <div style={rootStyle}>
        <div style={sidebarStyle}>
          <Sidebar />
        </div>
        <div style={mainAreaStyle}>
          <div style={headerWrapperStyle}>
            <Header />
          </div>
          <main style={contentStyle}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
