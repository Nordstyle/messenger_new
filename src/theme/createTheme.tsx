import createMuiTheme, {
  Theme,
  ThemeOptions,
} from "@material-ui/core/styles/createMuiTheme";

export function createTheme(options: ThemeOptions): Theme {
  return createMuiTheme({
    ...options,
  });
}
