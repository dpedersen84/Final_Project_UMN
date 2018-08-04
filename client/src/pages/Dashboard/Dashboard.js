import React, { Component } from "react";
import axios from 'axios';
import Nav from "../../components/Nav";
import ImageCard from "../../components/ImageCard/ImageCard";
import { Input, FormBtn } from "../../components/Form";
// import CommentForm from "../../components/CommentForm";
import './Dashboard.css';

class Dashboard extends Component {

    state = {
        userImages: [ ],
        mostRecentUserImage: '',
        userName: '',
        userId: '',
        imageUrl: '',
        imageId: '',
        caption: '',
    };

    componentDidMount = () => {

        if (localStorage.getItem('jwtToken')===null) {
            this.props.history.push("/login");
        }

        this.setState({user: localStorage.getItem('userName')})
        this.setState({userId: localStorage.getItem('userId')})

        this.getUserImages();
    };

    getUserImages = () => {

        const url = `/api/images/${localStorage.getItem('userId')}`;

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

        axios.get(url)
            .then(res => {
                console.log(`Images`, res.data);
                this.setState({
                    userImages: res.data,
                    mostRecentUserImage: (res.data[res.data.length-1]),
                    
                }, () => {
                    console.log(`Images`, this.state.userImages)
                });
            })
            .catch((error) => {
                if(error.response.status === 401) {
                    this.props.history.push("/login");
                }
            });
    };

    handleInputChange = event => {
        event.preventDefault();
        this.setState({caption: event.target.value})
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        
        let captionObject = {
            caption: this.state.caption
        };

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

        axios.put(`/api/images/${this.state.mostRecentUserImage._id}`, captionObject)
            .then(res => {
                console.log(res);
            })

            window.location.reload();
    };

    logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.href = "/"
        console.log("Logout!")
    };

    handleLikeClick = id => {

        // event.preventDefault();
        console.log("like button clicked");

        console.log(id)

    };

    render() {
        return (
            <div className="container">
                <Nav onClick={() => this.logout()} />

                <div className="row">
                    <div className="col-xs-1 col-md-7 offset-md-3">
                        <h1>{this.state.user}'s Photo of the Day</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-1 col-md-6 offset-md-3">
                        <ImageCard 
                            photo={this.state.mostRecentUserImage.url}
                            caption={this.state.mostRecentUserImage.caption}
                            likes={this.state.mostRecentUserImage.likes}
                            user="YOU !"
                            handleLikeClick={this.handleLikeClick}
                        />
                    </div>
                </div>
                <br></br>
                <div className="row">
                    <div className="col-xs-1 col-md-6 offset-md-3">
                        <h1>{this.state.mostRecentUserImage.caption}</h1>
                        <form> 
                            <Input
                                value={this.state.caption}
                                onChange={this.handleInputChange}
                                placeholder="Update Caption"
                            />
                            <FormBtn 
                                disabled={!(this.state.caption)}
                                onClick={this.handleFormSubmit}    
                            >
                                Submit
                            </FormBtn>
                        </form>
                    </div>
                </div>
                
                
                
            </div> 
        );
    };
};

export default Dashboard;