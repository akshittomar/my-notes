import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
function Navbar() {
  const { loginWithRedirect } = useAuth0();
  const { logout, user, isAuthenticated, isLoading } = useAuth0();
  return (
    <>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/">Action</a></li>
                  <li><a className="dropdown-item" href="/">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="/">Something else here</a></li>
                </ul>
              </li>


              <li className="nav-item"> {isAuthenticated && 
                <p className="nav-link active" aria-current="page" href="/"><i class="fa-regular fa-circle-user"></i> : {user.name}</p>
              }</li>
            </ul>

            <div className='my-2'>
              {!isAuthenticated && <button class="btn btn-outline-success" type="submit" onClick={() => loginWithRedirect()}>Login</button>}
              {isAuthenticated && <button class="btn btn-outline-success mx-2" onClick={() => { logout({ logoutParams: { returnTo: window.location.origin } }) }} type="submit">Logout</button>}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar