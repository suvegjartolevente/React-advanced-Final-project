import { Flex, List, ListItem, Link } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <Flex as="nav" p={4} justify="center" bg="#48dbf9">
      <List display="flex" gap={6}>
        <ListItem>
          <Link
            as={RouterLink}
            to="/"
            fontSize="5xl"
            color="white"
            fontWeight="bold"
            _hover={{ textDecoration: "none" }}
          >
            Home
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
};
