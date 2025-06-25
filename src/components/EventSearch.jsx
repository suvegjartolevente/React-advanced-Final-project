import {  Input } from "@chakra-ui/react";


export const EventSearch = ({searchField,onChange}) => {

  return (
    <>
      <label>Search for events:</label>
      <Input
        type="text"
        placeholder="Type to search"
        value={searchField}
        onChange={onChange}
      ></Input>
    </>
  );
};
