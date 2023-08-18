import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import { useEffect,useContext } from 'react';
import noteContext from "../context/notes/noteContext";


function Navbar() {
  const { loginWithRedirect } = useAuth0();
  const { logout, user, isAuthenticated, isLoading } = useAuth0();
  const context = useContext(noteContext);
  const mode = context.mode;
  const setmode = context.setmode;


  

  return (
    <>

      <nav className={mode==="light"?"navbar navbar-expand-lg bg-body-tertiary":"navbar navbar-expand-lg bg-dark"}>
        <div className="container-fluid">
          <Link className='navbar-brand my-1 mx-0 active'  to='/' style={mode==="light"?{color:"black"}:{color:"white"}}><h5 >MY-NOTES <i className="fa-sharp fa-solid fa-book fa-lg"></i></h5></Link>

          <button className={mode==="light"?"navbar-toggler":"navbar-toggler bg-light"} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

            <span className="navbar-toggler-icon"></span>

          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"> 
                {/* <p className={isLoading?"nav-item active fa-fade":"nav-item active my-1 mx-3"} aria-current="page" href="/"> : {isAuthenticated && !isLoading &&user.name}</p> */}
              </li>
            </ul>

                <div className='my-2'>
             
                <button className={mode==="light"?"btn btn-outline-dark btn-sm mx-2":"btn btn-outline-light btn-sm mx-2"} type="submit" onClick={(e) => {e.preventDefault();mode==="light"?setmode("dark"):setmode("light")}}>{mode==="light"?<>DAY <i className="fa-regular fa-sm fa-sun"></i></>:<>NIGHT <i className="fa-regular fa-sm fa-moon"></i></>}</button>
                <a style={{color:""}} className={mode==="light"?"btn btn-outline-dark btn-sm mx-2":"btn btn-outline-light btn-sm mx-2"}  href='https://www.linkedin.com/in/akshit-tomar-7b6a77220/' role='button'>Contact Us <i className="fa-solid  fa-sm fa-arrow-up-right-from-square"></i></a>
                  {!isAuthenticated && !isLoading && <button className={mode==="light"?"btn btn-outline-dark btn-sm mx-2":"btn btn-outline-light btn-sm mx-2"} type="submit" onClick={() => loginWithRedirect()}>Login <i className="fa-solid fa-arrow-right-to-bracket fa-rotate-180"></i></button>}
                  {isAuthenticated && !isLoading && <button className={mode==="light"?"btn btn-outline-dark btn-sm mx-2":"btn btn-outline-light btn-sm mx-2"} onClick={() => { logout({ logoutParams: { returnTo: window.location.origin } }) }} type="submit">Logout <i className="fa-solid fa-sm fa-right-from-bracket"></i></button>}
                  {
                    isAuthenticated && !isLoading && <button className={mode==="light"?"btn btn-outline-dark btn-sm mx-2":"btn btn-outline-light btn-sm mx-2"} onClick={(e) => {e.preventDefault(); }} >{<><i className={isAuthenticated&&"fa-regular fa-circle-user"}></i> {user.name}</>}</button>
                  }
                  {isLoading && <button style={{fontFamily:"cursive"}} className={mode==="light"?"btn btn-outline-dark btn-sm mx-2":"btn btn-outline-light btn-sm mx-2"} >Loading...</button>}

                </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar