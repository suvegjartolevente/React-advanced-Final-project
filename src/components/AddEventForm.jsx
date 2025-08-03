import {
  Box,
  Button,
  Checkbox,
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
    const host = event.target.elements.host.value;

    const start = new Date(startTime);
    const end = new Date(endTime);

    const categoryCheckboxes = event.target.querySelectorAll(
      'input[name="category"]:checked'
    );

    const selected = Array.from(categoryCheckboxes).map((checkbox) =>
      parseInt(checkbox.value)
    );

    if (endTime <= startTime) {
      setError("End time must be after start time.");
      
      return;
    }
    const newEvent = {
      title,
      description,
      image,
      categoryIds: selected,
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

      <Checkbox name="category" value="1">
        sports
      </Checkbox>
      <Checkbox name="category" value="2">
        games
      </Checkbox>
      <Checkbox name="category" value="3">
        relaxation
      </Checkbox>

      <FormLabel>Host</FormLabel>
      <Select name="host" placeholder="select host">
        <option value="1">Michael Turner</option>
        <option value="2">Sophia Collins</option>
        <option value="3">Emily Carter</option>
      </Select>
      {error && (
        <Box color="red.500" mt={2}>
          {error}
        </Box>
      )}
      <Button type="submit">Add Event</Button>
    </Box>
  );
};
