import { useState } from "react";
import { createTheme, ThemeProvider, CssBaseline, Button, Container, Typography } from "@mui/material";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light mode palette
          primary: {
            main: "#9785BA",
            light: "#AF9FCD",
            dark: "#7A6B99",
          },
          secondary: {
            main: "#D7C7F4",
            light: "#FFFFFF",
          },
          background: {
            default: "linear-gradient(180deg, #FFFFFF 0%, #9785BA 100%)",
            paper: "#F9FAFA",
          },
          text: {
            primary: "#3C3C3C",
            secondary: "#AF9FCD",
            disabled: "#FFFFFF",
          },
        }
      : {
          // Dark mode palette derived from light mode
          primary: {
            main: "#B8A8DD",
            light: "#D3C8F4",
            dark: "#7A679F",
          },
          secondary: {
            main: "#7A5E9E",
            light: "#A48BCB",
          },
          background: {
            default: "#2E2E3A",
            paper: "#3C3C4A",
          },
          text: {
            primary: "#E0DDED",
            secondary: "#A69FC1",
            disabled: "#5A5A6D",
          },
        }),
  },
  typography: {
    fontFamily: "Ubuntu, Open Sans, sans-serif",
  },
});

export default function App() {
  const [mode, setMode] = useState("light"); // Manage theme mode manually

  const theme = createTheme(getDesignTokens(mode));

  const handleToggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Button variant="contained" onClick={handleToggleTheme}>
          Toggle to {mode === "light" ? "Dark" : "Light"} Mode
        </Button>
        <Typography variant="h1" gutterBottom>
          Lorem Ipsum
        </Typography>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
