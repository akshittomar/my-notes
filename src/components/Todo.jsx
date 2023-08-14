// import React from 'react'

// function Todo() {
//   return (
//     <div>Todo
//         {import.meta.env.VITE_SOME_KEY}
//     </div> 
//   )
// }

// export default Todo
import React from 'react';

function Todo() {
  const someKey = import.meta.env.VITE_SOME_KEY;

  return (
    <div>
      Todo
      {someKey}
    </div>
  );
}

export default Todo;
