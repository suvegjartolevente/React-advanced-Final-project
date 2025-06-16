import React from "react";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import { useUserCategory } from "../components/UserCategoryContext";

import { dateFormatter, timeFormatter } from "../Utils/Time&DateFormatter";
import { categoryFormatter } from "../Utils/CategoryFormatter";

export const loader = async () => {
  const eventsRes = await fetch(`http://localhost:3000/events`);

  const events = await eventsRes.json();

  return {
    events,
  };
};

export const EventsPage = () => {
  const { events } = useLoaderData();
  const { categories } = useUserCategory();

  return (
    <div className="events-list">
      <Heading>List of events</Heading>

      {events.map((event) => {
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
    </div>
  );
};
