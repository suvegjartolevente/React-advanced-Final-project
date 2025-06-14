import React from 'react';
import { Heading } from '@chakra-ui/react';
import { useLoaderData } from 'react-router-dom';

export const loader = async()=>{
  const eventsRes = await fetch(`http://localhost:3000/events`);

const events = await eventsRes.json();
return{
  events
};

};



export const EventsPage = () => {
  const {events} = useLoaderData();
  return (
  <div className="events-list">
<Heading>List of events</Heading>
{events.map((event)=>(
  <div key={event.id} className="event">
    <h2>{event.title}</h2>
    <p>{event.description}</p>
    <img src={event.image} alt={event.name}></img>
    <p>From: {event.startTime} to: {event.endTime}</p>
  </div>
) )}

  </div>);
};
