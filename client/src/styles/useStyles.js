import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: "url(http://localhost:3000/bg2.svg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
    height: "100vh",
    paddingTop: 100,
  },
  titles: {
    paddingLeft: theme.spacing(6),
    paddingBottom: theme.spacing(2),
  },
  textEntry: {
    "& input:valid + fieldset": {
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderColor: "#1463FF",
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderBottomWidth: 10,
      padding: "4px !important", // override inline-style
    },
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(20),
    marginBottom: theme.spacing(20),
  },
  copyButton: {
    paddingTop: theme.spacing(2),
  },
  input: {
    marginLeft: theme.spacing(1),
    // flex: 1,
  },
  shortyField: {
    "& fieldset": {
      borderColor: "#1463FF",
    },
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
