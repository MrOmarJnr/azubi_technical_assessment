import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const AddTodoForm = ({ fetchTodos, page, limit }) => {
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    activity: "",
    date: "",
    strStatus: "",
  });

  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const isValidateInputs =
    newTodo.title.length < 10 || newTodo.description.length < 15;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAddingTodo(true);

    try {
      const response = await axios.post("http://localhost:3000/api/todos", newTodo);
      console.log("Todo added successfully:", response.data);

      // Clear the form after a successful submission
      setNewTodo({
        title: "",
        description: "",
        activity: "",
        date: "",
        strStatus: "",
      });

      // Fetch the updated todo list if necessary
      if (fetchTodos) {
        fetchTodos(page, limit);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setIsAddingTodo(false);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        alignItems: "flex-start",
        flexGrow: 1,
        height: "70px",
        gap: 4,
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="title"
        name="title"
        label="Todo Title"
        variant="outlined"
        value={newTodo.title}
        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        error={newTodo.title.length > 0 && newTodo.title.length < 10}
        helperText={
          newTodo.title.length > 0 && newTodo.title.length < 10
            ? "Title must be at least 10 characters"
            : ""
        }
        sx={{
          width: "30%",
        }}
      />
      <TextField
        id="description"
        name="description"
        label="Todo Description"
        variant="outlined"
        value={newTodo.description}
        onChange={(e) =>
          setNewTodo({ ...newTodo, description: e.target.value })
        }
        error={
          newTodo.description.length > 0 && newTodo.description.length < 15
        }
        helperText={
          newTodo.description.length > 0 && newTodo.description.length < 15
            ? "Description must be at least 15 characters"
            : ""
        }
        sx={{
          flexGrow: 1,
        }}
      />
      <LoadingButton
        loading={isAddingTodo}
        variant="contained"
        size="large"
        type="submit"
        disabled={isValidateInputs}
        sx={{
          p: "14px",
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        }}
      >
        Add Todo
      </LoadingButton>
    </Box>
  );
};

export default AddTodoForm;
