import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { dateFormatter, timeFormatter } from "../Utils/Time&DateFormatter";

import { getUser } from "../Utils/GetUser";
import { categoryFormatter } from "../Utils/CategoryFormatter";
import { useUserCategory } from "../components/AppProvider";
import { ModalForm } from "../components/ui/ModalForm";
import { useEvents } from "../components/UpdateProvider";

export const loader = async ({ params }) => {
  const eventsRes = await fetch(
    `http://localhost:3000/events/${params.eventId}`
  );

  const event = await eventsRes.json();
  return { event };
};

export const EventPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { deleteEvent } = useEvents();
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

  const handleDelete = async () => {
    if (window.confirm("Are you sure to delete this event?")) {
      await deleteEvent(eventData.id);
      toast({
        title: "Event Deleted",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    }
  };

  return (
    <Box className="event-detail" align="center" margin={6} >
      <ModalForm
        isOpen={isOpen}
        initialData={eventToEdit}
        onAfterEdit={(updatedEvent) => {
          console.log("Updated event received in EventPage:", updatedEvent);
          setEventData(updatedEvent);
        }}
        onClose={onClose}
      />
      <Box className="event-card" mg={4} align="center"    w={{ base: "100%", md: "70%", lg: "50%" }}  bg="#fce2d5" borderRadius="30px" padding={1}>
        <Heading  margin={8} fontSize="3xl">
          {eventData.title}
        </Heading>
        <Text>{eventData.description}</Text>

        <Button
         fontSize="xl"
        borderRadius="full"
        bg="#48dbf9"
          
          my={4}
          onClick={() => {
            setEventToEdit(eventData);
            onOpen();
          }}
        >
          ✏️ Edit Event
        </Button>
        <Button onClick={handleDelete}  fontSize="xl"
        borderRadius="full"
        bg="#48dbf9" > Delete Event</Button>
        <Image src={eventData.image} alt={eventData.name} borderRadius="30px"  />
        <Text m={4}>
          📅 Date:  {dateOnly}
          ⏰ Time:  {fixedStartTime} - {fixedEndTime}
        </Text>
        {categoryNames && <Text  marginTop={2}
                        w={{ base: "auto", md: "33.33%" }}
                        bg="#FEF6F2"
                        borderRadius="full">Category: {categoryNames}</Text>}
        {host && <Text>Organized by: {host.name}</Text>}
        {host && <Image src={host.image} alt={host.name} w="40%" h="40%" borderRadius="full" p={2}/>}
      </Box>
    </Box>
  );
};
