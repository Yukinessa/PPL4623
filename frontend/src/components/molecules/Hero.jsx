import { Box, Button, Typography, makeStyles } from "@material-ui/core";
import { NavLink as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  tagline: {
    fontWeight: 600,
  },
  subTagline: {
    fontWeight: 300,
    marginTop: 36,
    marginBottom: 36,
  },
  button: {
    textTransform: "none",
  },
});

export default function Hero() {
  const classes = useStyles();
  return (
    <Box>
      <Box px={24} py={24}>
        <Typography variant="h2" className={classes.tagline}>
          Search, Collaborate and Create Games that Will Rock the World
        </Typography>
        <Typography variant="h5" className={classes.subTagline}>
          We are a platform that will help game publishers and game designers
          discover their chemistry in creating amazing games
        </Typography>
        <Button
          component={RouterLink}
          color="primary"
          size="large"
          variant="contained"
          to="/register"
          className={classes.button}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
}
