import React from "react";
// import { PromiseProvider } from "mongoose";
// import "./Navbar.css"

class Navbar extends React.Component {
    logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userId');
        window.location.href='/login';
    };

    goToLogin = () => {
        window.location.href="/login";
    };

    render() {
        return( 
            <nav className="navbar navbar-expand-sm bg-light navbar-light justify-content-center sticky-top">
                <a className="navbar-brand" href="/global">Pic-Me</a>
                    {localStorage.getItem('jwtToken') ? (
                        <ul className="navbar-nav mx-auto text-center">
                            <li className="nav-item">
                                <a className="nav-link" href="/about">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/global">Global</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/dashboard">Dashboard</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/question">Question</a>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar-nav mx-auto text-center">
                            <li className="nav-item">
                                <a className="nav-link" href="/about">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled">Global</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled">Dashboard</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled">Question</a>
                            </li>
                        </ul>
                    )
                    }
                    
                    <ul className="navbar-nav flex-row justify-content-center flex-nowrap">
                        <li className="nav-item">
                            {localStorage.getItem('jwtToken') ? (
                                <button className="btn btn-danger" onClick={this.logout}>Logout</button>
                            ) : (
                                <button className="btn btn-danger" onClick={this.goToLogin}>Login</button>
                            )}
                        </li>
                    </ul>
            </nav>
        )
    };
};

export default Navbar;