import { createMuiTheme } from "@material-ui/core/styles";
import createPalette from "@material-ui/core/styles/createPalette";

// export type CustomTypography = Modify<
//   Typography,
//   {
//     secondaryFontFamily: string;
//   }
// >;

// export type CustomTheme = Modify<
//   Theme,
//   // {
//   //   typography: CustomTypography;
//   // }
// >;

export const createMyTheme = () => {
  const baseTheme = createMuiTheme({
    palette: createPalette({}),
  });

  return {
    ...baseTheme,
  };
};
