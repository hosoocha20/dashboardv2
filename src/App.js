
import { useState } from 'react';
import './App.css';
import MainDash from './components/MainDash';
import MainTodo from './components/Main Todo List/MainTodo';
import Sidebar from './components/Sidebar';
import MainImportant from './components/Main Important List/MainImportant';
import Notes from './components/Notes/Notes';

function App() {
   const [activeTab, setActiveTab] = useState(0);


   const handleActiveTabChange = (index) =>{
    setActiveTab(index);
    //console.log(activeTab);
   }


  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar handleActiveTabChange = {handleActiveTabChange}/>
        <div className="vert-centre-main-contents">
          {activeTab === 0 ? <MainDash/> :'' }
          {activeTab === 1 ? <MainImportant/> :'' }
          {activeTab === 2 ? <MainTodo/> :'' }
          {activeTab === 3 ? <Notes /> :'' }
        </div>

        
        
      </div>
    </div>
  );
}

export default App;
