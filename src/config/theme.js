import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        primary: {
            main: "#AF9FCD",
            light: "#F9FAFA",
            dark: "#9785BA",
        },
        secondary: {
            main: "#D7C7F4",
            light: "#d7c7f465",
        },
        background: {
            default: "linear-gradient(180deg, #FFFFFF 0%, #9785BA 100%)",

        },
    },
    typography: {
    fontFamily: "Ubuntu, Open Sans, sans-serif",
  },
});

export const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#B8A8DD",
            light: "#D3C8F4",
            // dark: "#60507B",
            dark: "#D7C7F4",
        },
        secondary: {
            main: "#7A5E9E",
            light: "#FFFFFF",
        },
        background: {
            default: "#383047",
        },
        text: {
            primary: "#E0DDED",
            secondary: "#A69FC1",
            disabled: "#5A5A6D",
        },
    },
    typography: {
    fontFamily: "Ubuntu, Open Sans, sans-serif",
  },
});