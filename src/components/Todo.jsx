import React from 'react'

function Todo() {
  return (
    <div>Todo
        {process.env.VITE_SOME_KEY}
    </div> 
  )
}

export default Todo