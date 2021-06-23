import { Flex, Heading, Text, Button, Image, Stack, HStack, VStack, Box, Icon } from "@chakra-ui/react"
import { HomeLayout } from "../components/layouts"
import HeroImage from "../assets/hero.png"
import { ChartSquareBarIcon, ChipIcon, ClipboardListIcon } from "@heroicons/react/outline"
import { useHistory } from "react-router-dom"

function Hero() {
  const history = useHistory()
  return (
    <Flex direction="column" mt={["16", "24"]} as="section">
      <Stack
        py="6"
        direction={["column-reverse", "row"]}
        bg="white"
        px={["4", "16", "36"]}
        spacing="4"
        justify="space-between"
      >
        <Flex direction="column" alignSelf="center" minW="42%">
          <Heading as="h2" size="2xl" color="gray.600" lineHeight="1.3">
            Collaborate and Create Games That Will Rock The World
          </Heading>
          <Text mt="4" fontSize="md" color="gray.500">
            We are a platform that will help game developers and game designers discover their chemistry in creating
            amazing games
          </Text>
          <Flex mt="10">
            <Button position="static" size="md" colorScheme="blue" fontSize="sm" onClick={() => history.push("signup")}>
              Get Started
            </Button>
          </Flex>
        </Flex>
        <Flex direction="column" minW="58%">
          <Image src={HeroImage} w="full" />
        </Flex>
      </Stack>
      <Flex bg="gray.50" direction="column">
        <Flex direction={["column", "column", "row"]} px={["4", "16", "36"]} py="6" justify="space-between">
          <Flex direction="column" alignSelf="center">
            <Text fontWeight="bold" fontSize="3xl" color="gray.500"></Text>
          </Flex>
          <HStack spacing={["24", "36"]} alignSelf="center">
            <VStack>
              <Heading as="h2" size="xl" color="gray.600">
                4,500+
              </Heading>
              <Text fontSize="lg" color="gray.500">
                Designer
              </Text>
            </VStack>
            <VStack>
              <Heading as="h2" size="xl" color="gray.600">
                100+
              </Heading>
              <Text fontSize="lg" color="gray.500">
                Publisher
              </Text>
            </VStack>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  )
}

function Benefit() {
  const benefits = [
    {
      title: "Appoitment Management",
      desc: "Manage your scheduling meetings professionally and efficiently",
      icon: ClipboardListIcon,
    },
    {
      title: "Project Monitoring",
      desc: "Monitor progress of your projects easily and efficiently ",
      icon: ChartSquareBarIcon,
    },
    {
      title: "Easy Integration",
      desc: "Integrated to other platform such as Trello, Slack, and Attlassian",
      icon: ChipIcon,
    },
  ]
  return (
    <Flex direction="column" px={["4", "16", "36"]} py={["8", "16"]}>
      <Flex direction="column" textAlign="center">
        <Heading as="h2" size="xl" color="gray.600">
          Features
        </Heading>
      </Flex>
      <Stack direction={["column", "row"]} mt={["8", "12"]} spacing="6">
        {benefits.map((benefit, index) => (
          <Box bg="white" p="6" borderWidth="1px" borderRadius="lg" key={index} w="full">
            <Stack direction="column" spacing="4">
              <Stack direction="row" spacing="2" alignItems="center" color="blue.400">
                <Icon as={benefit.icon} w="12" h="10" />
                <Text color="gray.600" fontWeight="semibold" fontSize="lg">
                  {benefit.title}
                </Text>
              </Stack>
              <Text color="gray.500" fontSize="md">
                {benefit.desc}
              </Text>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Flex>
  )
}

function SuccessStory() {
  const successStories = [
    {
      desc: "Game Developer Connect is a platform that helps me as a Game Designer to find Game Publisher. Appointment Management is a powerful platform, it can schedule my appointment with Game Publisher.",
      name: "Cillian Murphy",
      role: "Game Designer",
    },
    {
      desc: "We have a lot of problems one of which is that we are having a hard time finding talented Game Designers. Game Developer Connect is there to solve it. We can meet talented Game Designers easily.",
      name: "Tencent Gaming",
      role: "Game Publisher",
    },
  ]
  return (
    <Flex as="section" direction="column" bgGradient="linear(to-t,#EDF2F7, #F7FAFC,#FFFFFF)">
      <Flex direction="column" py={["8", "16"]} px={["4", "8", "56"]}>
        <Flex direction="column" textAlign="center">
          <Heading as="h2" size="xl" color="gray.600">
            What They Said
          </Heading>
        </Flex>
        <Stack direction={["column", "column", "row"]} spacing="6" mt={["8", "12"]}>
          {successStories.map((successStory, index) => (
            <Box bg="white" p="6" boxShadow="md" key={index} w="full" borderRadius="lg">
              <Flex direction="column">
                <Text fontSize="md" color="gray.600" minH="28">
                  {successStory.desc}
                </Text>
                <HStack align="stretch" color="gray.500" fontSize="md" fontWeight="semibold" mt="4">
                  <Text color="blue.400">{successStory.name}</Text>
                  <Text>|</Text>
                  <Text>{successStory.role}</Text>
                </HStack>
              </Flex>
            </Box>
          ))}
        </Stack>
      </Flex>
      <Flex w="full" direction="column" pt={["8", "16"]} pb="24" px={["4", "8", "72"]} textAlign="center">
        <Heading as="h2" size="xl" color="gray.600">
          Finish Your Game and Collaborate With Them Around The World
        </Heading>
      </Flex>
    </Flex>
  )
}

function Home() {
  return (
    <HomeLayout>
      <Hero />
      <Benefit />
      <SuccessStory />
    </HomeLayout>
  )
}

export default Home
