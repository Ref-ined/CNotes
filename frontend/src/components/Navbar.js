import React from 'react'
import {
  Link, useNavigate,
} from "react-router-dom";



const Navbar = () => {

  let navigate=useNavigate();
  const handleLogOut=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">CNotes</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/about">About</Link>
            </li>

          </ul>
          {!localStorage.getItem('token')?<form className="d-flex">
          <Link className="btn btn-primary " to="/login" role="button">LogIn</Link>w
          <Link className="btn btn-primary " to="signup" role="button">SignUp</Link>
          </form>: <button onClick={handleLogOut} className="btn btn-primary">Log Out</button>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar