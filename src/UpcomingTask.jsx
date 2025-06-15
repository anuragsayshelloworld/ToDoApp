import { useEffect, useState } from "react";

export default function UpcomingTask({ state }) {
  const [requiredList, setRequiredList] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const requiredList = state.tasklist.filter((item) => item.date === today);
    setRequiredList(requiredList);
  }, [state.tasklist]);

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Today's Tasks</h4>
      {requiredList.length > 0 ? (
        <ul className="list-group">
          {requiredList.map((item) => (
            <li key={item.id} className="list-group-item">
              {item.todo}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No tasks scheduled for today.</p>
      )}
    </div>
  );
}