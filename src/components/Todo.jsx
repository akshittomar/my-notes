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
import Spinner from '../Bars.gif'
import { useAuth0 } from "@auth0/auth0-react";
import Home from './Home';
function Todo() {
  const { logout, user, isAuthenticated, isLoading } = useAuth0();
  const someKey = import.meta.env.VITE_SOME_KEY;
  const someKe = import.meta.env.HH;

  return (
    <>
         {isLoading && <><img src={Spinner} className='my-5 mx-5 bg-transparent' style={{width:"20%"}} alt='LOADING...'></img></>}
     { isAuthenticated && !isLoading && <div> Todo
      {someKey}
      {someKe} <hr/>
      <Home/>
       </div> }
    </>
  );
}

export default Todo;
