import React, { Component } from "react";
import axios from 'axios';

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
                this.setState({allImages: res.data})
            })
    };

    render() {
        return (
            <div className="container" style={{marginTop: 100}}>
                <div className="row">
                    <div className="col"></div>
                    <div className="col-6">
                        {this.state.allImages.map(image => 
                            
                                <div key={image._id}>
                                    <h3>{image.user}</h3>    
                                    <img
                                        id={image._id}
                                        className="img-fluid rounded mx-auto d-block"
                                        src={image.url}
                                        user={image.user}
                                        caption={image.caption}
                                        alt={image.caption}
                                        style={{height: 500, width: 500}}
                                    />
                                    <div>
                                        <button className="btn btn-danger">Likes <span className="badge badge-light">4</span></button>&nbsp;
                                        <p><span style={{fontWeight: 'bold'}}>{image.user}</span> <span>{image.caption}</span></p>
                                    </div>
                                </div>
                            
                        )}
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        );
    };
};

export default Global;