import React from "react";
import "./Navbar.css"

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-dark" style = {{ backgroundColor: 'orange' }}>
                <a className="navbar-brand" href="#"> | Pic-Me |</a>

                {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li> 
                    </ul>
                </div>  */}
            </nav>
        )
    }
};

export default Navbar;