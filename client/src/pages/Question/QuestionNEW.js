import React, { Component } from "react";
// import Nav from "../../components/Nav";
// import Navbar from "../../components/Navbar";
import Jumbotron from "../../components/Jumbotron";
import ImageCard from "../../components/ImageCard";
import questions from "../../utils/Questions.json";
import moment from "moment";
import axios from 'axios';
import API from "../../utils/API";
import './Question.css';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('userName'),
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('jwtToken'),
            questions,
            currentQ: questions[0].text,
            time: new Date().toLocaleString(),
            currentDate: moment(new Date()).format("M/DD/YYYY"),
            search:"",
            photo: "",
            days: 0,
            hours: 0,
            min: 0,
            sec: 0,
        };
    };
    

    getDayOfYear = () => {
        let now = new Date();
        let start = new Date(now.getFullYear(), 0, 0);
        let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        let oneDay = 1000 * 60 * 60 * 24;
        let day = Math.floor(diff / oneDay);
        return day
    };

    componentDidMount = () => {

        if (localStorage.getItem('jwtToken')) {
            console.log(localStorage);
            axios.defaults.headers.common['Authorization'] = this.state.token;
            
            this.setState({
                currentQ: localStorage.getItem('question') || questions[this.getDayOfYear() % (questions.length-1)].text
            })

            this.intervalID = setInterval(
                () => this.tick(),
                1000
            );
            
            this.intervalID = setInterval(() => this.tick(), 1000);
            this.dateID = setInterval(() => this.dateTicker(moment().add(1,'days').startOf('day')), 1000)

        } else {
            window.location.href ="/login"
        };
    };

    // componentWillUnmount = () => {
    //     clearInterval(this.intervalID);
    //     clearInterval(this.dateID)
    // };

    stop = () => {
        clearInterval(this.dateID)
        // make pretty things appear
    };

    dateTicker = (midnight) => {
        let diff = (Date.parse(midnight) - Date.parse(new Date())) / 1000;
        
        if (diff <= 0) this.stop();

        const timeLeft = {
            days: 0,
            hours: 0,
            min: 0,
            sec: 0
        };
    
        if (diff >= 86400) { // 24 * 60 * 60
        timeLeft.days = Math.floor(diff / 86400);
        diff -= timeLeft.days * 86400;
        }
        if (diff >= 3600) { // 60 * 60
        timeLeft.hours = Math.floor(diff / 3600);
        diff -= timeLeft.hours * 3600;
        }
        if (diff >= 60) {
        timeLeft.min = Math.floor(diff / 60);
        diff -= timeLeft.min * 60;
        }
        timeLeft.sec = diff;
    
        this.setState({...this.state, ...timeLeft})
    
    };

    tick= () => {
        /* condition to check if current time is midnight.  iF so, run this.randomQuestion*/
        this.setState({
            time: new Date().toLocaleString()
        });
        // const currentDate = moment(new Date()).format("M/DD/YYYY");
        if (this.state.time ===`${this.state.currentDate}, 7:51:00 PM`) {
            this.randomQuestion()
        }
        
    };

    handleFormSubmit = event => {

        event.preventDefault();

        console.log("Searching...");
        
        API.getMany(this.state.search)
            .then(res => {
                console.log(res.data.data)
                const random = (arr) => Math.floor(Math.random() * arr.length)
                this.setState({ photo: res.data.data[random(res.data.data)].images.original.url }, () => console.log(this.state.photo))
            })
    };

    handleInputChange = event => {
        event.preventDefault();
        this.setState({search: event.target.value})
    };

    randomQuestion = () => {
        let j = Math.floor(Math.random()*questions.length);
        console.log(j);
        let quest = questions[j].text;
        console.log(this.state.currentQ);
        
        if (this.state.currentQ === quest) {
            this.randomQuestion() 
        } else {
            localStorage.setItem('question', quest);
            this.setState({currentQ:quest})
        } 
    };

    handleShareButton = () => {

        let imageObject = {
            url: this.state.photo,
            caption: this.state.search,
            user: this.state.user,
            userId: this.state.userId,
            likes: 0,
            date: this.state.currentDate
        };

        console.log(imageObject);

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

        axios.post('/api/images', imageObject)
            .then(res => {
            
                console.log(res);
            })

        this.props.history.push("/dashboard");
    };
    
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className='text-center'>Welcome to the Daily Question.</h1>&nbsp;
                    <h4 className='text-center'>Here you will find the question of the day!</h4>&nbsp;
                    <h4 className='text-center'>Answer quick! Question resets every 24 hours!</h4>&nbsp;
                    {/* <p className="clock">{this.state.currentDate}</p> */}
                    <p className="timer text-center">{this.state.hours} Hours {this.state.min} Minutes {this.state.sec} Seconds Remaining!</p>
                </Jumbotron>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1 className="currentQuestion"> {this.state.currentQ} </h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <form>
                                <label>
                                    <input 
                                        type="text" 
                                        name="search"
                                        className="form-control"
                                        id="answer"
                                        placeholder="Answer"
                                        value={this.state.search}
                                        onChange={this.handleInputChange}
                                    />
                                </label>
                                <button
                                    className="btn btn-danger"
                                    id="getImage"
                                    disabled={!(this.state.search)}
                                    onClick={this.handleFormSubmit}>
                                    Search
                                </button>  
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-1 col-md-7 offset-md-3" id="imageCard">
                            {this.state.photo.length ? 
                            (<div>
                                <ImageCard 
                                    photo={this.state.photo} 
                                />
                                <button className="btn btn-danger btn-lg" id="share-btn" onClick={this.handleShareButton}>Share </button>
                            </div>) : (<div></div>)
                            } 
                        </div>
                    </div>
                    
                </div>
            </div>
        )};
}

export default Question;
