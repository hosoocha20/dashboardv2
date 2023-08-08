import React, { useState } from "react";

const MainTodoForm = ({ addMainTask }) => {
  const [mainTask, setMainTask] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addMainTask({
      name: mainTask,
      checked: false,
      starred: false,
      id: Date.now(),
    });
    setMainTask("");
  };
  return (
    <form className="mainTodoForm" onSubmit={handleFormSubmit}>
      <input
        className="mainTodoFormInput"
        type="text"
        placeholder="Add a Task"
        id="mainTask"
        maxLength={60}
        value={mainTask}
        onInput={(e) => setMainTask(e.target.value)}
      />
      <button type="submit" className="mainTodoForm-btn">
        +
      </button>
    </form>
  );
};

export default MainTodoForm;
