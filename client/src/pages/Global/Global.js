import React, { Component } from "react";
import axios from 'axios';
import Jumbotron from '../../components/Jumbotron';
import ImageCard from "../../components/ImageCard/ImageCard";

class Global extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: localStorage.getItem('userName'),
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('jwtToken'),
            imageUrl: '',
            allImages: [ ],
            image: ''
        };
    };

    componentDidMount = () => {
        if (localStorage.getItem('jwtToken')) {
            console.log(localStorage);
            axios.defaults.headers.common['Authorization'] = this.state.token;
            this.getAllImages();
        } else {
            window.location.href ="/login"
        }
    };

    getAllImages = () => {
        axios.get('/api/images')
            .then(res => {
                // console.log(res)
                this.setState({allImages: res.data})
            })
    };

    render() {
        return (
            // <div>
            //     <Jumbotron>
            //         <h1 className='text-center'>Welcome to the Global Leaderboard.</h1>&nbsp;
            //         <h4 className='text-center'>Here you will find the top-rated images of the day!</h4>&nbsp;
            //         <div className='text-center'>
            //             <button className="btn btn-primary" onClick= {() => window.location.href = '/question'}>Pick your image</button> 
            //         </div>
            //     </Jumbotron>
                <div className="container" style={{marginTop: 100}}>
                    <div className="row">
                    <div className="col"></div>
                    <div className="col-6">
                        {this.state.allImages.map(image => 
                            
                                <div>
                                    <h3>{image.user}</h3>    
                                    <img
                                        id={image._id}
                                        className="img-fluid rounded mx-auto d-block"
                                        key={image._id}
                                        src={image.url}
                                        user={image.user}
                                        caption={image.caption}
                                        style={{height: 500, width: 500}}
                                    />
                                    <div>
                                    <button className="btn btn-primary">Likes <span class="badge badge-light">4</span></button>&nbsp;
                                    <p><span style={{fontWeight: 'bold'}}>{image.user}</span> <span>{image.caption}</span></p>
                                    </div>
                                </div>
                            
                        )}
                    </div>
                    <div className="col"></div>

                    </div>
            </div>

            // </div>
            
        );
    };
};

export default Global;