import React from "react";
import { useState } from "react";

const ImportantForm = ({ addImportant }) => {
  const [important, setImportant] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addImportant({
      name: important,
      checked: false,
      starred: true,
      id: Date.now(),
    });
    setImportant("");
  };

  return (
    <form className="importantForm" onSubmit={handleFormSubmit}>
      <input
        className="dashboard-input"
        type="text"
        id="important"
        placeholder="Add an Important Task"
        value={important}
        onInput={(e) => {
          setImportant(e.target.value);
        }}
        maxLength={60}
        autoComplete="off"
      />
      <button
        className="dashboard-btn"
        type="submit"
        aria-label="Add Important Task"
      >
        +
      </button>
    </form>
  );
};

export default ImportantForm;
