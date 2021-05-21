import {
  Container,
  Typography,
  makeStyles,
  Box,
  Grid,
} from "@material-ui/core";
import EA from "../../assets/publisher/EA.png";
import ubisoft from "../../assets/publisher/ubisoft.png";
import nitendo from "../../assets/publisher/nitendo.png";
import sega from "../../assets/publisher/sega.png";

const useStyle = makeStyles({
  title: {
    fontWeight: 600,
  },
});
export default function Company() {
  const classes = useStyle();
  return (
    <Box py={12}>
      <Container>
        <Box textAlign="center">
          <Typography variant="h3" className={classes.title}>
            Who Joined Us
          </Typography>
        </Box>
        <Box py={8}>
          <Grid container spacing={5} alignItems="center" justify="center">
            <Grid item>
              <img src={EA} alt="ea" width="200px" />
            </Grid>
            <Grid item>
              <img src={nitendo} alt="ea" width="250px" />
            </Grid>
            <Grid item>
              <img src={sega} alt="ea" width="250px" />
            </Grid>
            <Grid item>
              <img src={ubisoft} alt="ea" width="200px" />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
