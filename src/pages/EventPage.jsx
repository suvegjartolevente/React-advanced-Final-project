import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { dateFormatter, timeFormatter } from "../Utils/Time&DateFormatter";

import { getUser } from "../Utils/GetUser";
import { categoryFormatter } from "../Utils/CategoryFormatter";
import { useUserCategory } from "../components/AppProvider";
import { ModalForm } from "../components/ui/ModalForm";

export const loader = async ({ params }) => {
  const eventsRes = await fetch(
    `http://localhost:3000/events/${params.eventId}`
  );

  const event = await eventsRes.json();
  return { event };
};

export const EventPage = () => {
  const [eventToEdit, setEventToEdit] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { categories, users } = useUserCategory();
  const { event: initialEvent } = useLoaderData();
  const [eventData, setEventData] = useState(initialEvent);
  const dateOnly = dateFormatter(eventData.startTime);
  const fixedStartTime = timeFormatter(eventData.startTime);
  const fixedEndTime = timeFormatter(eventData.endTime);
  const categoryNames = categoryFormatter(eventData.categoryIds, categories);
  const host = getUser(users, eventData.createdBy);

  return (
    <Box className="event-detail">
      <ModalForm
        isOpen={isOpen}
        initialData={eventToEdit}
        onAfterEdit={(updatedEvent) => {
          console.log("Updated event received in EventPage:", updatedEvent);
          setEventData(updatedEvent);
        }}
        onClose={onClose}
      />
      <Heading>{eventData.title}</Heading>
      <Text>{eventData.description}</Text>

      <Button
        colorScheme="blue"
        my={4}
        onClick={() => {
          setEventToEdit(eventData);
          onOpen();
        }}
      >
        ✏️ Edit Event
      </Button>
      <Image src={eventData.image} alt={eventData.name} />
      <Text>
        date: {dateOnly}
        From: {fixedStartTime} to: {fixedEndTime}
      </Text>
      {categoryNames && <Text>Category: {categoryNames}</Text>}
      {host && <Text>Organized by: {host.name}</Text>}
      {host && <Image src={host.image} alt={host.name} />}
    </Box>
  );
};
