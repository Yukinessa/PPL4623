import { Flex } from "@chakra-ui/react";
import { Navbar, Footer } from "../molecules";

function Home(props) {
  return (
    <Flex direction="column">
      <Navbar />
      {props.children}
      <Footer />
    </Flex>
  );
}

export default Home;
