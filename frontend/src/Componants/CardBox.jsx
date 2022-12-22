import React from "react";
import {
  Box,
  Button,
  Flex,
  useDisclosure,
  Collapse,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
const CardBox123 = ({
  details,
  index,
  typ,
  drop,
  data,
  setdata,
  dragStart,
  dragEnter,
  handlepatch,
  handleDelete,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const [text, setText] = React.useState("");

  const handleText = () => {
    handlepatch({ text: text }, details._id);
    onToggle();
  };

  return (
    <Box
      border={`3px solid ${details.category}`}
      borderRadius="5px"
      bg={
        typ === "red"
          ? "#FF8E8E"
          : typ === "black"
          ? "rgb(35, 33, 33)"
          : typ === "green"
          ? "#AEFFD1"
          : "#BFCFFF"
      }
      color={
        typ === "red"
          ? "white"
          : typ === "black"
          ? "white"
          : typ === "green"
          ? "black"
          : "black"
      }
      p={5}
      draggable
      textAlign="center"
      onDragStart={(e) => dragStart(e, details, data, setdata, typ)}
      onDragEnter={(e) => dragEnter(e, details, data, setdata, typ)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={drop}
    >
      <Flex gap={3} align="center" justify="space-between">
        <Text fontWeight="bold"> {details.text}</Text>
        <Button onClick={onToggle} variant="outline" colorScheme="blue">
          Edit
        </Button>

        <Button
          onClick={() => {
            handleDelete(details._id);
          }}
          variant="outline"
          colorScheme="red"
        >
          Delete
        </Button>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box w="100%" color="white" mt="4" bg="white" rounded="md" shadow="md">
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              placeholder="Enter reply"
              onChange={(e) => {
                setText(e.target.value);
              }}
              color="black"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleText}
                variant="outline"
                colorScheme="green"
              >
                Add
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Collapse>
    </Box>
  );
};

export default CardBox123;
