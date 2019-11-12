import React, { Component } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import './Login.css';
import fire from '../../firebase/fire';
import swal from 'sweetalert2';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    swal.fire({ title: "<span style='color:white;'>Fetching info ...</span>", background: '#000', onBeforeOpen: () => { swal.showLoading() } })
      .then(
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
          .then((u) => {
            swal.fire({ background: '#000', title: "<span style='color:white;'>Success!<span>", html: `<span style='color:white;'>Succesfully logged in as ${u.user.email}</span>`, type: "success" })
          })
          .catch((error) => {
            swal.fire({ background: '#000', title: "<span style='color:white;'>Error!</span>", html: `<span style='color:white;'> ${error.message} </span>`, type: "error" });
            console.log(error.message);
          }));
  }


  render() {
    return (
      <div id="loginContainer">
        <form onSubmit={this.login}>
          <h1>D-Track</h1>
          <Form.Label>Email</Form.Label>
          <FormControl
            id="input"
            onChange={this.handleChange}
            name="email"
            type="email" />

          <Form.Label>Password</Form.Label>

          <FormControl id="input"
            type="password"
            onChange={this.handleChange}
            name="password" />

          <button type="submit" className="loginButton" on >LOGIN</button>
        </form>
      </div>


    )
  }
}


export default Login;