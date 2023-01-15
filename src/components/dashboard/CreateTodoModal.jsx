import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box/Box";
import { useState } from "react";
import { create } from "../../services/api/todos";

const CreateTodoModal = ({ open, onClose, onSubmit, onError }) => {
  const [userId, setUserId] = useState();
  const [userIdError, setUserIdError] = useState(false);
  const [title, setTitle] = useState();
  const [titleError, setTitleError] = useState(false);
  const [completed, setComplete] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    let error = false;
    if (!userId) {
      setUserIdError(true);
      error = true;
    }
    if (!title) {
      setTitleError(true);
      error = true;
    }
    if (error) {
      return;
    }
    setIsSubmitting(true);
    try {
      const createdData = await create({
        userId,
        title,
        completed: !!completed,
      });
      onSubmit(createdData);
    } catch (error) {
      onError("create task failed");
    }
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" fontWeight={700}>
        Create a Todo Task
      </DialogTitle>
      <DialogContent>
        <Box display="flex" width="400px" marginY={2} alignItems="center">
          <Typography
            fontSize="12px"
            fontWeight={600}
            width="150px"
            textAlign="right"
            paddingRight="20px"
          >
            User ID:
          </Typography>
          <TextField
            value={userId}
            error={userIdError}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            size="small"
          />
        </Box>
        <Box display="flex" width="400px" marginY={2} alignItems="center">
          <Typography
            fontSize="12px"
            fontWeight={600}
            width="150px"
            textAlign="right"
            paddingRight="20px"
          >
            Title:
          </Typography>
          <TextField
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            size="small"
          />
        </Box>
        <Box display="flex" width="400px" marginY={2} alignItems="center">
          <Typography
            fontSize="12px"
            fontWeight={600}
            width="150px"
            textAlign="right"
            paddingRight="20px"
          >
            Complete Status:
          </Typography>
          <Checkbox
            checked={completed}
            onChange={(e) => {
              setComplete(e.target.checked);
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          Submit
        </Button>
        <Button onClick={onClose} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTodoModal;
