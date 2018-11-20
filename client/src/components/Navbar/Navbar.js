import React from "react";
import { PromiseProvider } from "mongoose";
// import "./Navbar.css"

const Navbar = (props) => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/global">Pic-Me</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/global">Global</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/dashboard">Dashboard</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/question">Question</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" onClick={props.logout}>Logout</a>
                </li>
            </ul>
        </div>
    </nav>
);

export default Navbar;