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
function Register() {
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
            Sign Up
          </Typography>
        </Box>
        <form>
          <Grid direction="column">
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              name="name"
              type="text"
              variant="outlined"
            />
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
                Sign Up
              </Button>
              <Box marginTop={2}>
                <Typography color="textSecondary">
                  Already have an account? <Link to="/login">Login</Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </form>
      </Container>
    </Grid>
  );
}

export default Register;
