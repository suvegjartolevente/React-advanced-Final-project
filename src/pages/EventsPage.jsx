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
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { AddEventForm } from "../components/AddEventForm";
import { useEvents } from "../components/UpdateProvider";
import { EventSearch } from "../components/EventSearch";

export const EventsPage = () => {
  const { events } = useEvents();
  const { categories } = useUserCategory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchField, setSearchField] = useState("");
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchField.toLowerCase())
  );
  return (
    <Box className="events-list">
      <Heading>List of events</Heading>
      <EventSearch searchField={searchField} onChange={(e) =>setSearchField(e.target.value)} />
      <Button colorScheme="blue" my={4} onClick={onOpen}>
        ➕ Add Event
      </Button>

      {filteredEvents.map((event) => {
        const dateOnly = dateFormatter(event.startTime);
        const fixedStartTime = timeFormatter(event.startTime);
        const fixedEndTime = timeFormatter(event.endTime);

        const categoryNames = categoryFormatter(event.categoryIds, categories);

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
      })}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent size="xl">
          <ModalHeader>Add New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddEventForm onSuccess={onClose} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
