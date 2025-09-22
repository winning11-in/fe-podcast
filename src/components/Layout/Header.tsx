import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

export default function Header() {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width:"100%"
      }}
    >
      <Toolbar>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ flexGrow: 1 }}
        >
          <Avatar
            alt="Fe Podcast"
            src="/vite.svg"
            sx={{ bgcolor: "#06b6d4", width: 36, height: 36 }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 700, letterSpacing: 1 }}
          >
            Fe Podcast
          </Typography>
        </Stack>

        <Button
          color="inherit"
          variant="outlined"
          sx={{ ml: 2, borderColor: "#e6eef8", color: "#e6eef8" }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}
