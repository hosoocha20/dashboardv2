import React from "react";
import ImportantItem from "./ImportantItem";

const ImportantList = ({
  importantTasks,
  removeImportant,
  handleCheckedTask,
  listContainerStyle,
}) => {
  return (
    <ul className="importantTaskList" style={listContainerStyle}>
      {importantTasks
        .sort((a, b) => b.id - a.id)
        .map((i) =>
          !i.checked ? (
            <ImportantItem
              key={i.id}
              important={i}
              removeImportant={removeImportant}
              handleCheckedTask={handleCheckedTask}
            />
          ) : (
            ""
          )
        )}
    </ul>
  );
};

export default ImportantList;
