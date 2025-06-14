import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Box } from '@chakra-ui/react';
import { UserCategoryProvider } from './UserCategoryContext';


export const Root = () => {
  return (
    <UserCategoryProvider>
    <Box>
      <Navigation />
      <Outlet />
    </Box>
    </UserCategoryProvider>
  );
};
