import {
  Box,
  Button,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

export const AddEventForm = ({ onSucces }) => {
  const [error, setError] = useState("");
  const toast = useToast();
  // const { addBook } = useLibrary();
  const submitForm = (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const description = event.target.elements.description.value;
    const image = event.target.elements.image.value;
    const startTime = event.target.elements.startTime.value;
    const endTime = event.target.elements.endTime.value;

    const category = event.target.elements.category.value;
    const host = event.target.elements.host.value;
    if (endTime <= startTime) {
      setError("End time must be after start time.");
      return;
    }

    addEvent({ title, description, image, category, startTime, endTime, host });
    const newEvent = {
      title,
      description,
      image,
      categoryIds: [parseInt(category)],
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      createdBy: parseInt(host),
    };
    toast({
      title: "Event added",
      status: "succes",
      duration: 3000,
      isClosable: true,
    });
    setError("");
    if (onSucces) onSucces();
  };

  return (
    <Box onSubmit={submitForm}>
      <FormLabel>Title</FormLabel>
      <Input type="text" name="title"></Input>
      <FormLabel>Description</FormLabel>
      <Input type="text" name="description"></Input>
      <FormLabel>Image URL</FormLabel>
      <Input type="text" name="image"></Input>
      <FormLabel>Start time</FormLabel>
      <Input type="datetime-local" name="startTime"></Input>
      <FormLabel>End time</FormLabel>
      <Input type="datetime-local" name="endTime"></Input>
      <FormLabel>Category</FormLabel>
      <Select name="category" placeholder="select category">
        <option value="1">sports</option>
        <option value="2">games</option>
        <option value="3">relaxation</option>
      </Select>
      <FormLabel>Host</FormLabel>
      <Select name="host" placeholder="select host">
        <option value="1">Michael Turner</option>
        <option value="2">Sophia Collins</option>
        <option value="3">Emily Carter</option>
      </Select>

      <Button type="submit">Add Event</Button>
    </Box>
  );
};
