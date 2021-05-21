import React from "react";
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  button: {
    textTransform: "none",
  },
});

function Login() {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Container maxWidth="xs">
        <Box marginBottom={2}>
          <Typography color="textPrimary" align="center" variant="h4">
            Login
          </Typography>
        </Box>
        <form>
          <Grid direction="column">
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              name="email"
              type="email"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
            />
            <Box marginTop={3}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                className={classes.button}
              >
                Login
              </Button>
              <Box marginTop={2}>
                <Typography color="textSecondary">
                  Don&apos;t have an account?{" "}
                  <Link to="/register">Sign up</Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </form>
      </Container>
    </Grid>
  );
}

export default Login;
