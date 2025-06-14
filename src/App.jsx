import AddTask from './AddTask';
import DisplayAllTask from './DisplayAllTask';
import { useReducer, useLayoutEffect } from 'react';

export default function App() {
  const [state, dispatch] = useReducer(reducer, { todo: '', date: '', tasklist: [] });

  function reducer(state, action) {
    switch (action.type) {
      case 'typetodo':
        return { ...state, todo: action.payload };
      case 'typedate':
        return { ...state, date: action.payload };
      case 'loadlist':
        return { ...state, tasklist: action.payload };
          case 'addtask': {
      const updatedList = [...state.tasklist, action.payload];
      localStorage.setItem("tasklist", JSON.stringify(updatedList));
      return {
        ...state,
        tasklist: updatedList,
        todo: '',
        date: ''
      }
    }
    }
  }

    useLayoutEffect(() => {
    try {
      const tasklist = JSON.parse(localStorage.getItem('tasklist')) || [];
      dispatch({ type: 'loadlist', payload: tasklist });
    } catch (error) {
      console.error('Failed to load taskList from localStorage:', error);
    }
  }, []); 
   

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <AddTask state={state} dispatch={dispatch}/>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <DisplayAllTask state={state} />
        </div>
        <div className="col-6">Right!</div>
      </div>
    </div>
  );
}