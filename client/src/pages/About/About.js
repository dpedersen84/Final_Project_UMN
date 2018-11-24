import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    };
    
    render() {
        return (
            <div>
                <Jumbotron
                    backgroundImage="https://i.imgur.com/atMSQTA.jpg"
                />
                <div className="container">
                    <div className="row">
                    </div>
                </div>
            </div>
        )
    };
};

export default About;