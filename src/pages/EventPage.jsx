import React from "react";
import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { dateFormatter, timeFormatter } from "../Utils/Time&DateFormatter";

import { getUser } from "../Utils/GetUser";
import { categoryFormatter } from "../Utils/CategoryFormatter";
import { useUserCategory } from "../components/AppProvider";

export const loader = async ({ params }) => {
  const eventsRes = await fetch(
    `http://localhost:3000/events/${params.eventId}`
  );

  const event = await eventsRes.json();
  return { event };
};

export const EventPage = () => {
  const { categories, users } = useUserCategory();
  const { event } = useLoaderData();
  const dateOnly = dateFormatter(event.startTime);
  const fixedStartTime = timeFormatter(event.startTime);
  const fixedEndTime = timeFormatter(event.endTime);
  const categoryNames = categoryFormatter(event.categoryIds, categories);
  const host = getUser(users, event.createdBy);
  console.log("Event userId:", event.userId);
  return (
    <Box className="event-detail">
      <Heading>{event.title}</Heading>
      <Text>{event.description}</Text>

      <Button>Edit Event</Button>
      <Image src={event.image} alt={event.name} />
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
