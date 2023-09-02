import React, { useEffect } from "react";
import { useState } from "react";
import { AiOutlineEnter } from "react-icons/ai";

const EditForm = ({ editedTask, updateTask, closeEditMode }) => {
  const [updatedTaskName, setUpdatedTaskName] = useState(editedTask.name);

  useEffect(() => {
    const closeModalIfEscaped = (e) => {
      e.key === "Escape" && closeEditMode();
    };
    window.addEventListener("keydown", closeModalIfEscaped);

    return () => {
      window.removeEventListener("keydown", closeModalIfEscaped);
    };
  }, [closeEditMode]);

  const handleFormSubmit = (e) => {
    e.preventDefault(); 
    updateTask({ ...editedTask, name: updatedTaskName });
  };

  return (
    <form
      className="todayTodoEdit"
      onSubmit={handleFormSubmit}
      onClick={(e) => {
        e.target === e.currentTarget && closeEditMode();
      }}
    >
      <input
        type="text"
        id="editTask"
        className="dashboardEdit-input"
        placeholder="Update Task"
        value={updatedTaskName}
        onInput={(e) => setUpdatedTaskName(e.target.value)}
        autoFocus
        maxLength={25}
        autoComplete="off"
      />
      <button
        className="dashboard-btn"
        aria-label={`Confirm edited task to now read ${updatedTaskName}`}
        type="submit"
      >
        <AiOutlineEnter />
      </button>
    </form>
  );
};

export default EditForm;
