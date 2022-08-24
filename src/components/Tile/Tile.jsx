import React from 'react';
import './Tile.css'
import Delete from '@mui/icons-material/Delete';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Done from '@mui/icons-material/Done';
import Edit from '@mui/icons-material/Edit';
import { axiosInstance } from '../../config';

function Tile({task,func,getEdit}){ 
  // Used to call a DELETE request to delete the currently opened task
  const deleteTask = async(id)=>{
    try{
      await axiosInstance.delete(`/tasks/get/${id}`);
      func();
    }
    catch(err){
      console.log(err);
    }
  }

  // Used to call a PUT request to change the status of currently opened task
  const actionTask = async(id,status)=>{
    try{
      await axiosInstance.put(`/tasks/get/${id}`,{status:!status});
      func();
    }
    catch(err){
      console.log(err);
    }
  }

  // Used to call a GET request to edit the currently opened task and render the form component
  const editTask = async(id,status)=>{
    try{
      const obj=await axiosInstance.get(`/tasks/get/${id}`);
      getEdit(obj.data);
    }
    catch(err){
      console.log(err);
    }
  }
  
  return (
    <>
      <div className='title'><span className='name'>{task.title}</span></div>
      <div className='description'>{task.description}</div>
      <div className='start'>Start Date : {new Date(task.start).toLocaleString()}</div>
      <div className='end'>End Date : {new Date(task.end).toLocaleString()}</div>
      <div className='status'>Status : {task.status?"Completed":"Pending"}</div>
      <div className="actions">
        <button className="edit" onClick={()=>{editTask(task._id)}}><Edit/></button>
        <button className="delete" onClick={()=>{deleteTask(task._id)}}><Delete/></button>
        <button className="move" onClick={()=>{actionTask(task._id,task.status)}}>{task.status?<ArrowForward/>:<Done/>}</button>
      </div>
    </>
  )
}

export default Tile;