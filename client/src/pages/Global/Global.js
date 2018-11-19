
import React, { Component } from "react";
import axios from 'axios';
import Nav from "../../components/Nav";
import ImageCard from "../../components/ImageCard/ImageCard";

class Global extends Component {
    constructor(props) {
        super(props);
        this.state = {
                userName: '',
                userId: '',
                imageUrl: '',
                allImages: [ ],
                image: ''
        };
    };

    componentDidMount = () => {

        if (localStorage.getItem('jwtToken')===null) {
            this.props.history.push("/login");
        }

        this.setState({userName: localStorage.getItem('userName')})
        this.setState({userId: localStorage.getItem('userId')})
        
        this.getAllImages();
    };

    getAllImages = () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/images')
            .then(res => {
                console.log(res)
                this.setState({allImages: res.data})
            })
    };

    logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = "/"
        console.log("Logout!")
    };

    render() {
        return (
            <div className="container">
                <Nav onClick={() => this.logout()} />
                {/* <div className="row">
                    <div className="col-xs-1 col-md-6 offset-md-4">
                        <h1>Global Leaderboard</h1>
                    </div>
                </div> */}
                    {this.state.allImages.map(image => 
                        <div className="row" key={image._id}>
                            <div>    
                                <ImageCard
                                    id={image._id}
                                    key={image._id}
                                    photo={image.url}
                                    user={image.user}
                                    caption={image.caption}
                                    handleLikeClick={this.handleLikeClick}
                                />
                            </div>
                        </div>
                    )}
                </div>
        );
    };
};

export default Global;