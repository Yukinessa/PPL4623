import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  text: {
    fontWeight: 400,
  },
});
export default function Footer() {
  const classes = useStyle();
  const year = new Date().getFullYear();
  return (
    <Box textAlign="center" borderTop={1} borderColor="#bdc3c7" py={2}>
      <Typography variant="body1" className={classes.text}>
        Game Developer Connect &copy; {year}
      </Typography>
    </Box>
  );
}
