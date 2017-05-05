import React from "react";
import $ from 'jquery';
import './../../App.css';
import { browserHistory,Link } from 'react-router';

export class Signin extends React.Component {
    arr;
    constructor(){
        super();
        this.state={
            username: '',
            password: '',
            userDeatils:[]
        }
        this.arr = [];
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

      handleChange(e) {
    e.target.classList.add('active');
    
    this.setState({
      [e.target.name]: e.target.value
    });
    
    this.showInputError(e.target.name);
  }
   
 handleSubmit(e) {    
    e.preventDefault();
    this.setState({userDeatils:""})
  
      if (!this.showFormErrors()) {
      console.log('form is invalid: do not submit');
    } else {
      var data = this.state;
      
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/login',
        data: data
      })
      .done((data) => {
      
        console.log(data.user);
        var user=data.user;
        console.log(user);
    //   this.arr.push(data);
      //    this.setState({userDeatils:this.arr});
       localStorage.setItem('user',JSON.stringify(user
       ));
       browserHistory.push('/dashboard/profile');
        loggedIn();
        //window.location='/home';
        // self.clearForm()
      })
      .fail(function(jqXhr) {
        console.log('failed to register');
      });
      
      console.log('form is valid: submit');
    }
  }
    showFormErrors() {
    const inputs = document.querySelectorAll('input');
    let isFormValid = true;
    
    inputs.forEach(input => {
      input.classList.add('active');
      
      const isInputValid = this.showInputError(input.name);
      
      if (!isInputValid) {
        isFormValid = false;
      }
    });
    
    return isFormValid;
  } 
  
   showInputError(refName) {
    const validity = this.refs[refName].validity;
    const label = document.getElementById(`${refName}Label`).textContent;
    const error = document.getElementById(`${refName}Error`);
    const isPassword = refName.indexOf('password') !== -1;
    const isEmail = refName === 'username';
     if(isEmail){
            const emailVal = this.refs.username.value;
            const atpos = emailVal.indexOf("@");
            const dotpos = emailVal.lastIndexOf(".");
            if (atpos<1 || dotpos<atpos+2 || dotpos+2>=emailVal.length) {
                this.refs.username.setCustomValidity('Not a valid e-mail address');
            }else{
                this.refs.username.setCustomValidity('');
            }
        } 
        if(isPassword){
            const password = this.refs.password.value;
            if(password.length < 4 ){
                this.refs.password.setCustomValidity('Password Should be more than 4');
            }else{
                this.refs.password.setCustomValidity('');
            }
        }
    if (!validity.valid) {
      if (validity.valueMpissing) {
        error.textContent = `${label} is a required field`; 
      } else if (isEmail && validity.customError) {
            error.textContent = 'Not a valid e-mail address';
          } else if (isPassword && validity.customError) {
            error.textContent = 'Password Should be more than 4 number';
          }
      // } else if (isPasswordConfirm && validity.customError) {
      //   error.textContent = 'Passwords do not match';
      // }
      return false;
    }
    
    error.textContent = '';
    return true;
  }
    render() {
        var formStyle = {paddingBottom: 15}
        return (
            <div>
                <div className="row">
                    <div className="logo">
                        <img id="logo" src='images/logowhite.png' alt="boohoo" className="img-responsive"/>
                    </div>
                    
                    <div className="col-md-4 col-md-offset-4 well">
                        <div className="imgcontainer">
                                <img src='images/img_avatar2.png' alt="Avatar" className="avatar" />
                        </div>
                        <form noValidate style={formStyle}>
                            <div className="form-group">
                                <label id="usernameLabel">Username</label>
                                <input className="form-control" type="email" name="username" ref="username"
                                value={ this.state.username } onChange={ this.handleChange } required />
                                <div className="error" id="usernameError" />
                            </div>
                            <div className="form-group">
                                <label id="passwordLabel">password</label>
                                <input className="form-control" type="password" name="password" ref="password"
                                value={ this.state.password } onChange={ this.handleChange } required />
                                <div className="error" id="passwordError" />
                            </div>                           
                            <button className="btn btn-primary form-control"
                            onClick={ this.handleSubmit }>submit</button>
                            <p id="signup">You haven't registered yet?<Link to='/signup'>Signup</Link></p>
                        </form>
                    </div>
                    
                </div>
            </div>
        );
    }
}
export function loggedIn(){
    var user=JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if(user===null){
        return false;
    }
}