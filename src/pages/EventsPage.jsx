import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { dateFormatter, timeFormatter } from "../Utils/Time&DateFormatter";
import { categoryFormatter } from "../Utils/CategoryFormatter";
import { useUserCategory } from "../components/AppProvider";

import { useEvents } from "../components/UpdateProvider";
import { EventSearch } from "../components/EventSearch";
import { ModalForm } from "../components/ui/ModalForm";

export const EventsPage = () => {
  const { events } = useEvents();
  const { categories } = useUserCategory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchField, setSearchField] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [eventToEdit, setEventToEdit] = useState(null);

  const handleFilterClick = (id) => {
    setSelectedFilters((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categoriesList = [
    { id: 1, label: "Sports" },
    { id: 2, label: "Games" },
    { id: 3, label: "Relaxation" },
  ];

  const matchedEvents = events.filter((hit) => {
    const eventsSearch = hit.title
      .toLowerCase()
      .includes(searchField.toLowerCase());

    const categoryFilter =
      selectedFilters.length === 0
        ? true
        : selectedFilters.some((id) => hit.categoryIds.includes(id));

    return eventsSearch && categoryFilter;
  });

  return (
    <Box className="events-list">
      <Heading align="Center" margin={8} fontSize="5xl">
        List of events
      </Heading>
      <Box
        w={{ base: "auto", md: "47.33%" }}
        mx={{ base: "auto", md: "0" }}
        ml={{ md: "0" }}
        mr={{ md: "auto" }}
      >
        <EventSearch
          searchField={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        />

        <Box
          bg={"white"}
          borderRadius="full"
          display="flex"
          position="relative"
          overflowX="auto"
          gap={2}
          p={2}
        >
          <Box position="absolute" bg="#63ddf6" borderRadius="full" />

          {categoriesList.map((cat) => (
            <Button
              borderRadius="full"
              bg={selectedFilters.includes(cat.id) ? "#48dbf9" : "blue.500"}
              display=""
              w="100%"
              justifyContent="space-between"
              fontSize="xl"
              key={cat.id}
              onClick={() => handleFilterClick(cat.id)}
              variant="ghost"
              color="black"
              zIndex={1}
              _hover={{ bg: "transparent", color: "gray.500" }}
              _active={{ bg: "transparent" }}
            >
              {cat.label}
            </Button>
          ))}
        </Box>
      </Box>
      <Button
        fontSize="xl"
        borderRadius="full"
        bg="#48dbf9"
        my={4}
        onClick={() => {
          setEventToEdit(null);
          onOpen();
        }}
      >
        ➕ Add Event
      </Button>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} marginTop={7}>
        {matchedEvents.length > 0 ? (
          matchedEvents.map((event) => {
            const dateOnly = dateFormatter(event.startTime);
            const fixedStartTime = timeFormatter(event.startTime);
            const fixedEndTime = timeFormatter(event.endTime);

            const categoryNames = categoryFormatter(
              event.categoryIds,
              categories
            );

            return (
              <Link to={`/event/${event.id}`} key={event.id}>
                <Box
                  className="event"
                  bg="#fce2d5"
                  borderRadius="30px"
                  padding={1}
                  _hover={{
                    boxShadow: "16px 15px 17px 3px rgba(102, 211, 208, 0.75)",
                  }}
                >
                  <Box
                    margin={6}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Text fontSize="larger" fontWeight="bold">
                      {event.title}{" "}
                    </Text>
                    <Text margin={3}>{event.description}</Text>
                    <Image
                      mx="auto"
                      borderRadius="30px"
                      src={event.image}
                      alt={event.name}
                      maxW="60%"
                      maxH="60%"
                    ></Image>
                    <Text padding={2}>📅 Date: {dateOnly}</Text>
                    <Text padding={2}>
                      ⏰ Time: {fixedStartTime} - {fixedEndTime}
                    </Text>
                    {categoryNames && (
                      <Text
                        marginTop={2}
                        w={{ base: "auto", md: "33.33%" }}
                        bg="#FEF6F2"
                        borderRadius="full"
                        padding={2}
                      >
                        Category: {categoryNames}
                      </Text>
                    )}
                  </Box>
                </Box>
              </Link>
            );
          })
        ) : (
          <Text fontSize="lg" mt={4}>
            No events found !
          </Text>
        )}
      </SimpleGrid>
      <ModalForm isOpen={isOpen} onClose={onClose} initialData={eventToEdit} />
    </Box>
  );
};
