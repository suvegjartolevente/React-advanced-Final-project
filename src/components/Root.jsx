import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { UserCategoryProvider } from "./AppProvider";
import { EventProvider } from "./UpdateProvider";

export const Root = () => {
  return (
    <EventProvider>
      <UserCategoryProvider>
        <Box>
          <Navigation />
          <Outlet />
        </Box>
      </UserCategoryProvider>
    </EventProvider>
  );
};
