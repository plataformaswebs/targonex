import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#ff9800" },
    background: {
      default: "#ffffff",
      paper: "#ffffff"
    },
  },
  typography: {
    fontFamily: "Roboto-BoldCondensed, sans-serif",
  },
});

export default theme;
