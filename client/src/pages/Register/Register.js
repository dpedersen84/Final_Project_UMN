import React, { Component } from "react";
import axios from 'axios';
import TitleOnly from "../../components/TitleOnly";
import Uploader from "../../components/Uploader/Uploader";
import "./Register.css"

class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
        userName: '',
        password: '',
        profileUrl: 'https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest/scale-to-width-down/480?cb=20160927044640',
        firstName: '',
        email: ''
      };
    };

    handleInputChange = propertyName => (event) => {
      this.setState({
        [propertyName]: event.target.value
      });
    };

    handleFileUpload = profileUrl => {
      // console.log("String");
      this.setState({profileUrl})
      console.log(profileUrl)
    }
    
    handleFormSubmit = event => {
      event.preventDefault();
      
      const { userName, password, firstName, email, profileUrl } = this.state;
      console.log(userName, password, email, firstName, profileUrl);

      axios.post('/api/auth/register', { userName, password, profileUrl, firstName, email })
        .then((result) => {
          console.log(userName);
          console.log(password);
          console.log(profileUrl)
          console.log(result);
          this.props.history.push("/login");
        })

    };


    render() {
      return (
        <div>
          <TitleOnly />
          <div className="container">
          <br></br>
          <h3>Create a New Account</h3>
          <br></br>
          <form>
              <div className="form-group">
                  <label htmlFor="loginUsernameCreate">Username</label>
                  <input name="userName" value={this.state.userName} onChange={this.handleInputChange("userName")} type="text" className="form-control" id="loginUsernameCreate" placeholder="" required></input>
              </div>
              <div className="form-group">
                  <label htmlFor="loginPassword1Create">Password</label>
                  <input name="password1" value={this.state.password} onChange={this.handleInputChange("password")} type="password" className="form-control" id="loginPassword1Create" placeholder="" required></input>
              </div>
              <div className="form-group">
                  <label htmlFor="loginNameCreate">First Name</label>
                  <input name="password1" value={this.state.firstName} onChange={this.handleInputChange("firstName")} type="text" className="form-control" id="loginNameCreate" placeholder="" required></input>
              </div>
              <div className="form-group">
                  <label htmlFor="loginEmailCreate">E-mail</label>
                  <input name="password1" value={this.state.email} onChange={this.handleInputChange("email")} type="email" className="form-control" id="loginEmailCreate" placeholder="" required></input>
              </div>

              <div><img id="image-preview" src={this.state.profileUrl} alt="alt"></img></div>
              <Uploader id="uploader" onChange={this.handleFileUpload}  name="my_file" data-images-only data-tabs="file camera url" data-crop="1:1"/>

              <br></br>
              <br></br>


              <button onClick={this.handleFormSubmit} className="btn btn-danger" id="submit-btn">Submit</button>
          </form>
          </div>
        </div>
      );
    }
  }

export default Register;
