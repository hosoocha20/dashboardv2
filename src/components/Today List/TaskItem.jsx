import React, { useState } from "react";

import { CheckIcon } from "@heroicons/react/24/outline";
import { BiPencil } from "react-icons/bi";
import { RxTrash } from "react-icons/rx";

const TaskItem = ({ task, deleteTask, toggleTask, enterEditMode }) => {
  const [isChecked, setIsChecked] = useState(task.checked);

  const handleCheckboxChange = (e) => {
    setIsChecked(!isChecked);
    toggleTask(task.id);
  };

  return (
    <li className="todayListItem">
      <div className="item-group">
        <input
          type="checkbox"
          className="checkbox"
          checked={isChecked}
          name={task.name}
          id={task.id}
          onChange={handleCheckboxChange}
        />
        <label className="taskLabel" htmlFor={task.id}>
          {task.name}
        </label>
      </div>
      <div className="icon-btn">
        <button
          className="btn edit"
          aria-label={`Update ${task.name} Task`}
          onClick={() => enterEditMode(task)}
        >
          <BiPencil
            className="edit-icon"
            onMouseOver={({ target }) => (target.style.color = "dimGray")}
            onMouseOut={({ target }) => (target.style.color = "darkGray")}
          />
        </button>
        <button
          className="btn delete"
          aria-label={`Delete ${task.name} Task`}
          onClick={() => deleteTask(task.id)}
        >
          <RxTrash
            className="delete-icon"
            onMouseOver={({ target }) => (target.style.color = "dimGray")}
            onMouseOut={({ target }) => (target.style.color = "darkGray")}
          />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
