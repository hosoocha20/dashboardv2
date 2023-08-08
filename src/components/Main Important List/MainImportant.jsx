import React, { useState, useEffect } from 'react'
import MainImportantForm from './MainImportantForm'
import MainImportantList from './MainImportantList'
import './MainImportant.css';
import useLocalStorage from '../../hooks/useLocalStorage';

const MainImportant = () => {
  const [mainTasks, setMainTasks] = useLocalStorage('tasks.starredTasks', []);
  const [mainTodoTasks, setMainTodoTasks] = useLocalStorage('tasks.mainTasks', []);
  const [isEditingMainTask, setIsEditingMainTask] = useState(false);

  const [ editedMainTask, setEditedMainTask] = useState(null);
  const [ previousFocusTaskEl, setPreviousFocusTaskEl] = useState(null);

  const [completedTasks, setCompletedTasks] = useLocalStorage('tasks.completedTasks', []);

  const [mainImHeight, setMainImHeight] = useState(window.innerHeight-240);

  useEffect(()=>{
    const getContainerSize = () =>{
      
      setMainImHeight(window.innerHeight-240);
      
    }
    window.addEventListener("resize", getContainerSize);
    return () => {
      window.removeEventListener('resize', getContainerSize);
    };
  },[])
  const mainImContainerStyle = {
    maxHeight: mainImHeight,
  };



   const addMainTask = (task) =>{
    if(!task.name || /^\s*$/.test(task.name)) {
      return
    }
    //Add this task into starredTasks
    setMainTasks(prevState => [...prevState, task] )
    //Also add this task into mainTasks so it is reflected in the Tasks tab
    setMainTodoTasks(prevState => [...prevState, task] )
   }

   const deleteMainTask = (taskID) =>{
    setMainTasks(prevState => prevState.filter(t=> t.id !== taskID))
    deleteMainTodoTask(taskID);
   }
   //When I check an important, this removes this task from the main main to do list array
   const deleteMainTodoTask = (taskID)=>{
    setMainTodoTasks(prevState => prevState.filter(t=> t.id !== taskID))
   }
   const updateMainTask = (task) =>{
    ///If backspace update and enter then it just deletes the goal
    if(!task.name || /^\s*$/.test(task.name)) {
      deleteMainTask(task.id);
      return
    }
    setMainTasks(prevState => prevState.map(t => (t.id === task.id ? { ...t, name: task.name} : t
      )))
    //This change is also reflected in the Tasks tab
    setMainTodoTasks(prevState => prevState.map(t => (t.id === task.id ? { ...t, name: task.name} : t
      ))) 
      ///close the edit mode
      closeMainTaskEditMode();
  }
  const toggleTask = (task) =>{
    addMainTask(task);
    setMainTasks(prevState => prevState.map(t => (t.id === task.id ? { ...t, checked: !t.checked} : t
      )))
    deleteCompletedTask(task.id);
  }

  const closeMainTaskEditMode = () =>{
    setIsEditingMainTask(false);
    previousFocusTaskEl.focus();
  }
  const enterMainTaskEditMode = (task) => {
    setEditedMainTask(task);
    setIsEditingMainTask(true);
    setPreviousFocusTaskEl(document.activeElement);
  }
  const toggleTaskStarred = (id) =>{
    setMainTasks(prevState => prevState.map(t => (t.id === id ? { ...t, starred: !t.starred} : t
      )))
    //when i unstarr something, this also reflects in the Main Todo Tab
    setMainTodoTasks(prevState => prevState.map(t => (t.id === id ? { ...t, starred: !t.starred} : t
      )))
      //and remove this item from starred array
      setMainTasks(prevState => prevState.filter(t=> t.id !== id))
  }

    //COMPLETED TASKS FUNCTIONS
  const addCompletedTask = (task) =>{
    setCompletedTasks(prevState => [...prevState, task] )
    //toggle checked for completed tasks
    setCompletedTasks(prevState => prevState.map(t => (t.id === task.id ? { ...t, checked: !t.checked} : t
      )))
    toggleCompletedTask(task.id);
    deleteMainTodoTask(task.id);
   }

   const deleteCompletedTask = (taskID) =>{
    setCompletedTasks(prevState => prevState.filter(t=> t.id !== taskID))
   } 
   const toggleCompletedTask = (task) =>{
    //Toggle checked in starredTask
    const timeoutId = setTimeout(function(){
      setMainTasks(prevState => prevState.map(t => (t.id === task.id ? { ...t, checked: !t.checked} : t
        )))
  }, 150);
  


    
  }

  const toggleCompletedTaskStarred = (id) =>{
    setCompletedTasks(prevState => prevState.map(t => (t.id === id ? { ...t, starred: !t.starred} : t
      )))
  }

  //Find number of tasks still active
  const count = mainTasks.filter(t => {
    if (!t.checked)
      return true
    return false
  }).length

  return (
    <div className="importantTodo">
      <div>
        <div className="importantTaskHeading">
          <h2>Important</h2>
          <div className="importantTaskCount">
            {count}
          </div>
        </div>
        {mainTasks && (
          <MainImportantList mainTasks={mainTasks} deleteMainTask={deleteMainTask} enterMainTaskEditMode={enterMainTaskEditMode} toggleTaskStarred={toggleTaskStarred} toggleCompletedTask={toggleCompletedTask} 
          isEditingMainTask={isEditingMainTask} editedMainTask={editedMainTask} updateMainTask={updateMainTask} closeMainTaskEditMode={closeMainTaskEditMode} addCompletedTask={addCompletedTask} mainImContainerStyle={mainImContainerStyle}/>
        )}
      </div>
      <div className="form-container">
        <MainImportantForm addMainTask={addMainTask}/>
      </div>
      
    </div>
  )
}

export default MainImportant