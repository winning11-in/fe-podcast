import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function Header() {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: "100%",
      }}
    >
      <Toolbar>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ flexGrow: 1 }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 700, letterSpacing: 1 }}
          >
            Fe Podcast
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
