import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { HiOutlineStar } from "react-icons/hi";
import { HiStar } from "react-icons/hi";
import { RxStar, RxStarFilled } from "react-icons/rx";
import { RxTrash } from "react-icons/rx";

const CompletedTaskItem = ({
  completedTask,
  deleteCompletedTask,
  toggleTask,
  toggleCompletedTaskStarred,
  addStarredTask,
  removeStarredTask,
  toggleCompletedStarredTask,
}) => {
  const [isChecked, setIsChecked] = useState(completedTask.checked);
  const [isActive, setIsActive] = useState(completedTask.starred);
  const handleCheckboxChange = (e) => {
    setIsChecked(!isChecked);
    toggleTask(completedTask);
    toggleCompletedStarredTask(completedTask.id);
  };
  const handleStarredChange2 = (e) => {
    setIsActive(!isActive);
    toggleCompletedTaskStarred(completedTask.id);
    addStarredTask(completedTask);
  };

  const handleStarredChange = (e) => {
    setIsActive(!isActive);
    toggleCompletedTaskStarred(completedTask.id);
    removeStarredTask(completedTask);
  };
  return (
    <li className="completedTaskItem">
      <div className="completedItem-group">
        <input
          type="checkbox"
          className="mainCheckbox"
          checked={isChecked}
          name={completedTask.name}
          id={completedTask.id}
          onChange={handleCheckboxChange}
        />
        <label className="completedTaskLabel" htmlFor={completedTask.id}>
          {completedTask.name}
        </label>
      </div>
      <div className="mainIcon-btns">
        <div
          className="btn mainDelete"
          aria-label={`Delete ${completedTask.name} Task`}
        >
          <RxTrash
            className="mainDelete-icon"
            size="17px"
            onClick={() => deleteCompletedTask(completedTask.id)}
            onMouseOver={({ target }) => (target.style.color = "dimGray")}
            onMouseOut={({ target }) => (target.style.color = "darkGray")}
          />
        </div>
        <div className="btn mainStar">
          {isActive ? (
            <RxStarFilled
              color="gold"
              size="21px"
              onClick={() => {
                handleStarredChange();
              }}
            />
          ) : (
            <RxStar
              color="gold"
              size="21px"
              onClick={() => {
                handleStarredChange2();
              }}
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default CompletedTaskItem;
