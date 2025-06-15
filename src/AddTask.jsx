function AddTask({ state, dispatch }) {
  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: Date.now() + Math.random(),
      todo: state.todo,
      date: state.date,
    };
    const updatedTaskList = [...state.tasklist, newTodo];
    localStorage.setItem("tasklist", JSON.stringify(updatedTaskList));
    dispatch({ type: "addtask", payload: newTodo });
  }

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Example: Paint your wall"
            id="todo"
            value={state.todo}
            onChange={(e) => dispatch({ type: "typetodo", payload: e.target.value })}
          />
        </div>
        <div className="col-md-5">
          <input
            type="date"
            className="form-control"
            value={state.date}
            onChange={(e) => dispatch({ type: "typedate", payload: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;