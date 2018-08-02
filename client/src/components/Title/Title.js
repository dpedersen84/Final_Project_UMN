import React from "react";
import "./Title.css";

const Title = (props) => (
    <nav className="navbar nav">
        <div className="container row">
            <div className="text-left col-8">
                <h1 id="title" >PicMe</h1>
            </div>
            <div className="text-right col-4">
                <button className="text-right btn btn-lg btn-link" >
                    <img className="rounded-circle" id="profile-pic-icon" src={props.src} alt="img"></img>
                </button>
            </div>
        </div>
    </nav>
);

export default Title;