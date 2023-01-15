import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { PaginationWrapper, StyledTableCell } from "./TodoTable.components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import TodoTableRow from "./TodoTableRow";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateTodoModal from "./CreateTodoModal";
import Box from "@mui/material/Box/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";

const TodoTable = ({ todoList, onError, onUpdate, onDelete, onCreate }) => {
  const [open, setOpen] = useState(false);
  const limit = 10;
  const [filterUserId, setFilterUserId] = useState(undefined);
  const [filterCompleteStatus, setFilterCompleteStatus] = useState(undefined);
  const [page, setPage] = useState(1);
  const filteredList = () => {
    let list = todoList;
    if (filterUserId) {
      list = list.filter((todo) => todo.userId == filterUserId);
    }
    if (filterCompleteStatus !== undefined) {
      list = list.filter((todo) => todo.completed === filterCompleteStatus);
    }
    return list;
  };
  const pageCount = Math.floor(filteredList().length / limit) + 1;
  const paginatedResult = filteredList().slice(
    limit * (page - 1),
    limit * page
  );
  const handleAddClick = () => {
    setOpen(true);
  };

  const handleSave = (data) => {
    onCreate(data);
  };

  return (
    <div>
      <PaginationWrapper>
        <Box display="flex" alignItems="center">
          <Button
            variant="contained"
            startIcon={<AddIcon color="white" />}
            size="small"
            style={{ marginRight: "10px", height: 40 }}
            onClick={handleAddClick}
          >
            Add Todo
          </Button>
          <TextField
            label="Filter By UserID"
            id="outlined-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            size="small"
            type="number"
            onChange={(e) => setFilterUserId(e.target.value)}
          />
          Filter By Completed Status:
          <Checkbox
            onChange={(e) => {
              setFilterCompleteStatus(e.target.checked);
            }}
          />
        </Box>
        <Pagination
          count={pageCount}
          page={page}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
          onChange={(event, page) => {
            setPage(page);
          }}
        />
      </PaginationWrapper>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="right" width="200px">
                UserID
              </StyledTableCell>
              <StyledTableCell align="right" width="200px">
                Completed Status
              </StyledTableCell>
              <StyledTableCell align="right" width="200px"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedResult.map((todo) => (
              <TodoTableRow
                todo={todo}
                key={todo.id}
                onError={onError}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateTodoModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onSubmit={handleSave}
        onError={onError}
      />
    </div>
  );
};

export default TodoTable;
