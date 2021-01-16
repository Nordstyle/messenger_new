import { createMuiTheme, Theme, ThemeOptions } from "@material-ui/core/styles";
import createPalette, { Palette } from "@material-ui/core/styles/createPalette";

interface IPalette extends Palette {
  themeColors: {
    primary: React.CSSProperties["color"];
    secondary: React.CSSProperties["color"];
    success: React.CSSProperties["color"];
    fail: React.CSSProperties["color"];
  };
}
export interface ITheme extends Theme {
  palette: IPalette;
}
export interface IThemeOptions extends ThemeOptions {
  palette: IPalette;
}

export const createMyTheme = (): ThemeOptions => {
  const baseTheme = createMuiTheme({
    palette: createPalette({
      divider: "#CFD8DC",
      primary: {
        main: "#1267C7",
      },
      themeColors: {
        primary: "#EFF8FF",
        secondary: "#F7F7FA",
        success: "#098C0F",
        fail: "#F44336",
      },
      text: {
        primary: "#000000",
        secondary: "#666666",
        hint: "#1267C7",
      },
    } as IPalette),
  });

  return {
    ...baseTheme,
    overrides: {
      MuiInput: {
        underline: {
          content: "none",
          "&:before": {
            content: "none",
          },
          "&:after": {
            content: "none",
          },
        },
      },
    },
  };
};
