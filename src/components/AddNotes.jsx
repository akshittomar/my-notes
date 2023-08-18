import React from 'react'
import Notes from "./Notes";
import { useContext } from 'react';
import noteContext from "../context/notes/noteContext";
import { useState,useEffect,useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import Spinner from '../Bars.gif';
import { useAuth0 } from "@auth0/auth0-react";
import Nowork from './Nowork';


export default function AddNotes() {

  
  const { loginWithRedirect } = useAuth0();
  const { logout, user, isAuthenticated, isLoading } = useAuth0();
  
    const context = useContext(noteContext);
    const mode= context.mode;
    const setmode = context.setmode ;
    const [loading, setLoading] = useState(false);
    const {addNote} = context ;
    const ref = context.ref;  
    const {getNotes} = context;
    const [note2add, setnote2add] = useState({Title: "", Description: "" , Tag:"default",Hrs:0,Min:0,Sec:0});
    
    let navigate = useNavigate();
    
    const handelClick= async (e) =>{
      e.preventDefault();
      setLoading(true);
    await  addNote(note2add.Title,note2add.Description,note2add.Tag,user.email);
    
   
   if(note2add.Hrs!==0 || note2add.Min!==0 || note2add.Sec!==0){
    var s1 = note2add.Title+"sec";
    var s2 = note2add.Title+"min";
    var s3 = note2add.Title+"hrs";
   localStorage.setItem(s1,note2add.Sec.toString());
   localStorage.setItem(s2,note2add.Min.toString());
   localStorage.setItem(s3,note2add.Hrs.toString());}
      setnote2add({Title: "", Description: "" , Tag:"default",Hrs:0,Min:0,Sec:0});
   await   getNotes(user.email);

   setLoading(false);
    }
    const handelOnChange= (e) =>{
 setnote2add({...note2add, [e.target.name]:e.target.value})
    }

    


   useEffect(() => {
  
   console.log(" ues ran once    ");
  
   }, [])
   
  return (
    <div>


<form   >
  <div className="mb-3">
    <label htmlFor="Title" className="form-label" style={{fontFamily:"cursive"}}  >Subject <i className="fa-solid fa-highlighter"></i></label>
    <input type="text" className="form-control" id="Title" name="Title" style={mode==="dark"?{color:'aliceblue',background:'bottom'}:{}} onChange={handelOnChange} value={note2add.Title} minLength={5} required  />
   
  </div>
  <div className="mb-3">
    <label htmlFor="Description" className="form-label"  style={{fontFamily:"cursive"}}  >Explanation<i className="fa-solid fa-book-open"></i></label>
    <textarea type="text" className="form-control" id="Description" name="Description" style={mode==="dark"?{color:'aliceblue',background:'bottom'}:{}} value={note2add.Description} onChange={handelOnChange} minLength={5}required/>
  </div>



  <div className="mb-3">
    <label htmlFor="Tag" className="form-label"  style={{fontFamily:"cursive"}} >TAG <i className="fa-solid fa-tag"></i></label>
    <input type="text" className="form-control" id="Tag" name="Tag"  style={mode==="dark"?{color:'aliceblue',background:'bottom'}:{}}   onChange={handelOnChange} value={note2add.Tag} minLength={5} required/>
  </div>


  <div className="input-group  mb-3 position-relative" style={{minWidth:"10%",maxWidth:"20%"}} >
  <label className="input-group-text "   style={mode==="dark"?{color:'aliceblue',background:'bottom',fontFamily:"cursive"}:{fontFamily:"cursive"}} >Finish Time  </label>
  <input type="number" aria-label="Hrs" name='Hrs'value={note2add.Hrs} placeholder="hh" style={mode==="dark"?{color:'aliceblue',background:'bottom'}:{}} onChange={handelOnChange}  max="24" min="0" className="form-control "/>
  <input type="number" aria-label="Min" name='Min'value={note2add.Min} placeholder="mm" style={mode==="dark"?{color:'aliceblue',background:'bottom'}:{}} onChange={handelOnChange}  max="60" min="0" className="form-control "/>
  <input type="number" aria-label="Sec" name='Sec'value={note2add.Sec} placeholder="ss" style={mode==="dark"?{color:'aliceblue',background:'bottom'}:{}} onChange={handelOnChange} max="60" min="0" className="form-control "/>
  </div>
  
  <small ><p className='mx-6 my-6' style={{fontFamily:"monospace"}} >Enter Time In hh:mm:ss Format </p></small>
  <div className="form-check">
  <input className="form-check-input" onChange={()=>{ if(ref.current === true)ref.current = false;else ref.current=true;}}  onClick={()=>console.log(" ")} type="checkbox" value="" id="flexCheckChecked" defaultChecked/>
  <label className="form-check-label" htmlFor="flexCheckChecked">
    Remind me to read this note when timer goes zero .
  </label>
</div>
  
 
  
  



  

{!isAuthenticated && !isLoading && <button className={mode==="light"?"btn btn-outline-dark btn-sm my-3":"btn btn-outline-light btn-sm my-3"} type="submit" onClick={() => loginWithRedirect()}>Login To Add Notes <i className="fa-solid fa-arrow-right-to-bracket fa-rotate-180"></i></button>}
 {isLoading && <p  className='fa-fade' style={{fontFamily:"fantasy"}}>Loading...</p>}
  { !isLoading && isAuthenticated && <button  disabled={note2add.Title.length<5  || note2add.Description.length<5 }  type="submit" className="btn btn-primary" onClick={handelClick}>ADD NOTES <i className="fa-solid fa-briefcase"></i></button> }
  {loading===true && <><img src={Spinner} style={{width:"5%"}} alt=''></img><br/><span className='fa-fade' style={{fontFamily:"fantasy"}}>PROCESSING REQUEST.....</span></>}
</form>

{!isAuthenticated&&!isLoading&&<Nowork/>}
{isAuthenticated&&!isLoading&&<Notes></Notes>}


{ 
 
  
}


    </div>
  )
}
