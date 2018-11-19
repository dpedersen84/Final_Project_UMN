import React, { Component } from "react";
import axios from 'axios';
import Jumbotron from "../../components/Jumbotron";
import Alert from "../../components/Alert";
// import TitleOnly from "../../components/TitleOnly";
import "./Login.css";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName:'',
      password: '',
      message: '',
      isHidden: true
    };
  };

  onInputChange = propertyName => event => {
    this.setState({
      [propertyName]: event.target.value
    });
  };

  alertToggle() {
    this.setState({isHidden: false});
    console.log(this.state.isHidden);
  };

  onSubmit = e => {
    e.preventDefault();
    const { userName, password } = this.state;
    console.log(userName, password);
    axios.post('/api/auth/login', { userName, password })
      .then((result) => {
        this.setState({ message: 'Login success!'});
        console.log(result);
        console.log(this.state);
        localStorage.setItem('jwtToken', result.data.token);
        localStorage.setItem('userId', result.data.userId);
        localStorage.setItem('userName', result.data.userName);        
        this.props.history.push('/global');
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.setState({ message: 'Login failed. Username or password do not match' });
          this.alertToggle();
          console.log(this.state.message);
          this.setState({userName:'', password: ''})
        };
      });
  };

  render() {
    return (
      <div>
        <Jumbotron
          backgroundImage="https://i.imgur.com/atMSQTA.jpg"
        />
        <div className="container">
          <div className="row">
            <div className="col-xs-1 col-md-5 offset-md-3">
              <form className="form-signin" onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <input type="text" className="form-control" id="loginUsernameInput" placeholder="Enter Username" name="userName" value={this.state.userName} onChange={this.onInputChange("userName")} required></input>
                  </div>
                  <div className="form-group">
                      <input type="password" className="form-control" id="loginPasswordInput" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.onInputChange("password")} required></input>
                  </div>
                  <button type="submit" className="btn btn-danger" id="loginBtn" value="Submit" onClick={this.onSubmit}>Login</button>
                  <br></br>
                  {!this.state.isHidden && <Alert />}
                  <br></br>
                  <h6>Don't have an account yet? <a href="/register" id="link">Create an account now!</a></h6>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  };
};

export default Login;