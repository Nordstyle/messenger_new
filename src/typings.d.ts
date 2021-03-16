declare module "*.svg" {
  const content: any;
  export default content;
}
// @ts-ignore
declare global {
  module "@material-ui/core/styles/createMuiTheme" {
    // eslint-disable-next-line no-unused-vars
    interface Theme {
      themeColors: {
        primary: React.CSSProperties["color"];
        secondary: React.CSSProperties["color"];
        success: React.CSSProperties["color"];
        fail: React.CSSProperties["color"];
        hoverFilled: React.CSSProperties["color"];
      };
    }
    // allow configuration using `createMuiTheme`
    // eslint-disable-next-line no-unused-vars
    interface ThemeOptions {
      themeColors: {
        primary: React.CSSProperties["color"];
        secondary: React.CSSProperties["color"];
        success: React.CSSProperties["color"];
        fail: React.CSSProperties["color"];
        hoverFilled: React.CSSProperties["color"];
      };
    }
  }
}
