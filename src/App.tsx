
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography, Container } from '@mui/material';
import './App.css';

function Home() {
  const [count, setCount] = useState(0);
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Vite + React + MUI + Router</Typography>
      <Button variant="contained" onClick={() => setCount((c) => c + 1)}>
        Count is {count}
      </Button>
      <Typography sx={{ mt: 2 }}>
        Edit <code>src/App.tsx</code> and save to test HMR
      </Typography>
    </Container>
  );
}

function About() {
  return (
    <Container>
      <Typography variant="h5">About Page</Typography>
      <Typography>This is a demo of React Router and MUI.</Typography>
    </Container>
  );
}

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>FE Podcast</Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
