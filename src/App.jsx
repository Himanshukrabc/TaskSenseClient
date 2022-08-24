import { useState } from 'react';
import './App.css';
import { axiosInstance } from './config';
import Table from './components/Table/Table';
import Tile from './components/Tile/Tile';
import Form from './components/Form/Form';
import Welcome from './components/Welcome/Welcome';
import Search from './components/Search/Search';

function App() {
  // show   -  has 5 states.App displays different components based on the value
  //           0-Welcome component, 1-Table of Pending Tasks, 2-Table of Completed Tasks, 3-Tile of a task
  //           4-Form for task entry  5-shows a searrch for task
  // res    -  stores an array of results we get for pending and completed task requests
  // obj    -  stores the object that is currently being edited
  // task   -  stores the task being displayed.
  // isEdit -  is used to make different request(POST or PUT) based on its value in submitHandler function
  const [show,setShow]=useState(0);
  const [res,setRes]=useState([]);
  const [obj,setObj]=useState({"title":"","description":"","start":"","end":"","priority":1});
  const [task,setTask]=useState({});
  const[isEdit,setIsEdit]=useState(false);

  // It is used for handling the form submission
  const submitHandler = async(robj)=>{
    try{
      // if form is submitted via edit option PUT request is made else POST request is made 
      if(!isEdit) await axiosInstance.post('/tasks/create',robj);
      else await axiosInstance.put(`/tasks/get/${obj._id}`,robj);
      // this line clears up the form whenever any button is clicked on the form
      setObj({"title":"","description":"","start":"","end":"","priority":1});
      // renders the welcome component
      setShow(0);
    }
    catch(err){
      console.log(err);
    }
  }
  
  // Used to get Pending tasks from the backend and store it in the "res" hook
  const getPending=async()=>{
    setShow(1);
    try{
      let tasks=await axiosInstance.get('/tasks/pending');
      setRes(tasks.data);
      // this line clears up the form whenever "Show Pending" button is clicked on the form
      setObj({"title":"","description":"","start":"","end":"","priority":1});
    }
    catch(err){
      console.log(err);
    }
  }
  
  // Used to get Completed tasks from the backend and store it in the "res" hook
  const getCompleted=async()=>{
    setShow(2);
    try{
      let tasks=await axiosInstance.get('/tasks/completed');
      setRes(tasks.data);
      // this line clears up the form whenever "Show Completed" button is clicked on the form
      setObj({"title":"","description":"","start":"","end":"","priority":1});
    }
    catch(err){
      console.log(err);
    }
  }
  
  // It gets the object of the task to be edited.
  const getEdit=(robj)=>{
    // Form component rendered
    setShow(4);
    // so rhat on submitting the form PUT request is made.
    setIsEdit(true);
    try{
      setObj(robj);
    }
    catch(err){
      console.log(err);
    }
  }

  // Used to fetch and render the Tile component
  const showTile=async(id)=>{
    setShow(3);
    try{
      const obj=await axiosInstance.get(`tasks/get/${id}`);
      setTask(obj.data);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <div className="container">
        {
          (show===0)?<Welcome/>:
          (show===1)?<Table res={res} showTile={showTile} func={getPending}/>:
          (show===2)?<Table res={res} showTile={showTile} func={getCompleted}/>:
          (show===3)?<Tile task={task} func={task.status?getCompleted:getPending} getEdit={getEdit}/>:
          (show===4)?<Form submitHandler={submitHandler} obj={obj} edit={isEdit}/>:
          <Search showTile={showTile}/>
        }
        {(show===4)?<></>:<button className="base-btn" onClick={()=>{setShow(4);setIsEdit(false);}}>Add a Task</button>}
        <button className='base-btn' onClick={getPending}>Show Pending</button>
        <button className='base-btn' onClick={getCompleted}>Show Completed</button>
        {(show===5)?<></>:<button className='base-btn' onClick={()=>{setShow(5);setObj({"title":"","description":"","start":"","end":"","priority":1});}}>Search Task</button>}
      </div>
    </>
  );
}

export default App;
