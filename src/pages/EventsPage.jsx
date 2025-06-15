import React from "react";
import { Heading } from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import { useUserCategory } from "../components/UserCategoryContext";

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
        const getTime = (dateStr) =>
          new Date(dateStr).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

        const dateOnly = event.startTime.split("T")[0];
        const fixedStartTime = getTime(event.startTime);
        const fixedEndTime = getTime(event.endTime);

        const categoryNames = event.categoryIds.map((id) => categories.find((cat)=> cat.id === id)?.name);
        const formattedCategories = categoryNames.length === 1
        ? categoryNames[0]
        : categoryNames.length === 2
        ? `${categoryNames[0]} & ${categoryNames[1]}`
        :'';

        return (
          <Link to={`/event/${event.id}`} key={event.id}>
          <div  className="event">
            
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <img src={event.image} alt={event.name}></img>
            <p>
              date: {dateOnly}
              From: {fixedStartTime} to: {fixedEndTime}
            </p>
            {categoryNames && <p>Category: {formattedCategories}</p>}
          </div>
          </Link>
        );
      })}
    </div>
  );
};
