import {
  Container,
  Typography,
  makeStyles,
  Box,
  Grid,
} from "@material-ui/core";

const useStyle = makeStyles({
  root: {
    backgroundColor: "#F7FAFC",
  },
  title: {
    fontWeight: 600,
  },
  subTitle: {
    marginBottom: "16px",
  },
});
export default function Benefits() {
  const classes = useStyle();
  return (
    <Box className={classes.root} py={16}>
      <Container>
        <Box textAlign="center">
          <Typography variant="h3" className={classes.title}>
            What You Will Get
          </Typography>
        </Box>
        <Box mt={6}>
          <Grid container spacing={6} alignItems="center" justify="center">
            <Grid item md={4}>
              <Typography variant="h5" className={classes.subTitle}>
                Appoitment Management
              </Typography>
              <Typography>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Beatae, dolore. Repellendus velit impedit ullam, non mollitia
                dolores qui corporis neque sit totam enim consectetur a commodi
                aspernatur sapiente quod explicabo.
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography variant="h5" className={classes.subTitle}>
                Project Monitoring
              </Typography>
              <Typography>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Beatae, dolore. Repellendus velit impedit ullam, non mollitia
                dolores qui corporis neque sit totam enim consectetur a commodi
                aspernatur sapiente quod explicabo.
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography variant="h5" className={classes.subTitle}>
                Easy Integration
              </Typography>
              <Typography>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Beatae, dolore. Repellendus velit impedit ullam, non mollitia
                dolores qui corporis neque sit totam enim consectetur a commodi
                aspernatur sapiente quod explicabo.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
