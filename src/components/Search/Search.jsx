import React from 'react'
import './Search.css'
import { axiosInstance } from '../../config'
import { useRef } from 'react';
import { useState } from 'react';
import Table from '../Table/Table';


function Search({showTile}){
  // This component searched for values in the titel and description
  // val - stores the value searched for 
  // show - wether to display Table component or not
  // res - to store search results
  const val=useRef();
  const [show,setShow]=useState(false);
  const [res,setRes]=useState([]);

  // Used to get search results for val in title and description fiends.
  // search is case-insensitive
  const getSearch=async()=>{
    setShow(true);
    console.log(val.value);
    try{
      let tasks=await axiosInstance.get(`/tasks/search/${val.current.value}`);
      setRes(tasks.data);
      console.log(res); 
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <>
        <input type="text" className="search" required ref={val}/> 
        <button className='base-btn' onClick={getSearch}>Search</button>
        <br/>
        {
            show?<Table res={res} showTile={showTile} func={getSearch}/>:<span></span>
        }
    </>
  )
}

export default Search