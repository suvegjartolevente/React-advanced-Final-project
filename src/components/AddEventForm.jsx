import {
  Box,
  Button,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEvents } from "./UpdateProvider";

export const AddEventForm = ({ onSuccess }) => {
  const [error, setError] = useState("");
  const toast = useToast();
  const { addEvent } = useEvents();

  const submitForm = async (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const description = event.target.elements.description.value;
    const image = event.target.elements.image.value;
    const startTime = event.target.elements.startTime.value;
    const endTime = event.target.elements.endTime.value;

    const category = event.target.elements.category.value;
    const host = event.target.elements.host.value;

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (endTime <= startTime) {
      setError("End time must be after start time.");
      return;
    }
    const newEvent = {
      title,
      description,
      image,
      categoryIds: [parseInt(category)],
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      createdBy: parseInt(host),
    };

    addEvent(newEvent);

    toast({
      title: "Event added",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setError("");
    if (onSuccess) onSuccess();
  };

  return (
    <Box as="form" onSubmit={submitForm}>
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
