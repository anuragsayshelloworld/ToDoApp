function AddTask({state, dispatch}){

function handleSubmit(e){
e.preventDefault();

const newTodo = {
    todo: state.todo,
    date: state.date
}
const updatedTaskList = [...state.tasklist, newTodo];
localStorage.setItem("tasklist", JSON.stringify(updatedTaskList));
dispatch({ type: "addtask", payload: newTodo });
}
  return <div>
    <form onSubmit={handleSubmit}>
    <input type="text" 
           placeholder="Example: Paint your wall" 
           id="todo"
           value={state.todo}
           onChange={(e)=>dispatch({type:"typetodo", payload: e.target.value})}/>
    
    <input type="date" 
           value={state.date} 
           onChange={(e)=>dispatch({type:"typedate", payload:e.target.value})}/>
    
    <button type="submit">Add</button>
    </form>
  </div>
}
export default AddTask;