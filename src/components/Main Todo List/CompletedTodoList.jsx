import React, { useState } from 'react'
import CompletedTaskItem from './CompletedTaskItem'
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';

const CompletedTodoList = ( {completedTasks, deleteCompletedTask, toggleTask, toggleCompletedTaskStarred, addStarredTask, removeStarredTask, toggleCompletedStarredTask}) => {
  const [openCompList, setOpenCompList] = useState(true);

  const handleOpenCompListClick = () =>{
    setOpenCompList(!openCompList);
  }
  
  return (
    <div className="completedTodoList-container">
        <button className="completedHeading" onClick={handleOpenCompListClick}>
        {openCompList ? <MdKeyboardArrowDown size={'20px'} /> : <MdKeyboardArrowRight size={'20px'} />}
          <h2>Completed </h2>
          <div className="completedCount">
            {completedTasks.length}
          </div>
        </button>
        {openCompList && <ul className="completedTodoList">
          {completedTasks.sort((a,b)=>b.starred-a.starred || b.id-a.id).map(t=>(
                (
                  <CompletedTaskItem key={t.id} completedTask={t} deleteCompletedTask={deleteCompletedTask} toggleTask={toggleTask} toggleCompletedTaskStarred={toggleCompletedTaskStarred}
                  addStarredTask={addStarredTask} removeStarredTask={removeStarredTask} toggleCompletedStarredTask={toggleCompletedStarredTask}
                  /> )
            ))}
        </ul>
        }   
    </div>
  )
}

export default CompletedTodoList