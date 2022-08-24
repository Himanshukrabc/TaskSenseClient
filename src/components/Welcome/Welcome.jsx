import React from 'react'
import './Welcome.css'

// It is a basic welcome page.
function Welcome() {
  return (
    <>
    <div className='welcome-div'>Welcome to <span className='name'>TaskSense,</span></div>
    <div className='welcome-div'>one-stop solution for all your scheduling needs...</div>
    </>
  )
}

export default Welcome