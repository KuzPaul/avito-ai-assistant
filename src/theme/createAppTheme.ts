import { createTheme, type Theme } from "@mui/material";

export const createAppTheme = (mode: "light" | "dark"): Theme =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#1890ff" : "#177ddc",
      },
      background: {
        default: mode === "light" ? "#f7f5f8" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
      text: {
        primary:
          mode === "light"
            ? "rgba(0, 0, 0, 0.85)"
            : "rgba(255, 255, 255, 0.87)",
        secondary:
          mode === "light"
            ? "rgba(0, 0, 0, 0.45)"
            : "rgba(255, 255, 255, 0.6)",
      },
    },
    typography: {
      fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    },
  });
