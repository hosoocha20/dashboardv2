import React, { useState } from "react";

const GoalsForm = ({ addGoal }) => {
  const [goal, setGoal] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addGoal({
      name: goal,
      checked: false,
      id: Date.now(),
    });
    setGoal("");
  };
  return (
    <form className="goalsForm" onSubmit={handleFormSubmit}>
      <input
        className="dashboard-input"
        type="text"
        placeholder="Add a Goal"
        id="goal"
        value={goal}
        onInput={(e) => {
          setGoal(e.target.value);
        }}
        maxLength={25}
      />
      <button className="dashboard-btn" type="submit" aria-label="Add Goal">
        +
      </button>
    </form>
  );
};

export default GoalsForm;
