import { Input, Text } from "@chakra-ui/react";

export const EventSearch = ({ searchField, onChange }) => {
  return (
    <>
      <Text fontWeight="bold" fontSize="2xl" marginTop={3}  >Search for events:</Text>
      <Input
      marginTop={3}
      marginBottom={3}
        bg="white"
        type="text"
        placeholder="Type to search"
        value={searchField}
        onChange={onChange}
      ></Input>
    </>
  );
};
