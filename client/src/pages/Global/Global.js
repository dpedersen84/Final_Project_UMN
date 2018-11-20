
import React, { Component } from "react";
import axios from 'axios';
import Jumbotron from '../../components/Jumbotron';
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
            <div>
                <Jumbotron>
                    <h1 className='text-center'>Welcome to the Global Leaderboard.</h1>&nbsp;
                    <h4 className='text-center'>Here you will find the top-rated images of the day!</h4>&nbsp;
                    <div className='text-center'>
                        <button className="btn btn-primary" onClick= {() => window.location.href = '/question'}>Pick your image</button> 
                    </div>
                </Jumbotron>
                <div className="container">
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

            </div>
            
        );
    };
};

export default Global;