import React from "react";
import Button from "@material-ui/core/Button";

import Box from "@material-ui/core/Box";

import Paper from "@material-ui/core/Paper";

import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import CopyIcon from "@material-ui/icons/FileCopy";

import { isValidUrl } from "../utils/url";
import { useStyles } from "../styles/useStyles";

var apiUrl = process.env.REACT_APP_SERVICE_URL;

export function AliasForm() {
  const classes = useStyles();
  const [pendingUrl, setPendingUrl] = React.useState("");
  const [pendingUrlError, setPendingUrlError] = React.useState(false);
  const [entryComplete, setEntryComplete] = React.useState(false);
  const [minifiedurl, setMinifiedUrl] = React.useState("");
  const [submit, setSubmit] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const aliasFormRef = React.useRef();

  const handleUrlChange = (event) => {
    event.preventDefault();
    if (!event.target.value.startsWith("h")) {
      setEntryComplete(true);
      setPendingUrlError(true);
    } else {
      if (event.target.value.length > 8) {
        setEntryComplete(true);
        setPendingUrlError(isValidUrl(event.target.value) ? false : true);
      }
    }
    setSubmit(false);
    setSuccess(false);
    setPendingUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const valid = isValidUrl(pendingUrl);
    if (valid === true) {
      setSubmit(true);
      fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({ fullUrl: pendingUrl }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => setMinifiedUrl(`${apiUrl}/${data.id}`))
        .then(setSuccess(true))
        .then(aliasFormRef.current.focus());
    }
  };

  const handleCopy = (event) => {
    event.preventDefault();
    navigator.clipboard
      .writeText(minifiedurl)
      .then(aliasFormRef.current.focus());
  };

  return (
    <React.Fragment>
      <Paper elevation={1} className={classes.container}>
        <form
          className={classes.container}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            className={classes.textEntry}
            error={entryComplete && pendingUrlError}
            fullWidth
            helperText={
              pendingUrlError === true
                ? "enter a valid url starting with http or https"
                : " "
            }
            autoComplete="off"
            label="to minify"
            autoFocus={true}
            variant="outlined"
            onChange={handleUrlChange}
            data-testid={"toBeShortened"}
            inputProps={{ "data-testid": "toBeShortenedField" }}
          ></TextField>
          <Button
            className={classes.button}
            data-testid="requestButton"
            fullWidth
            variant="contained"
            align="right"
            color="primary"
            type="submit"
            disabled={!entryComplete || pendingUrlError || submit}
            startIcon={<AddIcon />}
          >
            minify me
          </Button>
        </form>
        <Box className={classes.container}>
          <TextField
            data-testid="shortUrl"
            className={classes.textEntry}
            fullWidth
            label="minified"
            variant="outlined"
            value={minifiedurl}
            helperText={" "}
            inputRef={aliasFormRef}
            inputProps={{ "data-testid": "shortUrlField" }}
            InputLabelProps={{
              shrink: true,
            }}
          ></TextField>
          <Button
            className={classes.button}
            data-testid="copyButton"
            variant="contained"
            fullWidth
            color="primary"
            align="right"
            disabled={!success}
            startIcon={<CopyIcon />}
            onMouseUp={handleCopy}
          >
            copy
          </Button>
        </Box>
      </Paper>
    </React.Fragment>
  );
}
