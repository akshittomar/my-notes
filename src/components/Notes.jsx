import React ,{useEffect}from 'react';
import Spinner from '../Bars.gif';
import { useContext } from 'react';
import noteContext from "../context/notes/noteContext";
import { useAuth0 } from "@auth0/auth0-react";
import NoteItem from './NoteItem';


import MyNoteItem from './MyNoteItem';
// import AddNotes from './AddNotes';
// import {useNavigate} from 'react-router-dom';
import Nowork from './Nowork';

import { useRef , useState } from 'react';




export default function Notes() {
  const { loginWithRedirect } = useAuth0();
  const { logout, user, isAuthenticated, isLoading } = useAuth0();

const [load, setload] = useState(true)


  
  // let navigate = useNavigate();
  const ref = useRef(null);
  const refClose = useRef(null);
  const context = useContext(noteContext);//bhai curly brackets use krega to exact cheez  load hogi context api mai se nhi to phir koi xyz variabel bna kr usme se dot . ka use krke niklega  
const mode = context.mode ;
  const notes = context.notes;//bhai function import hua hai yeh kuch extra nhi likhna padta function k liye mtlb parantheses vgra nhi hai idhar par 

  const {editNote} = context;
  // const setnotes = context.setnotes;
  const {getNotes} = context;
  const {deleteNote} = context;
  // const [title, settitle] = useState({tit:""});
  const [note, setnote] = useState({id:"",eTitle: "your title here", eDescription: "your description here " , eTag:"default"});
  const [dummy, setdummy] = useState({Title: ""});
  // useEffect(() => {
  //   if(localStorage.getItem('token')){
  //   getNotes();}
  //   else{
  //     navigate("/login");

  //   }
  //  },[]);

// useEffect(() => {
//   getNotes();
//   console.log("am i infinite");
// }, [notes])

useEffect(() => {
  
  const fetchData = async () => {
    
    await getNotes(user.email);
    setload(false);
  };

  fetchData();

}, [note]);

useEffect(() => {
  //console.log("am i infinite");
  getNotes(user.email);
}, [load]);

  const updateNotes =  (currentNotes) => {// responsibel to update id & eTitle & eDescription iske parameters mai jo currentNotes mille hai voh context API se aa rhe hai Notesitem ne call kiya h is function ko aur "notes" as props bheje gye the Notes.js k dware 
    //console.log(currentNotes);
    // setnote({id:currentNotes._id, eTitle:currentNotes.title,eDescription:currentNotes.description, etag:currentNotes.tag});
    
    // setnote({...note, [note.name]:note.value})
    setdummy({Title:currentNotes.title});
    setnote({id:currentNotes._id,eTitle:currentNotes.title,eDescription:currentNotes.description,eTag:currentNotes.tag});    
    // settitle({tit:currentNotes.title})   ;
    // console.log("UPDATING TITLE "+title.tit)
    // setnote(currentNotes);99
    //console.log("AFTER SETNOTE");
    //console.log(note);
    ref.current.click();
  }




  const handelClick= async (e) =>{
    e.preventDefault(); 
    // setnote(note._id,note.eTitle,note.eDescription,note.eTag);
    // setnote({...note, [e.target.name]:e.target.value})
    // setnote({...note, [note.name]:note.value})
    var s1 = dummy.Title+"sec";
    var s2 = dummy.Title+"min";
    var s3 = dummy.Title+"hrs";
    localStorage.removeItem(s1);
    localStorage.removeItem(s2);
    localStorage.removeItem(s3);
    editNote(note.id, note.eTitle, note.eDescription, note.eTag,user.email)
    localStorage.removeItem(s1);
    // setnote(note._id,note.eTitle,note.eDescription,note.eTag);
    // setnote({...note, [e.target.name]:e.target.value})
    // setnote({...note, [note.name]:note.value})
    localStorage.removeItem(s1);
    refClose.current.click();
    setload(true);
     await getNotes(user.email)
     setload(false);
     
  }
  const handelOnChange= (e) =>{
setnote({...note, [e.target.name]:e.target.value})

  }

  return (
    <div className='' >

{/* //MERE BHAI ERROR YEH HAI KI YEH UPDATE MODAL TOH BHAI EK NOTE COMPONENT SE CHL RHA HAI IT IS NOT CONNECTED TO "NOTES"---> I.E. NOTES COMPONENT OF DATABASE  */}








      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className={mode==="dark"?"modal-dialog bg-dark":"modal-dialog"}>
          <div className={mode==="dark"?"modal-content bg-dark":"modal-content"}>
            <div className="modal-header" style={mode==="dark"?{color:"white"}:{}}>
              <h1 className="modal-title fs-5 " id="exampleModalLabel">EDIT NOTES</h1>
              <button type="button" className={mode==="dark"?"btn-close bg-light ":"btn-close"} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={mode==="dark"?{color:"white"}:{}}>




              <form   onSubmit={e => e.preventDefault()} >
                <div className="mb-3">
                  
                  <label htmlFor="eTitle" className="form-label"  >Title</label>
                 <input type="text" className={mode==="dark"?"form-control bg-dark":"form-control"} id="eTitle" style={mode==="dark"?{color:"white"}:{}} name="eTitle" onChange={handelOnChange} value={note.eTitle}  minLength={5} required />

                  </div> 
                <div className="mb-3">
                  <label htmlFor="eDescription" className="form-label"  >Description</label>
                  <input type="text" className={mode==="dark"?"form-control bg-dark":"form-control"}  style={mode==="dark"?{color:"white"}:{}}  id="eDescription" name="eDescription" onChange={handelOnChange} value={note.eDescription} minLength={5} required />
                </div>



                <div className="mb-3">
                  <label htmlFor="eTag" className="form-label"  >TAG</label>
                  <input type="text" className={mode==="dark"?"form-control bg-dark":"form-control"} style={mode==="dark"?{color:"white"}:{}}  id="eTag" name="eTag" onChange={handelOnChange} value={note.eTag} minLength={5} required />
                </div>
                {/* <div className="mb-3">
                  
                  <label htmlFor="Title" className="form-label"  >Title</label>
                 <input type="text" className="form-control"  onChange={handelOnChange} value={title.tit}  minLength={5} required />

                  </div>  */}
               
              </form>





            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className={mode==="dark"?"btn btn-outline-light":"btn btn-outline-dark"} data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" 
              
            
              onClick={ handelClick} disabled={note.eTitle.length<5 || note.eDescription.length<5}>UPDATE NOTES </button>
            </div>
          </div>
        </div>
      </div>






 
{/* 
      <div className="row" >  
        
        {notes.length===0  && `NO PENDING WORK ` }
        { notes.length!==0  && 
         notes.map((notes) => {
          return <NoteItem key={notes._id} cloured="true" notes={notes} updateNotes={updateNotes} deleteNote={deleteNote} option="true" />;
        })
        }
      </div>  */}


      
        
        {/* {notes.length===0  && `NO PENDING WORK ` } */}
        {load===true && <><img src={Spinner} className='my-5 mx-5 bg-transparent' style={{width:"20%"}} alt='LOADING...'></img></>}
        {notes.length===0  && load===false && <Nowork/> }

        <div className="row my-5" >  
        { notes.length!==0  && load===false &&
         notes.map((notes) => {
          return <>
            <NoteItem key={notes._id}  notes={notes} updateNotes={updateNotes} deleteNote={deleteNote}  />
            </>;
        })
        }



      </div> 

      {/* <NotesUpdate  notes={notes} updateNotes={updateNotes} deleteNote={deleteNote} option="true" /> */}
      
    </div>
  )
}
