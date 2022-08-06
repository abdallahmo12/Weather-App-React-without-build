import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import WOW from 'wowjs';
import {useNavigate} from "react-router-dom";

function Navbar({user, setUser}) {

    const navigate =useNavigate();
    
    useEffect(() => {
      new WOW.WOW().init();
      console.log(user);
    }, [])

    function clearUser(){
        localStorage.removeItem("tkn");
        setUser(null);
        navigate('/signin');
    }

    
  return <>
    <nav className="navbar navbar-expand-lg bg-nav">
        <div className="container-fluid">
            <Link className="navbar-brand wow animate__jello fw-bold fs-3 text-color-1" data-wow-duration="2s" data-wow-iteration="10"  to="/">
                Weather App
                <i className="fa-solid fa-bolt ps-1"></i>
                <i className="fa-solid fa-tornado"></i>
            </Link>
            <button className="navbar-toggler btn btn-outline-muted text-white border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon text-white"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className=" navv-item wow animate__backInRight text-white-50 nav-link active" data-wow-duration="1s" aria-current="page" to="home">Home</Link>
                    </li>
                    {user ? <>
                        <li className="nav-item">
                            <Link className=" navv-item wow animate__backInRight text-white-50 nav-link" data-wow-duration="1s" to="search">Search By City</Link>
                        </li>
                        <li>
                            <span className=" navv-item wow animate__backInRight text-white-50 nav-link" data-wow-duration="1s"><i className="fa-solid fa-user me-1"></i> Hello , {user.first_name}</span>
                        </li>
                        <li className="nav-item">
                            <span role="button" onClick={clearUser} className="navv-item wow animate__backInRight  text-white-50 nav-link" data-wow-duration="1s" >Sign Out</span>
                        </li>
                    </> :<>
                        <li className="nav-item">
                            <Link className="navv-item wow animate__backInRight  text-white-50 nav-link" data-wow-duration="1s" to="signin">Sign in</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="navv-item wow animate__backInRight  text-white-50 nav-link" data-wow-duration="1s" to="signup">Sign up</Link>
                        </li>
                    </>}
                </ul>
            </div>
        </div>
    </nav>
  </>
}

export default Navbar