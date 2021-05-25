import React from "react";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./styles/theme";
import { useStyles } from "./styles/useStyles";
import { AliasForm } from "./components/aliasForm";

export default function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Box className={classes.root}>
          <CssBaseline />
          <Container className={classes.titles} maxWidth="md">
            <Typography variant="h2">minify</Typography>
            <Typography variant="h5">a url shortener</Typography>
          </Container>
          <Container maxWidth="md" className={classes.container}>
            <AliasForm />
          </Container>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
}
