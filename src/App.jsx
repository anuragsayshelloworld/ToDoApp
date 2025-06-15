import { useReducer, useLayoutEffect, useState, useEffect } from "react";
import AddTask from "./AddTask";
import DisplayAllTask from "./DisplayAllTask";
import UpcomingTask from "./UpcomingTask";

function reducer(state, action) {
  switch (action.type) {
    case "typetodo":
      return { ...state, todo: action.payload };
    case "typedate":
      return { ...state, date: action.payload };
    case "loadlist":
      return { ...state, tasklist: action.payload };
    case "addtask": {
      const updatedList = [...state.tasklist, action.payload];
      localStorage.setItem("tasklist", JSON.stringify(updatedList));
      return {
        ...state,
        tasklist: updatedList,
        todo: "",
        date: "",
        lastAction: "addtask", // Track action for toast
      };
    }
    case "deletetask": {
      const updatedList = state.tasklist.filter((item) => action.payload !== item.id);
      localStorage.setItem("tasklist", JSON.stringify(updatedList));
      return {
        ...state,
        tasklist: updatedList,
        lastAction: "deletetask", // Track action for toast
      };
    }
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    todo: "",
    date: "",
    tasklist: [],
    lastAction: null, 
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };


  useEffect(() => {
    if (state.lastAction === "addtask") {
      showToastNotification("Task added successfully!");
    } else if (state.lastAction === "deletetask") {
      showToastNotification("Task deleted successfully!");
    }
  }, [state.lastAction]);

  useLayoutEffect(() => {
    try {
      const tasklist = JSON.parse(localStorage.getItem("tasklist")) || [];
      dispatch({ type: "loadlist", payload: tasklist });
    } catch (error) {
      console.error("Failed to load taskList from localStorage:", error);
    }
  }, []);

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Add New Task</h5>
              <AddTask state={state} dispatch={dispatch} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">All Tasks</h5>
              <DisplayAllTask state={state} dispatch={dispatch} />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <UpcomingTask state={state} />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`toast align-items-center position-fixed bottom-0 end-0 m-3 ${showToast ? "show" : ""}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{toastMessage}</div>
          <button
            type="button"
            className="btn-close me-2 m-auto"
            onClick={() => setShowToast(false)}
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
}