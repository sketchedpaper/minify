import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  overrides: {},
  typography: {
    fontFamily: "Helvetica,Roboto,Arial,sans-serif",
    h5: { weight: "bold", color: "#1463FF" },
    textField: {},
  },

  palette: {
    primary: {
      main: "#1463FF",
    },
  },
});
