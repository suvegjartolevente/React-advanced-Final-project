import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './components/Root';
import { EventsPage, loader as eventsPageLoader } from "./pages/EventsPage";
import { EventPage, loader as eventPageLoader } from "./pages/EventPage";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <EventsPage />,
         loader: eventsPageLoader,
      },
      {
        path: '/event/:eventId',
        element: <EventPage />,
         loader: eventPageLoader,
        // action: addComment,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
