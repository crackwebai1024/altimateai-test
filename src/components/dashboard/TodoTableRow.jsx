import {
  CustomInput,
  StyledTableCell,
  StyledTableRow,
} from "./TodoTable.components";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import SaveIcon from "@mui/icons-material/Save";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import { deleteTodo, update } from "../../services/api/todos";

const TodoTableRow = ({ todo, onError, onDelete, onUpdate }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [completed, setCompleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const onInit = () => {
    setCompleted(todo.completed);
    setUserId(todo.userId);
    setTitle(todo.title);
  };
  const handleEdit = () => {
    onInit();
    setIsEdit(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await update(todo.id, {
        title,
        userId,
        completed,
      });
      setIsEdit(false);
      setIsSaving(false);
      onUpdate(todo.id, { title, userId, completed });
    } catch (error) {
      onError("update todo item failed");
      setTimeout(() => {
        onError("");
      }, 5000);
    }
  };

  const handleDelete = async () => {
    setIsSaving(true);
    try {
      await deleteTodo(todo.id);
      setIsSaving(false);
      setIsEdit(false);
      onDelete(todo.id);
    } catch (error) {
      onError("delete todo item failed");
      setTimeout(() => {
        onError("");
      }, 5000);
    }
  };

  useEffect(() => {
    onInit();
  }, [todo]);

  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
        {!isEdit ? (
          title
        ) : (
          <CustomInput
            value={title}
            size="small"
            fullWidth
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        )}
      </StyledTableCell>
      <StyledTableCell align="right">
        {isEdit ? (
          <CustomInput
            value={userId}
            size="small"
            fullWidth
            onChange={(e) => {
              setUserId(e.target.value);
            }}
          />
        ) : (
          userId
        )}
      </StyledTableCell>
      <StyledTableCell align="right">
        {isEdit ? (
          <Checkbox
            checked={completed}
            onChange={(e) => {
              setCompleted(e.target.checked);
            }}
          />
        ) : completed ? (
          <CheckBoxIcon color="success" />
        ) : (
          <DisabledByDefaultIcon color="warning" />
        )}
      </StyledTableCell>
      <StyledTableCell align="right">
        {isEdit ? (
          <>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              size="small"
              style={{ marginRight: "10px" }}
              disabled={isSaving}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              startIcon={<ScreenShareIcon />}
              size="small"
              onClick={() => {
                setIsEdit(false);
                onInit();
              }}
              disabled={isSaving}
            >
              Return
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              size="small"
              style={{ marginRight: "10px" }}
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              size="small"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default TodoTableRow;
