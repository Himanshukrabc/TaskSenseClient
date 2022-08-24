import React from 'react'
import './Table.css'
import Delete from '@mui/icons-material/Delete' 
import Done from '@mui/icons-material/Done';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { axiosInstance } from '../../config';

function Table({func,res,showTile}){
  // Used to call a DELETE request to delete the current task
  // func calls different function based on status of task
  const deleteTask = async(id)=>{
    try{
      await axiosInstance.delete(`/tasks/get/${id}`);
      func();
    }
    catch(err){
      console.log(err);
    }
  }

  // Used to call a PUT request to update the status current task
  // func calls different function based on status of task
  const actionTask = async(id,status)=>{
    try{
      await axiosInstance.put(`/tasks/get/${id}`,{status:!status});
      func();
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <>
      <div className="table-container">
        <ul className="table">
          <li className="table-header">
            <div className="col col-1">S.No.</div>
            <div className="col col-2">Title</div>
            <div className="col col-3">Priority</div>
            <div className="col col-4">End Date</div>
            <div className="col col-5">Status</div>
            <div className="col col-6">Actions</div>
          </li>
          {res.map((val,ind)=>{
          return(<li key={ind} className="table-row">
            <div className="col col-1" data-label="S.No.">{ind+1}</div>
            <div className="col col-2" data-label="Title"  onClick={()=>{showTile(val._id)}}>{val.title}</div>
            <div className="col col-3" data-label="Priority">{val.priority}</div>
            <div className="col col-4" data-label="End Date">{new Date(val.end).toLocaleString()}</div>
            <div className="col col-5" data-label="Status">{val.status?"Completed":"Pending"}</div>
            <div className="col col-6" data-label="Actions">
              <button className="delete" onClick={()=>{deleteTask(val._id)}}><Delete/></button>
              <button className="move" onClick={()=>{actionTask(val._id,val.status)}}>{val.status?<ArrowForward/>:<Done/>}</button>
            </div>
          </li>);
        })}
        </ul>
        <small >*Click on tittles of tasks to open them</small>
      </div>
    </>
  )
}

export default Table