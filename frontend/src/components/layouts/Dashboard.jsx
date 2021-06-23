import { Flex } from "@chakra-ui/react";

function Dashboard(props) {
  return <Flex direction="column">{props.children}</Flex>;
}

export default Dashboard;
