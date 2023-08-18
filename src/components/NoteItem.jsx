import React, { useEffect ,useContext} from 'react'
import Alarm from './Alarm';
import image from '../download5.png'
import { useAuth0 } from "@auth0/auth0-react";
import noteContext from "../context/notes/noteContext";
export default function NoteItem(props) {

    const { loginWithRedirect } = useAuth0();
    const { logout, user, isAuthenticated, isLoading } = useAuth0();
    const note = props.notes;
    const deleteNote = props.deleteNote;
    const updateNote = props.updateNotes;
    const context = useContext(noteContext);
    const mode = context.mode;

    useEffect(() => {



    }, [note])


    function formatDate(dateTimeString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateTimeString);

        const formattedDate = date.toLocaleDateString(undefined, options);
        const formattedTime = date.toLocaleTimeString();

        return `${formattedDate} ${formattedTime}`;
    }



    return (

        <div className="col-md-3 mx-2 card-deck  "    >

            <div className={mode==="dark"?"card bg-secondary ":"card"} style={{ maxWidth: "50vp" }}>
                <div className="card-header" style={mode==="dark"?{ fontSize: "72%", fontFamily: "cursive",color:"white" }:{ fontSize: "72%", fontFamily: "cursive",color:"" }}>

                    <i className="fa-solid fa-calendar-days fa-lg"></i>&nbsp;&nbsp;{formatDate(note.date)}

                </div>
                <img className="card-img-top mx-5" src={image} style={{ width: "70%" }} alt="Card image cap"></img>
                <div className="card-body   " style={mode==="dark"?{color:"white"}:{}}>

                    <div className='d-flex  '>

                        <div className="card-title container overflow-auto" style={{ height: "7vh" }}  >
                            <u><>Subject&nbsp;</></u>
                            <i className=" fa-book-open fa-xs fa-solid"></i>
                            <br />{note.title}</div>

                    </div>
                    <hr  />
                    <div>
                        <p style={{ height: "15vh" }} className="card-text container overflow-auto" >
                            <u><>Notes&nbsp;</></u>
                            <i className="fa-solid fa-book fa-sm"></i>
                            <br /><div  >{note.description}</div></p>


                    </div>


                    <br  />



                    <div className=" card-footer d-flex  " style={{ maxWidth: "" }} >

                        <div className="dropdown">
                            <button className={mode==="dark"?"btn btn-outline-light dropdown-toggle":"btn btn-outline-dark dropdown-toggle"} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Options&nbsp;<i className="fa-solid fa-screwdriver-wrench fa-sm"></i>
                            </button>
                            <ul className={mode==="dark"?"dropdown-menu bg-dark-subtle":"dropdown-menu "}>
                                <li><div className="dropdown-item " > <div style={{ color: "black", cursor: "pointer", fontSize: '70%', fontFamily: 'serif' }} onClick={() => {
                                var s1 = note.title + "sec";
                                var s2 = note.title + "min";
                                var s3 = note.title + "hrs"; localStorage.removeItem(s1);
                                localStorage.removeItem(s2);
                                localStorage.removeItem(s3); deleteNote(note._id, user.email)
                            }} ><i className="fa-solid fa-trash    " ></i> DELETE</div></div></li>
                                {/* <li><div className="dropdown-item" ></div></li> */}
                                <li><div className="dropdown-item"> <div style={{ color: "black", cursor: "pointer", fontSize: "70%", fontFamily: 'serif' }} onClick={() => { updateNote(note); }}  ><i className="fa-solid fa-file-pen sm  " onClick={() => { updateNote(note) }}></i> UPDATE</div></div></li>
                            </ul>
                        </div>

                        <div className=''> <Alarm key={note._id} notes={note} show="true" /></div>

                        {/* <div className='container'>
                            <div style={{ color: "black", cursor: "pointer", fontSize: '70%', fontFamily: 'serif' }} onClick={() => {
                                var s1 = note.title + "sec";
                                var s2 = note.title + "min";
                                var s3 = note.title + "hrs"; localStorage.removeItem(s1);
                                localStorage.removeItem(s2);
                                localStorage.removeItem(s3); deleteNote(note._id, user.email)
                            }} ><i className="fa-solid fa-trash    " ></i>DELETE</div>
                        </div> */}


                        {/* <div className='container'>
                            <button type="button" className="read_more_btn btn btn-sm mx-5">   <Alarm key={note._id} notes={note} show="true" /></button>
                        </div> */}


                        {/* <div className=" container">
                            <div style={{ color: "black", cursor: "pointer", fontSize: "70%", fontFamily: 'serif' }} onClick={() => { updateNote(note); }}  ><i className="fa-solid fa-file-pen sm  " onClick={() => { updateNote(note) }}></i>UPDATE</div>
                        </div> */}
                    </div>

                </div>
            </div>

        </div>
    )
}

