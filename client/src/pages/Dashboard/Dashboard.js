import React, { Component } from "react";
import axios from 'axios';
// import Nav from "../../components/Nav";
import Jumbotron from "../../components/Jumbotron";
// import ImageCard from "../../components/ImageCard/ImageCard";
// import { Input, FormBtn } from "../../components/Form";
// import { relative } from "path";
// import CommentForm from "../../components/CommentForm";
// import './Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: localStorage.getItem('userName'),
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('jwtToken'),
            userImages: [ ],
            selectedImage: '',
            currentURL: '',
            name: '',
            email: '',
            imageUrl: '',
            imageId: '',
            caption: '',
        };
    };

    componentDidMount = () => {
        if (localStorage.getItem('jwtToken')) {
            // console.log(localStorage);
            axios.defaults.headers.common['Authorization'] = this.state.token;
            this.getUserImages();
            this.getUserInfo();
        } else {
            window.location.href ="/login"
        }
    };

    getUserImages = () => {
        let url;
        url = `/api/images/${localStorage.getItem('userId')}`;
        axios.get(url)
            .then(res => {
                if(res.data.length) {
                    this.setState({
                        userImages: res.data,
                        selectedImage: (res.data[res.data.length-1]),
                        currentURL: (res.data[res.data.length-1].url),
                        caption: (res.data[res.data.length-1].caption),
                    });
                } else {
                    this.setState({
                        userImages: '',
                        selectedImage: '',
                        currentURL: '',
                        caption: '',
                    });
                }
            })
    };

    getUserInfo = () => {
        let url;
        url = `/api/images/users/${localStorage.getItem('userId')}`;
        axios.get(url)
            .then(res => {
                this.setState({
                    name: res.data[0].name,
                    email: res.data[0].email
                })
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

        axios.put(`/api/images/${this.state.selectedImage._id}`, captionObject)
            .then(res => {
                console.log(res);
            });
        window.location.reload();
    };

    questionPageLoad = () => {
        window.location.href="/question";
    };

    changeImage = (url, caption) => {
        this.setState({currentURL: url});
        this.setState({caption: caption});
    };

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className='text-center'>Welcome to your dashboard!</h1>&nbsp;
                    <h4 className='text-center'>Here you can edit your profile and find your chosen image of the day!</h4>
                </Jumbotron>

                {this.state.userImages.length ? (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2>User Info</h2>&nbsp;
                            <h4>{this.state.userName}</h4>
                            <p>Name: {this.state.name}</p>
                            <p>Email: {this.state.email}</p>
                            <p>Id: {this.state.userId}</p>
                        </div>
                        <div className="col-6">
                            {/* <h2>Selected Image</h2>&nbsp; */}&nbsp;
                            {/* <img className="img-fluid" src={this.state.selectedImage.url} style={{height: 300}} alt="Daily"></img> */}
                            <img className="img-fluid" src={this.state.currentURL} style={{height: 300}} alt="Daily"></img>
                            <h3>{this.state.caption}</h3>
                        </div>
                        <div className="col ">
                            <h2>All Photos</h2>&nbsp;
                            {this.state.userImages.map(image => 
                                <img className="img-fluid" src={image.url} key={image._id} onClick={()=>this.changeImage(image.url, image.caption)}alt="All"></img>
                            )}
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col"></div>
                        <div className="col-6">
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
                        <div className="col"></div>
                    </div> */}
                </div>
                ) : (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2>User Info</h2>&nbsp;
                            <h4>{this.state.userName}</h4>
                            <p>Name: {this.state.name}</p>
                            <p>Email: {this.state.email}</p>
                            <p>Id: {this.state.userId}</p>
                        </div>
                        <div className="col-6">
                            <h2>No Recent Photos</h2>&nbsp;
                            <div>
                                <button className="btn btn-danger" onClick={this.questionPageLoad}>Daily Question</button>
                            </div>
                        </div>
                        <div className="col ">
                            <h2>0 Photos</h2>
                        </div>
                    </div>
                </div>
                )}
            </div>
        );
    };
};

export default Dashboard;