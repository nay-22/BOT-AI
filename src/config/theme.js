import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        primary: {
            main: "#AF9FCD",
            light: "#9785BA",
            dark: "#9785BA",
        },
        secondary: {
            main: "#D7C7F4",
            light: "white",
        },
        background: {
            default: "linear-gradient(180deg, #FFFFFF 0%, #9785BA 100%)",

        },
        text: {
            primary: "#3C3C3C",
            secondary: "#7E7E7E",
            light: 'white'
        },
    },
    shadows:[
        'none',
        '0 2px 5px grey',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
    ],
    typography: {
    fontFamily: "Ubuntu, Open Sans, sans-serif",
  },
});

export const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#AF9FCD",
            light: "#F9FAFA",
            dark: "#60507B",
        },
        secondary: {
            main: "#D7C7F4",
            light: "#d7c7f465",
        },
        background: {
            default: "linear-gradient(180deg, #FFFFFF 0%, #9785BA 100%)",

        },
        text: {
            primary: "#FFFFFF",
            secondary: "#C0C0C0",
            light: 'white'
        },
    },
    shadows:[
        'none',
        '2px 5px 10px rgb(19, 19, 19)',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
        'none',
    ],
    typography: {
    fontFamily: "Ubuntu, Open Sans, sans-serif",
  },
});