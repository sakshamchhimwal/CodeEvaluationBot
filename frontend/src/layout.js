import { createTheme } from "@mui/material/styles";

export const Theme = createTheme({
    typography: {
        fontFamily: [
            "Inter",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        poster: {
            color: "#FFF",
            display: "block",
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#262626",
                },
            },
        },
    },
    palette: {
        primary: { main: "#1B1919" },
        secondary: { main: "#353535" },
    },
});
