import React, { useState, useReducer, useEffect, useContext } from "react";

import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import "@progress/kendo-theme-material/dist/all.css";

import * as constants from "./constants";
import { todoReducer } from "./todoReducer";

const initialState = [...constants.TODO_SEED];

const Todo = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [textInput, setTextInput] = useState('');
 
  const completedTodos = todos.filter((todo) => todo.complete);

  useEffect(() => {
    document.title = `${completedTodos.length} completed to do's`;
  });

  function addTodo(event) {
    event.preventDefault();
    dispatch({
      type: 'ADD_TODO',
      name: textInput,
      complete: false
    });
    setTextInput('');
  }
  function toggleComplete(id) {
    dispatch({ type: 'TOGGLE_COMPLETE', id });
  }
  function deleteTodo(id) {
    dispatch({ type: 'DELETE_TODO', id });
  }
  function clearTodos() {
    dispatch({ type: 'CLEAR_TODOS' });
  }

  function updateTextInput(event) {
    const value = event.target.value;
    if (textInput !== value) {
      setTextInput(value);
    }
  }

  return (
    <>
      <div className="todo-form">
        <form onSubmit={addTodo}>
          <Input onChange={updateTextInput} value={textInput} type="search" placeholder="Enter task..." autoComplete="off" />
          <Button onClick={e => addTodo(e)} look="bare" icon="plus" type="submit">
            Add To Do
          </Button>
        </form>
      </div>
      <div className="todo-container">
        <Grid data={todos} style={{ width: "100%", height: "100%" }}>
          <Column field="name" title="Name" />
          <Column field="complete" title="Completed"
            cell={(props) => (
              <td>
                <Button onClick={() => toggleComplete(props.dataItem.id)}
                  look="bare" 
                  icon={props.dataItem[props.field] 
                    ? "checkbox-checked" 
                    : "checkbox" }
                />
              </td>
            )}
          />
          <Column title="Remove"
            cell={(props) => (
              <td>
                <Button onClick={() => deleteTodo(props.dataItem.id)} look="bare" icon="trash" />
              </td>
            )}
          />
        </Grid>
      </div>
      <Button onClick={() => clearTodos()} look="bare" icon="reset">
        Remove All To Do's
      </Button>
    </>
  );
};

export default Todo;
