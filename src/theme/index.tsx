import createPalette from "@material-ui/core/styles/createPalette";
import { createTheme } from "./createTheme";

export const theme = createTheme({
  themeColors: {
    primary: "#EFF8FF",
    secondary: "#F7F7FA",
    success: "#098C0F",
    fail: "#F44336",
    hoverFilled: "#1E88E5",
  },
  palette: createPalette({
    primary: {
      main: "#1267C7",
    },
    divider: "#CFD8DC",
    text: {
      primary: "#000000",
      secondary: "#666666",
      hint: "#1267C7",
    },
  }),
  typography: {
    fontFamily: [
      "Montserrat",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
