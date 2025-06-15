import { useEffect, useState } from "react";

function DisplayAllTask({ state, dispatch }) {
  const [search, setSearch] = useState('');
  const [required, setRequired] = useState([]);
  const [date, setDate] = useState('');

  useEffect(() => {
    const requiredList = state.tasklist.filter(item => {
      const matchesSearch = search === '' || item.todo.toLowerCase().includes(search.toLowerCase());
      const matchesDate = date === '' || item.date === date;
      return matchesSearch && matchesDate;
    });
    setRequired(requiredList);
  }, [search, date, state.tasklist]);

  useEffect(() => {
    if (state.tasklist.length === 0) setSearch('');
  }, [state.tasklist]);

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
      <ol className="list-group list-group-numbered">
        {required.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {item.todo} - {item.date}
            </span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => dispatch({ type: 'deletetask', payload: item.id })}
            >
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default DisplayAllTask;