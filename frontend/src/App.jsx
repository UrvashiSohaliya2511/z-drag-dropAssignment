import logo from "./logo.svg";
import "./App.css";
import { useRef, useState, useEffect } from "react";
import CardBox from "./Componants/CardBox";
import {
  Button,
  Stack,
  Text,
  SimpleGrid,
  Flex,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
function App() {
  let [red, setred] = useState([]);
  let [black, setblack] = useState([]);
  let [green, setgreen] = useState([]);
  let [blue, setblue] = useState([]);
  let [data, setdata] = useState({});
  let [loading, setloading] = useState(false);
  const dragItem = useRef();
  const dragOverItem = useRef();
  let dragStartArr = useRef();
  let dragEndarr = useRef();
  let dragstartfn = useRef();
  let dragendfb = useRef();
  let startRef = useRef();
  let endRef = useRef();
  let inbox = useRef();

  useEffect(() => {
    handleApi();
  }, []);

  const handleApi = async () => {
    try {
      let res = await axios.get("https://cards-cdcs.onrender.com/cards");
      setred(res.data.red);
      setblack(res.data.black);
      setblue(res.data.blue);
      setgreen(res.data.green);
      setloading(false);
    } catch (e) {
      console.log(e);
      setloading(false);
    }
  };

  const postApi = async (obj) => {
    setloading(true);
    try {
      let res = await axios.post("https://cards-cdcs.onrender.com/cards", obj);

      handleApi();
    } catch (e) {
      alert(e.message);
      setloading(false);
    }
  };
  const patch = async (data, id) => {
    setloading(true);
    try {
      let res = await axios.patch(
        `https://cards-cdcs.onrender.com/cards/${id}`,
        data
      );

      handleApi();
    } catch (e) {
      console.log(e);
      alert(e.message);
      setloading(false);
    }
  };
  const handleDelete = async (id) => {
    setloading(true);
    try {
      let res = await axios.delete(
        `https://cards-cdcs.onrender.com/cards/${id}`
      );
      handleApi();
    } catch (e) {
      alert(e.message);
      setloading(false);
    }
  };

  const handleAddRed = () => {
    let data = {
      text: `"red"`,
      order: new Date().getTime(),
      category: "red",
    };
    postApi(data);
  };
  const handleAddBlack = () => {
    let data = {
      text: `"black"`,
      order: new Date().getTime(),
      category: "black",
    };
    postApi(data);
  };
  const handleAddGreen = () => {
    let data = {
      text: `"green"`,
      order: new Date().getTime(),
      category: "green",
    };
    postApi(data);
  };
  const handleAddBlue = () => {
    let data = {
      text: `"blue"`,
      order: new Date().getTime(),
      category: "blue",
    };
    postApi(data);
  };

  const dragStart = (e, element, start, fn, typ) => {
    dragItem.current = element;
    dragStartArr = start;
    dragstartfn = fn;
    startRef = typ;
  };
  const dragEnter = (e, element, end, fn, typ) => {
    dragOverItem.current = element;
    dragEndarr = end;
    dragendfb = fn;
    endRef = typ;

    // inbox.current = true;
  };

  const drop = () => {
    inbox.current = true;

    if (inbox.current && dragEndarr.length < 8) {
      if (
        startRef === endRef &&
        dragItem.current !== null &&
        dragOverItem.current !== null
      ) {
        let obj1 = {
          order: dragItem.current.order,
          category: dragItem.current.category,
        };

        let obj2 = {
          order: dragOverItem.current.order,
          category: dragOverItem.current.category,
        };

        patch(obj1, dragOverItem.current._id);
        patch(obj2, dragItem.current._id);
        dragItem.current = null;
        dragOverItem.current = null;
      } else {
        let obj2 = {
          order: dragOverItem.current.order + 3,
          category: dragOverItem.current.category,
        };
        patch(obj2, dragItem.current._id);
        dragItem.current = null;
        dragOverItem.current = null;
      }
    }
  };
  const handleContainerDragEnd = (type) => {
    if ([type.length < 8]) {
      if (!inbox.current) {
        let obj1 = {
          order: [type].length,
          category: type,
        };
        patch(obj1, dragItem.current._id);

        dragItem.current = null;
        dragOverItem.current = null;
        inbox.current = false;
      }
    }
  };
  const handleDragEnter = (type) => {
    endRef = type;
    inbox.current = false;
  };

  return (
    <Stack className="App" textAlign="center">
      <Heading>Cards Game</Heading>

      <SimpleGrid
        columns={4}
        justify="space-between"
        align="center"
        gap={5}
        p={5}
        fontWeight="bold"
      >
        <Stack id="redContainer">
          <Flex align="center" justify="center" gap={3}>
            <Text>Red</Text>
            <Button
              disabled={red.length >= 8}
              onClick={handleAddRed}
              variant="outline"
              colorScheme="orange"
            >
              Add
            </Button>
          </Flex>
          <Stack
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => {
              handleDragEnter("red");
            }}
            onDrop={() => {
              handleContainerDragEnd("red");
            }}
            bg="#def7f6"
            border="1px solid gray"
            p={3}
            h="100%"
          >
            {loading && (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                m="auto"
                mt="5%"
              />
            )}
            {!loading &&
              red &&
              red.map((e, i) => {
                return (
                  <CardBox
                    details={e}
                    typ="red"
                    setdata={setred}
                    key={i}
                    drop={drop}
                    data={red}
                    index={i}
                    dragStart={dragStart}
                    dragEnter={dragEnter}
                    handleDelete={handleDelete}
                    handlepatch={patch}
                  />
                );
              })}
          </Stack>
        </Stack>
        <Stack id="blackContainer">
          <Flex align="center" justify="center" gap={3}>
            <Text>Black</Text>
            <Button
              disabled={black.length >= 8}
              onClick={handleAddBlack}
              dragEnter={dragEnter}
              dragStart={dragStart}
              variant="outline"
              colorScheme="orange"
            >
              Add
            </Button>
          </Flex>
          <Stack
            onDragEnter={() => {
              handleDragEnter("black");
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              handleContainerDragEnd("black");
            }}
            bg="#def7f6"
            border="1px solid gray"
            p={3}
            h="100%"
          >
            {loading && (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                m="auto"
                mt="5%"
              />
            )}
            {!loading &&
              black &&
              black.map((e, i) => {
                return (
                  <CardBox
                    details={e}
                    typ="black"
                    setdata={setblack}
                    key={i}
                    drop={drop}
                    index={i}
                    data={black}
                    dragStart={dragStart}
                    dragEnter={dragEnter}
                    handleDelete={handleDelete}
                    handlepatch={patch}
                  />
                );
              })}
          </Stack>
        </Stack>
        <Stack id="greenContainer">
          <Flex align="center" justify="center" gap={3}>
            <Text>Green</Text>
            <Button
              disabled={green.length >= 8}
              onClick={handleAddGreen}
              dragEnter={dragEnter}
              dragStart={dragStart}
              variant="outline"
              colorScheme="orange"
            >
              Add
            </Button>
          </Flex>
          <Stack
            onDragEnter={() => {
              handleDragEnter("green");
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              handleContainerDragEnd("green");
            }}
            bg="#def7f6"
            border="1px solid gray"
            p={3}
            h="100%"
          >
            {loading && (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                m="auto"
                mt="5%"
              />
            )}
            {!loading &&
              green &&
              green.map((e, i) => {
                return (
                  <CardBox
                    details={e}
                    typ="green"
                    key={i}
                    setdata={setgreen}
                    drop={drop}
                    index={i}
                    data={green}
                    dragStart={dragStart}
                    dragEnter={dragEnter}
                    handleDelete={handleDelete}
                    handlepatch={patch}
                  />
                );
              })}
          </Stack>
        </Stack>
        <Stack id="blueContainer">
          <Flex align="center" justify="center" gap={3}>
            <Text>Blue</Text>
            <Button
              disabled={blue.length >= 8}
              onClick={handleAddBlue}
              dragEnter={dragEnter}
              dragStart={dragStart}
              variant="outline"
              colorScheme="orange"
            >
              Add
            </Button>
          </Flex>
          <Stack
            onDragEnter={() => {
              handleDragEnter("blue");
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              handleContainerDragEnd("blue");
            }}
            h="100%"
            bg="#def7f6"
            border="1px solid gray"
            p={3}
          >
            {loading && (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                m="auto"
                mt="5%"
              />
            )}
            {!loading &&
              blue &&
              blue.map((e, i) => {
                return (
                  <CardBox
                    details={e}
                    typ="blue"
                    key={i}
                    setdata={setblue}
                    drop={drop}
                    index={i}
                    data={blue}
                    dragStart={dragStart}
                    dragEnter={dragEnter}
                    handleDelete={handleDelete}
                    handlepatch={patch}
                  />
                );
              })}
          </Stack>
        </Stack>
      </SimpleGrid>
    </Stack>
  );
}

export default App;
