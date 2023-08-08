import React, { useState } from 'react'
import MainTaskItem from './MainTaskItem'
import MainEditForm from './MainEditForm'
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';

const MainTodoList = ({mainTasks, deleteMainTask, enterMainTaskEditMode, isEditingMainTask, editedMainTask, updateMainTask, closeMainTaskEditMode, addCompletedTask, toggleTaskStarred,addStarredTask, removeStarredTask, toggleCompletedStarredTask, mainTodoHeight}) => {
  const [openTaskList, setOpenTaskList] = useState(true);

  const handleOpenTaskListClick = () =>{
    setOpenTaskList(!openTaskList);
  }
  return (
    <div className="mainTodoList-container">
        <button className="taskHeading" onClick={handleOpenTaskListClick}>
          {openTaskList ? <MdKeyboardArrowDown size={'20px'} /> : <MdKeyboardArrowRight size={'20px'} />}
          <h2>Tasks</h2>
          <div className="taskCount">
            {mainTasks.length}
          </div>
        </button>
        {openTaskList && <ul className="mainTodoList">
          {mainTasks.sort((a,b)=>b.starred-a.starred || b.id-a.id).map(t=>((isEditingMainTask === true) &&(editedMainTask.id === t.id) ?              
                  (
                  isEditingMainTask && (
                    <MainEditForm   key={t.id} editedMainTask={editedMainTask} updateMainTask={updateMainTask} closeMainTaskEditMode = {closeMainTaskEditMode} />  
                  )
    
                ) : 
                (
                  <MainTaskItem key={t.id} mainTask={t} deleteMainTask={deleteMainTask} enterMainTaskEditMode = {enterMainTaskEditMode} addCompletedTask={addCompletedTask} toggleTaskStarred={toggleTaskStarred}
                  addStarredTask={addStarredTask}  removeStarredTask={removeStarredTask} toggleCompletedStarredTask ={toggleCompletedStarredTask}
                  /> )
            ))}
        </ul>
      }
    </div>
  )
}

export default MainTodoList