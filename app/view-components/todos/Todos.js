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
import Alert from "@reach/alert";
const initialState = [...constants.TODO_SEED];

const Todo = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [textInput, setTextInput] = useState("");
  const completedTodos = todos.filter(todo => todo.complete);
  //message that will be sent to screen reader upon successful completion of an action
  const [successMsg, setSuccessMsg] = useState("");
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

  function toggleComplete({ id, name, complete }) {
    dispatch({ type: "TOGGLE_COMPLETE", id });
    let completeString = !complete ? "completed" : "cancelled";
    sendScreenReaderSuccess(`${name} was ${completeString} successfully.`);
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
  //generates the action for the screen reader message based on if the itme is complete or not.
  function generateCompleteAction(dataItem) {
    return dataItem.complete ? "incompletes" : "completes";
  }
  //sends an alert to the screen reader after an action is complete.
  function sendSuccessMessage(msg) {
    setSuccessMsg(msg);
    setTimeout(() => {
      setSuccessMsg("");
    }, 5000);
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
          <Button
            onClick={e => {
              addTodo(e);
              sendSuccessMessage(`${textInput} added successfully.`);
            }}
            look="bare"
            icon="plus"
            type="submit"
          >
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
                  onClick={() => toggleComplete(props.dataItem)}
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
                  onClick={() => {
                    deleteTodo(props.dataItem.id);
                    sendSuccessMessage(
                      `${props.dataItem.name} was removed successfully.`
                    );
                  }}
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
      <Button
        look="bare"
        icon="reset"
        onClick={() => {
          clearTodos();
          sendSuccessMessage(`All todos removed successfully.`);
        }}
      >
        Remove All To Do's
      </Button>
      <Alert>{successMsg}</Alert>
    </>
  );
};

export default Todo;
