import { useEffect, useState } from "react";
import TodoTable from "../../components/dashboard/TodoTable";
import { get } from "../../services/api/todos";
import { DashboardWrapper, Error, Title } from "./Dashboard.components";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState();
  const fetchAllTodos = async () => {
    setError("");
    try {
      const todoList = await get();
      setTodos(todoList);
    } catch (error) {
      setError("Get todolist from server failed!");
    }
  };

  const handleDelete = (id) => {
    const delIdx = todos.findIndex((todo) => todo.id === id);
    todos.splice(delIdx, 1);
    setTodos([...todos]);
  };

  const handleUpdate = (id, data) => {
    const updIdx = todos.findIndex((todo) => todo.id === id);
    todos[updIdx] = {
      id,
      ...data,
    };
    setTodos([...todos]);
  };

  const handleCreate = (data) => {
    setTodos([data, ...todos]);
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  return (
    <DashboardWrapper>
      <Title>Altimate AI</Title>
      {error && <Error>{error}</Error>}
      <TodoTable
        todoList={todos}
        onError={(error) => {
          setError(error);
        }}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onCreate={handleCreate}
      />
    </DashboardWrapper>
  );
};

export default Dashboard;
