import { Box, Button, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Vite + React + MUI + Router
      </Typography>
      <Button variant="contained">Count</Button>
      <Typography sx={{ mt: 2 }}>
        Edit <code>src/App.tsx</code> and save to test HMR
      </Typography>
    </Box>
  );
};

export default Home;
