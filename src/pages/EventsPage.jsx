import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
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
  const [selectedFilter, setSelectedFilter] = useState(null);
   const [eventToEdit, setEventToEdit] = useState(null);
  const handleFilterClick = (filter) => {
    setSelectedFilter((prevFilter) => (prevFilter === filter ? null : filter));
  };

  const matchedEvents = events.filter((hit) => {
    const eventsSearch = hit.title
      .toLowerCase()
      .includes(searchField.toLowerCase());
    const categoryFilter = selectedFilter
      ? hit.categoryIds.includes(selectedFilter)
      : true;
    return eventsSearch && categoryFilter;
  });

  return (
    <Box className="events-list">
      <Heading>List of events</Heading>
      <EventSearch
        searchField={searchField}
        onChange={(e) => setSearchField(e.target.value)}
      />
      <Box>
        <Button onClick={() => handleFilterClick(1)}>Sports</Button>
        <Button onClick={() => handleFilterClick(2)}>Games</Button>
        <Button onClick={() => handleFilterClick(3)}>Relaxation</Button>
      </Box>
       <Button colorScheme="blue" my={4} onClick={()=>{setEventToEdit(null); onOpen();}}> 
     
        ➕ Add Event
      </Button>
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
              <Box display="flex" className="event">
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <Image
                  src={event.image}
                  alt={event.name}
                  maxW="30%"
                  maxH="30%"
                ></Image>
                <p>
                  date: {dateOnly}
                  From: {fixedStartTime} to: {fixedEndTime}
                </p>
                {categoryNames && <Text>Category: {categoryNames}</Text>}
              </Box>
            </Link>
          );
        })
      ) : (
        <Text fontSize="lg" mt={4}>
          No events found !
        </Text>
      )}
      <ModalForm isOpen={isOpen} onClose={onClose} initialData={eventToEdit} />
    </Box>
  );
};
