import { Box } from "@material-ui/core";
import {
  Navbar,
  Hero,
  Company,
  Benefits,
  Footer,
} from "../components/molecules";

export default function Home() {
  return (
    <Box>
      <Navbar />
      <Hero />
      <Benefits />
      <Company />
      <Footer />
    </Box>
  );
}
