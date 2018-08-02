import React from "react";
import "./Nav.css";
import Title from "../Title";
import axios from "axios";

class Nav extends React.Component {

    state = {
        user: [],
        profilePic: '',
        image: "https://ucarecdn.com/eda32654-f96e-4081-86b6-11cf46d8d05f/-/crop/1735x1738/1,0/-/preview/"
    
    }
    
    componentDidMount = () => {
        this.getUsers();
    };
    
    getUsers= () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get(`/api/photo/users/${localStorage.getItem('userId')}`)
        .then(res => {
            const user = res.data;
            this.setState({ user: user });
            // console.log(user, "user data");
            // console.log(user.map(user => user.profileUrl))
            this.setState({ profilePic: (user.map(user => user.profileUrl))})
        });
    };

    render(props) {
        return (
            <div>
            <Title src={(this.state.profilePic)}/>

            <nav className=" nav navbar navbar-dark">
                <div className="container">
                    <div className="btn-group btn-group-lg" role="group" aria-label="User-Nav">
                        <button type="button" className="btn btn-light btn-nav" aria-label="Globe"><a href="/global">
                            <i className="fas fa-globe-americas"></i></a>
                        </button>
                        <button type="button" className="btn btn-light btn-nav" aria-label="User"><a href="/dashboard">
                            <i className="fas fa-user-circle"></i></a>
                        </button>
                        <button type="button" className="btn btn-light btn-nav" aria-label="Logout" onClick={this.props.onClick}>
                            <i className="fas fa-user-times"></i>
                        </button>
                    </div>
                </div>
            </nav>
            </div>
        )
    };
};

export default Nav;