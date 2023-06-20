import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return <>
        <nav class="navbar navbar-expand-lg bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"  data-bs-target="#navbarNavAltMarkup">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link to="/" className="nav-link active" >Home</Link>
                        <Link to="/add-questions" className="nav-link" >Add questions</Link>
                        <Link to="/start-exam" className="nav-link" >Start exam</Link>
                    </div>
                </div>
            </div>
        </nav>

    </>
}

export default Navbar