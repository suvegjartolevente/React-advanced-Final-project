import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { AddEventForm } from "../AddEventForm";
import { EditEventForm } from "../EditEventForm";

export const ModalForm = ({ isOpen, onClose, initialData }) => {
  const isEditMode = !!initialData;

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent size="xl">
          <ModalHeader>
            {isEditMode ? "Edit Event" : "Add new event"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isEditMode ? (
              <EditEventForm
                onSuccess={onClose}
                initialData={initialData}
               
              />
            ) : (
              <AddEventForm onSuccess={onClose}/>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
