import React, {
  useState,
  useReducer,
  useRef,
  useContext,
  useEffect
} from "react";
import "@progress/kendo-theme-material/dist/all.css";

import * as constants from "./constants";
import { todoReducer } from "./todoReducer";

import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";

const initialState = [...constants.TODO_SEED];

const Todo = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [textInput, setTextInput] = useState("");
  const completedTodos = todos.filter(todo => todo.complete);

  document.title = `The To Do List`;

  useEffect(() => {
    document.title = `${completedTodos.length} completed to do's`;
  });

  function addTodo(event) {
    event.preventDefault();
    dispatch({
      type: "ADD_TODO",
      name: textInput,
      complete: false
    });
    setTextInput("");
  }

  function toggleComplete(id) {
    dispatch({ type: "TOGGLE_COMPLETE", id });
  }
  function deleteTodo(id) {
    dispatch({ type: "DELETE_TODO", id });
  }
  function clearTodos() {
    dispatch({ type: "CLEAR_TODOS" });
  }

  // function rowRender(trElement, props) {
  //   const isEven = props.dataItem.id % 2 == 0;
  //   const evenColor = { backgroundColor: "#1f1f1f" };
  //   const oddColor = { backgroundColor: "#191919" };
  //   const trProps = { style: isEven ? evenColor : oddColor };
  //   return React.cloneElement(
  //     trElement,
  //     { ...trProps },
  //     trElement.props.children
  //   );
  // }

  function textInputOnChange(event) {
    const value = event.target.value;
    if (textInput !== value) {
      setTextInput(value);
    }
  }

  function setScreenReaderMessage(name, action) {
    return ` ${action} to do item: ${name}`;
  }
  function generateCompleteAction(dataItem) {
    return dataItem.complete ? "incompletes" : "completes";
  }
  return (
    <>
      <div className="todo-form">
        <form onSubmit={addTodo}>
          <Input
            onChange={textInputOnChange}
            value={textInput}
            type="search"
            placeholder="Enter task..."
            autoComplete="off"
          />
          <Button onClick={addTodo} look="bare" icon="plus" type="submit">
            Add To Do
          </Button>
        </form>
      </div>
      <div className="todo-container">
        <Grid
          // rowRender={rowRender}
          data={todos}
          style={{ width: "100%", height: "100%" }}
        >
          <Column field="name" title="Name" />
          <Column
            field="complete"
            title="Completed"
            cell={props => (
              <td>
                <Button
                  onClick={() => toggleComplete(props.dataItem.id)}
                  aria-label={setScreenReaderMessage(
                    props.dataItem.name,
                    generateCompleteAction(props.dataItem)
                  )}
                  look="bare"
                  icon={
                    props.dataItem[props.field]
                      ? "checkbox-checked"
                      : "checkbox"
                  }
                />
              </td>
            )}
          />
          <Column
            title="Remove"
            cell={props => (
              <td>
                <Button
                  onClick={() => deleteTodo(props.dataItem.id)}
                  aria-label={setScreenReaderMessage(
                    props.dataItem.name,
                    "removes"
                  )}
                  look="bare"
                  icon="trash"
                />
              </td>
            )}
          />
        </Grid>
      </div>
      <Button look="bare" icon="reset" onClick={() => clearTodos()}>
        Remove All To Do's
      </Button>
    </>
  );
};

export default Todo;
