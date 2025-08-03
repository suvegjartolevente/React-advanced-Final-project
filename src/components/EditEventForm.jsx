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

export const EditEventForm = ({ onSuccess, initialData, onAfterEdit }) => {
  const [error, setError] = useState("");
  const toast = useToast();
  const { editEvent } = useEvents();
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [image, setImage] = useState(initialData?.image || "");
  const [startTime, setStartTime] = useState(
    initialData?.startTime?.slice(0, 16) || ""
  );
  const [endTime, setEndTime] = useState(
    initialData?.endTime?.slice(0, 16) || ""
  );

  const [category, setCategory] = useState(initialData?.categoryIds || []);

  const [host, setHost] = useState(initialData?.createdBy?.toString() || "");

  const start = new Date(startTime);
  const end = new Date(endTime);

  const handleCategoryChange = (categoryId) => {
    setCategory((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (endTime <= startTime) {
      setError("End time must be after start time.");
      return;
    }
    const EditedEvent = {
      id: initialData.id,
      title,
      description,
      image,
      categoryIds: category,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      createdBy: parseInt(host),
    };

    try {
      const updated = await editEvent(EditedEvent);

      if (!updated || updated.error) {
        throw new Error("Failed to update event.");
      }
      if (onAfterEdit) onAfterEdit(updated);

      toast({
        title: "Event edited",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setError("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Could not update event.Please try again.");
      toast({
        title: "Error",
        description: err.message || "update failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box as="form" onSubmit={submitForm}>
      <FormLabel>Title</FormLabel>
      <Input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></Input>
      <FormLabel>Description</FormLabel>
      <Input
        type="text"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></Input>
      <FormLabel>Image URL</FormLabel>
      <Input
        type="text"
        name="image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></Input>
      <FormLabel>Start time</FormLabel>
      <Input
        type="datetime-local"
        name="startTime"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      ></Input>
      <FormLabel>End time</FormLabel>
      <Input
        type="datetime-local"
        name="endTime"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      ></Input>
      <FormLabel>Category</FormLabel>
      <Checkbox
        name="category"
        value="1"
        isChecked={category.includes(1)}
        onChange={() => handleCategoryChange(1)}
      >
        sports
      </Checkbox>
      <Checkbox
        name="category"
        value="2"
        isChecked={category.includes(2)}
        onChange={() => handleCategoryChange(2)}
      >
        games
      </Checkbox>
      <Checkbox
        name="category"
        value="3"
        isChecked={category.includes(3)}
        onChange={() => handleCategoryChange(3)}
      >
        relaxation
      </Checkbox>
      <FormLabel>Host</FormLabel>
      <Select
        name="host"
        value={host}
        placeholder="select host"
        onChange={(e) => setHost(e.target.value)}
      >
        <option value="1">Michael Turner</option>
        <option value="2">Sophia Collins</option>
        <option value="3">Emily Carter</option>
      </Select>
      {error && (
        <Box color="red.500" mt={2}>
          {error}
        </Box>
      )}

      <Button type="submit">Edit Event</Button>
    </Box>
  );
};
