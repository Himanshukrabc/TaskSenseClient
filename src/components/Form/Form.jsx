import React, { useState } from 'react'
import './Form.css'

function Form(props){

  // converts 1 digit numbers to 2 digit by adding a 0 infront
  const getNum=(val)=>{
    const vv=""+val;
    if(vv.length===1)return("0"+vv);
    return vv;
  }

  // used to convert number based time to "YYYY-MM-DDTHH:MM" format 
  // which can be used as a value for date-time local input tag
  const getFormat=(val)=>{
    if(val.length===0)return val;
    const d=new Date(val);
    const ret=`${d.getFullYear()}-${getNum(d.getMonth()+1)}-${getNum(d.getDate())}T${getNum(d.getHours())}:${getNum(d.getMinutes())}`;
    return ret;
  }

  // Each hook stores the respective data as per the name
  const [title,setTitle]=useState(props.obj.title);
  const [description,setDescription]=useState(props.obj.description);
  const [start,setStart]=useState(getFormat(props.obj.start));
  const [end,setEnd]=useState(getFormat(props.obj.end));
  const [priority,setPriority]=useState(props.obj.priority);

  // Handles submit click
  // calls the submit Handler function and passes the current value of the 
  // form fields as an object
  const onSubmit = (e)=>{
    e.preventDefault();
    const obj={
      "title":title,
      "description":description,
      "start":Date.parse(start),
      "end":Date.parse(end),
      "priority":priority,
    }
    props.submitHandler(obj);
  }

  // renders the form structure
  return (
    <form className="inp-form" onSubmit={onSubmit}>
        <div className="inp title">Title </div>
        <input type="text" className="inp-title" required value={title} onChange={(e)=>setTitle(e.target.value)}/> 
        <div className="inp description">Description </div> 
        <textarea className="inp-description" name="" id="" cols="30" rows="5" required value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
        <div className="inp start">Start Date/Time</div> 
        <input type="datetime-local" className="inp-start" required value={start} onChange={(e)=>setStart(e.target.value)}/> 
        <div className="inp end">End Date/Time</div>
        <input type="datetime-local" className="inp-end" required value={end} onChange={(e)=>setEnd(e.target.value)}/> 
        <div className="inp priority">Priority</div>
        <input type="number" className="inp-priority" min="1" max='10' required value={priority} onChange={(e)=>setPriority(e.target.value)}/>
        <br/>
        <button className="inp-submit base-btn" type='submit'>Submit Task</button>
    </form>
  )
}

export default Form