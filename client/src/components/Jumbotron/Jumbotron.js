import React from "react";
import "./Jumbotron.css";

class Jumbotron extends React.Component {
    render(props) {
        return (
                <div 
                    className="jumbotron" 
                    style={{ backgroundImage: `url(${this.props.backgroundImage})` }} >

                    {this.props.children}
                </div>
        )
    }
};

export default Jumbotron;