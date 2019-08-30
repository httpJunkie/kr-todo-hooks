import React, { useState, useReducer, useEffect, useContext } from "react";

import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import "@progress/kendo-theme-material/dist/all.css";

import { AppContext } from "../../context/AppContext";
import * as constants from "./constants";
import { todoReducer } from "./todoReducer";

const initialState = [...constants.TODO_SEED];

const Todoz = () => {
  const context = useContext(AppContext);
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [textInput, setTextInput] = useState("");
  const completedTodos = todos.filter(todo => todo.complete);

  useEffect(() => {
    document.title = `${completedTodos.length} completed to do's`;
  });

  useEffect(() => {
    if(!todos.length) {
      context.setScreenAnnoncement('No To Do\'s remaining.');
    }
  }, [todos]);

  function addTodo(event) {
    event.preventDefault();
    dispatch({
      type: "ADD_TODO",
      name: textInput,
      complete: false
    });
    setTextInput("");
    context.setScreenAnnoncement(`${textInput} added.`);
  }
  function toggleComplete({ id, name, complete }) {
    dispatch({ type: "TOGGLE_COMPLETE", id });
    let completeString = !complete ? "completed" : "cancelled";
    context.setScreenAnnoncement(`${name} was ${completeString}.`);
  }
  function deleteTodo(item) {
    let id = item.id
    dispatch({ type: "DELETE_TODO", id });
    context.setScreenAnnoncement(`${item.name} was removed.`);
  }
  function clearTodos() {
    dispatch({ type: "CLEAR_TODOS" });
    context.setScreenAnnoncement(`All todos removed.`);
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
        <Grid
          // rowRender={rowRender}
          data={todos} style={{ width: "100%", height: "100%" }}
        >
          <Column field="name" title="Name" />
          <Column field="complete" title="Completed"
            cell={props => (
              <td>
                <Button onClick={() => toggleComplete(props.dataItem)}
                  aria-label={`${props.dataItem.complete ? 'Unc' : 'C'}ompletes ${props.dataItem.name}.`}
                  look="bare" icon={props.dataItem[props.field] ? "checkbox-checked" : "checkbox" }
                />
              </td>
            )}
          />
          <Column title="Remove"
            cell={props => (
              <td>
                <Button onClick={() => deleteTodo(props.dataItem)} 
                  aria-label={`removes ${props.dataItem.name}`}
                  look="bare" icon="trash"
                />
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

export default Todoz;
