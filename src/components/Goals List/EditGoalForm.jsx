import React, { useState } from "react";
import { AiOutlineEnter } from "react-icons/ai";

const EditGoalForm = ({ updateGoal, editedGoal, closeGoalEditMode }) => {
  const [updatedGoalName, setUpdatedGoalName] = useState(editedGoal.name);

  const handleFormSubmit = (e) => {
    e.preventDefault(); //prevent page refreshing
    updateGoal({ ...editedGoal, name: updatedGoalName });
  };
  return (
    <form
      className="goalTodoEdit"
      onSubmit={handleFormSubmit}
      onClick={(e) => {
        e.target === e.currentTarget && closeGoalEditMode();
      }}
    >
      <input
        type="text"
        id="editGoal"
        className="dashboardEdit-input"
        placeholder="Update Goal"
        value={updatedGoalName}
        onInput={(e) => setUpdatedGoalName(e.target.value)}
        autoFocus
        maxLength={25}
      />
      <button
        className="dashboard-btn"
        aria-label={`Confirm edited task to now read ${updatedGoalName}`}
        type="submit"
      >
        <AiOutlineEnter />
      </button>
    </form>
  );
};

export default EditGoalForm;
