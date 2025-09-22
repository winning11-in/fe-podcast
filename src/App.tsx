
import "./styles/layout.css";
 import Sidebar from "./components/Layout/Sidebar";
import { CssBaseline, useTheme } from "@mui/material";
 import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { useState } from "react";

function App() {
  const theme = useTheme();
   const [collapsed, setCollapsed] = useState(false);

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
    width: collapsed ? 64 : 240,
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
    padding: "24px",
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
          <div style={sidebarWrapperStyle}>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
          </div>

          <div style={mainAreaStyle}>
            <main style={contentStyle}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
