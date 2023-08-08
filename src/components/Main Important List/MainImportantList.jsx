import React from "react";
import MainImportantItem from "./MainImportantItem";
import MainImportantEditForm from "./MainImportantEditForm";

const MainImportantList = ({
  mainTasks,
  deleteMainTask,
  enterMainTaskEditMode,
  isEditingMainTask,
  editedMainTask,
  updateMainTask,
  closeMainTaskEditMode,
  addCompletedTask,
  toggleTaskStarred,
  toggleCompletedTask,
  mainImContainerStyle,
}) => {
  return (
    <div className="mainImportantList-container" style={mainImContainerStyle}>
      <ul className="mainImportantList">
        {mainTasks
          .sort((a, b) => b.starred - a.starred || b.id - a.id)
          .map((t) =>
            isEditingMainTask === true && editedMainTask.id === t.id ? (
              isEditingMainTask && (
                <MainImportantEditForm
                  key={t.id}
                  editedMainTask={editedMainTask}
                  updateMainTask={updateMainTask}
                  closeMainTaskEditMode={closeMainTaskEditMode}
                />
              )
            ) : !t.checked ? (
              <MainImportantItem
                key={t.id}
                mainTask={t}
                deleteMainTask={deleteMainTask}
                enterMainTaskEditMode={enterMainTaskEditMode}
                addCompletedTask={addCompletedTask}
                toggleTaskStarred={toggleTaskStarred}
                toggleCompletedTask={toggleCompletedTask}
              />
            ) : (
              ""
            )
          )}
      </ul>
    </div>
  );
};

export default MainImportantList;
