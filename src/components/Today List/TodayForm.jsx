import React from "react";
import { useState } from "react";

const TodayForm = ({ addTask }) => {
  const [task, setTask] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault(); 
    addTask({
      name: task,
      checked: false,
      id: Date.now(),
    });
    setTask(""); 
  };

  return (
    <form className="todayTodo" onSubmit={handleFormSubmit}>
      <input
        type="text"
        id="task"
        className="dashboard-input"
        placeholder="Add a Task for Today"
        value={task}
        onInput={(e) => setTask(e.target.value)}
        maxLength={25}
        autoComplete="off"
      />
      <button className="dashboard-btn" aria-label="Add Task" type="submit">
        +
      </button>
    </form>
  );
};

export default TodayForm;
