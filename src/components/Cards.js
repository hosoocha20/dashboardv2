import React from "react";
import "./Cards.css";
import TodayForm from "./Today List/TodayForm";
import TodayTaskList from "./Today List/TodayTaskList";

import ImportantForm from "./Important List/ImportantForm";

import { useState, useRef, useEffect } from "react";
// Custom hooks
import useLocalStorage from "../hooks/useLocalStorage";

import ImportantList from "./Important List/ImportantList";
import GoalsForm from "./Goals List/GoalsForm";
import GoalsList from "./Goals List/GoalsList";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css";

function Cards() {
  const [listContainerSize, setListContainerSize] = useState();

  const [todayTasks, setTodayTasks] = useLocalStorage(
    "dashboard.todayTasks",
    []
  );
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const contListRef = useRef();

  const getListContainerSize = () => {
    const newHeight = contListRef.current.clientHeight;

    setListContainerSize(newHeight - 140);
  };
  const listContainerStyle = {
    maxHeight: listContainerSize,
  };

  useEffect(() => {
    getListContainerSize();
    window.addEventListener("resize", getListContainerSize);
  }, []);

  const addTask = (task) => {
    //console.log(task)
    //prevent empty spaces from being entered
    if (!task.name || /^\s*$/.test(task.name)) {
      return;
    }
    setTodayTasks((prevState) => [...prevState, task]);
  };

  const deleteTask = (id) => {
    setTodayTasks((prevState) => prevState.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTodayTasks((prevState) =>
      prevState.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };
  const updateTask = (task) => {
    if (!task.name || /^\s*$/.test(task.name)) {
      deleteTask(task.id);
      return;
    }
    setTodayTasks((prevState) =>
      prevState.map((t) => (t.id === task.id ? { ...t, name: task.name } : t))
    );
    ///close the edit mode
    closeEditMode();
  };
  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl.focus();
  };
  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  };

  ///Important Task Functions
  const [importantTasks, setImportantTasks] = useLocalStorage(
    "tasks.starredTasks",
    []
  );
  const [mainTodoTasks, setMainTodoTasks] = useLocalStorage(
    "tasks.mainTasks",
    []
  );
  const [completedTodoTasks, setCompletedTodoTasks] = useLocalStorage(
    "tasks.completedTasks",
    []
  );
  const addImportant = (important) => {
    if (!important.name || /^\s*$/.test(important.name)) {
      return;
    }
    setImportantTasks((prevState) => [...prevState, important]);
    //also add to mainTasks array
    setMainTodoTasks((prevState) => [...prevState, important]);
  };

  const removeImportant = (id) => {
    setImportantTasks((prevState) => prevState.filter((t) => t.id !== id));
    //unstar task in mainTask array
    setMainTodoTasks((prevState) =>
      prevState.map((t) => (t.id === id ? { ...t, starred: !t.starred } : t))
    );
  };
  const handleCheckedTask = (important) => {
    //add to completed Task array
    setCompletedTodoTasks((prevState) => [...prevState, important]);
    setCompletedTodoTasks((prevState) =>
      prevState.map((t) =>
        t.id === important.id ? { ...t, checked: !t.checked } : t
      )
    );
    //remove from starredTask array
    const timeout = setTimeout(function () {
      setImportantTasks((prevState) =>
        prevState.filter((t) => t.id !== important.id)
      );
    }, 150);

    //remove from mainTask array
    setMainTodoTasks((prevState) =>
      prevState.filter((t) => t.id !== important.id)
    );
  };

  ///Goals Functions
  const [goals, setGoals] = useLocalStorage("dashboard.goals", []);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [editedGoal, setEditedGoal] = useState(null);
  const [previousFocusGoalEl, setPreviousFocusGoalEl] = useState(null);
  const addGoal = (goal) => {
    if (!goal.name || /^\s*$/.test(goal.name)) {
      return;
    }
    setGoals((prevState) => [...prevState, goal]);
  };

  const deleteGoal = (goalID) => {
    setGoals((prevState) => prevState.filter((g) => g.id !== goalID));
  };

  const updateGoal = (goal) => {
    ///If backspace update and enter then it just deletes the goal
    if (!goal.name || /^\s*$/.test(goal.name)) {
      deleteGoal(goal.id);
      return;
    }
    setGoals((prevState) =>
      prevState.map((g) => (g.id === goal.id ? { ...g, name: goal.name } : g))
    );
    ///close the edit mode
    closeGoalEditMode();
  };
  const closeGoalEditMode = () => {
    setIsEditingGoal(false);
    previousFocusGoalEl.focus();
  };
  const enterGoalEditMode = (goal) => {
    setEditedGoal(goal);
    setIsEditingGoal(true);
    setPreviousFocusGoalEl(document.activeElement);
  };
  const toggleGoal = (id) => {
    setGoals((prevState) =>
      prevState.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  return (
    <div className="Cards">
      <div className="cards-laptop-view">
        <div className="card-item one" ref={contListRef}>
          <h3>Important</h3>
          <div className="todo-important">
            <ImportantForm addImportant={addImportant} />
            {importantTasks && (
              <ImportantList
                importantTasks={importantTasks}
                removeImportant={removeImportant}
                handleCheckedTask={handleCheckedTask}
                listContainerStyle={listContainerStyle}
              />
            )}
          </div>
        </div>

        <div className="card-item two">
          <h3>Today</h3>
          <div className="todo-today">
            <TodayForm addTask={addTask} />
            {/* {
              isEditing && (
                <EditForm  editedTask={editedTask} updateTask={updateTask} closeEditMode = {closeEditMode}/>  
              )

            } */}
            {todayTasks && (
              <TodayTaskList
                todayTasks={todayTasks}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
                enterEditMode={enterEditMode}
                isEditing={isEditing}
                editedTask={editedTask}
                updateTask={updateTask}
                closeEditMode={closeEditMode}
                listContainerStyle={listContainerStyle}
              />
            )}
          </div>
        </div>

        <div className="card-item three">
          <h3>Goals</h3>
          <div className="todo-goals">
            <GoalsForm addGoal={addGoal} />
            {/* {
              isEditingGoal && (
                <EditGoalForm  editedGoal={editedGoal} updateGoal={updateGoal} closeGoalEditMode = {closeGoalEditMode}/>  
              )

            } */}
            {goals && (
              <GoalsList
                goals={goals}
                deleteGoal={deleteGoal}
                enterGoalEditMode={enterGoalEditMode}
                isEditingGoal={isEditingGoal}
                editedGoal={editedGoal}
                updateGoal={updateGoal}
                closeGoalEditMode={closeGoalEditMode}
                toggleGoal={toggleGoal}
                listContainerStyle={listContainerStyle}
              />
            )}
          </div>
        </div>
      </div>
      <div className="cards-touchscreen-view">
        <Swiper
          pagination={true}
          modules={[Pagination]}
          spaceBetween={10}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="card-item one">
              <h3>Important</h3>
              <div className="todo-important">
                <ImportantForm addImportant={addImportant} />
                {importantTasks && (
                  <ImportantList
                    importantTasks={importantTasks}
                    removeImportant={removeImportant}
                    handleCheckedTask={handleCheckedTask}
                  />
                )}
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card-item two">
              <h3>Today</h3>
              <div className="todo-today">
                <TodayForm addTask={addTask} />
                {/* {
                isEditing && (
                  <EditForm  editedTask={editedTask} updateTask={updateTask} closeEditMode = {closeEditMode}/>  
                )

              } */}
                {todayTasks && (
                  <TodayTaskList
                    todayTasks={todayTasks}
                    deleteTask={deleteTask}
                    toggleTask={toggleTask}
                    enterEditMode={enterEditMode}
                    isEditing={isEditing}
                    editedTask={editedTask}
                    updateTask={updateTask}
                    closeEditMode={closeEditMode}
                  />
                )}
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card-item three">
              <h3>Goals</h3>
              <div className="todo-goals">
                <GoalsForm addGoal={addGoal} />
                {/* {
                isEditingGoal && (
                  <EditGoalForm  editedGoal={editedGoal} updateGoal={updateGoal} closeGoalEditMode = {closeGoalEditMode}/>  
                )

              } */}
                {goals && (
                  <GoalsList
                    goals={goals}
                    deleteGoal={deleteGoal}
                    enterGoalEditMode={enterGoalEditMode}
                    isEditingGoal={isEditingGoal}
                    editedGoal={editedGoal}
                    updateGoal={updateGoal}
                    closeGoalEditMode={closeGoalEditMode}
                    toggleGoal={toggleGoal}
                  />
                )}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Cards;
