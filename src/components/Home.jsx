import React from 'react'
import AddNotes from './AddNotes';
import noteContext from "../context/notes/noteContext";
import { useContext , useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";



export default function Home(props) {
 
      
  const { loginWithRedirect } = useAuth0();
  const { logout, user, isAuthenticated, isLoading } = useAuth0();

  //console.log(props.type);
  const context = useContext(noteContext);
const {getNotes} = context;
const mode = context.mode ;



useEffect(() => {
  if(isAuthenticated){
    getNotes(user.email);
    


  }

  

  },[]);

  const headingStyle = {
    background: 'radial-gradient(circle, #000000, rgb(88 199 228))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'lavender',
    fontFamily:"serif" 
    
    // backgroundColor:"red"
  };
  const headingStyle2 = {
  
    color: '#033147',
    fontFamily:"serif" 
    
    // backgroundColor:"red"
  };

  return (<div className={mode==="light"?'shadow-lg p-3 mb-5  rounded':"shadow-lg p-3 mb-5 "} style={mode==='light'?{backgroundColor:"rgb(168 207 218 / 32%)",margin:"0px, 0px, 0px ,0px"}:{background:"linear-gradient(45deg, #607b758c, #37515b)",margin:"0px, 0px, 0px ,0px"}} >
 {    <h1 style={mode==="light"?headingStyle:headingStyle2} >
      Add Your Notes Here&nbsp;
      <i className="fa-solid fa-pen fa-2xs" ></i>
    </h1> }

 <AddNotes  type={props.type}/>



</div>
  )
}
