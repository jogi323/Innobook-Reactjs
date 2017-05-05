import React from "react";
import './../../App.css';
import $ from 'jquery';
import { browserHistory,Link } from 'react-router';
import swal from 'sweetalert';

export class Signup extends React.Component {
    constructor(){
        super();
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            mobile: '',
            pwd: '',
            gender: ''
        };
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
        const isPassword = refName.indexOf('pwd') !== -1;
        // const isPasswordConfirm = refName === 'cpwd';
        const isEmail = refName === 'email';
        const isMobileNum = refName === 'mobile';
        
        
        // if (isPasswordConfirm) {
        //   if (this.refs.pwd.value !== this.refs.cpwd.value) {
        //     this.refs.cpwd.setCustomValidity('Passwords do not match');
        //   } else {
        //     this.refs.cpwd.setCustomValidity('');
        //   }
        // }

        if(isEmail){
            const emailVal = this.refs.email.value;
            const atpos = emailVal.indexOf("@");
            const dotpos = emailVal.lastIndexOf(".");
            if (atpos<1 || dotpos<atpos+2 || dotpos+2>=emailVal.length) {
                this.refs.email.setCustomValidity('Not a valid e-mail address');
            }else{
                this.refs.email.setCustomValidity('');
            }
        }

        if(isMobileNum){
            const mobileNum = this.refs.mobile.value;
            const pattern = /^\d{10}$/;
            if(mobileNum.length < 10 || mobileNum.length > 10 || !mobileNum.match(pattern)){
                this.refs.mobile.setCustomValidity('Not a valid mobile number');
            }else{
                this.refs.mobile.setCustomValidity('');
            }
        }
            
        if (!validity.valid) {
          if (validity.valueMissing) {
            error.textContent = `${label} is a required field`; 
          } else if (isPassword && validity.patternMismatch) {
            error.textContent = `${label} should be longer than 4 chars`; 
          }
        //    else if (isPasswordConfirm && validity.customError) {
        //     error.textContent = 'Passwords do not match';
        //   }
          else if (isEmail && validity.customError) {
            error.textContent = 'Not a valid e-mail address';
          }else if (isMobileNum && validity.customError) {
            error.textContent = 'Not a valid mobile number';
          }
          return false;
        }
        
        error.textContent = '';
        return true;
    }  

    handleSubmit(e) {    
        e.preventDefault();
        //this.setState({userDeatils:""})
        //console.log('component state', JSON.stringify(this.state));
        //this.setState({userDeatils:'jogi'});
        if (!this.showFormErrors()) {
          console.log('form is invalid: do not submit');
        } else {
          var data = this.state;         
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3030/register',
            data: data
          })
          .done((data) => {
            if(data === 0){
                swal('Email already Registered')
                browserHistory.push('/signup');
                
            }else if(data === 1){
                swal('Successfully Registered')
                browserHistory.push('/');
            }
            // console.log(data);
           
             //browserHistory.push('/');
           
          })
          .fail(function(jqXhr) {
            console.log('failed to register');
          });
          
          console.log('form is valid: submit');
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="logo">
                        <img id="logo" src='images/logowhite.png' alt="boohoo" className="img-responsive"/>
                    </div>
                </div>
                <div className="well col-md-4 col-sm-4 col-md-offset-4">
                    <form noValidate>
                        <div className="form-group">
                                <label id="firstnameLabel">First Name </label>
                                <input className="form-control" type="text" name="firstname" ref="firstname"
                                value={ this.state.firstname } onChange={ this.handleChange } required />
                                <div className="error" id="firstnameError" />
                        </div>
                        <div className="form-group">
                                <label id="lastnameLabel">Last Name </label>
                                <input className="form-control" type="text" name="lastname" ref="lastname"
                                value={ this.state.lastname } onChange={ this.handleChange } required />
                                <div className="error" id="lastnameError" />
                        </div>
                        <div className="form-group">
                                <label id="emailLabel">Email </label>
                                <input className="form-control" type="email" name="email" ref="email"
                                value={ this.state.email } onChange={ this.handleChange } required />
                                <div className="error" id="emailError" />
                        </div>
                        <div className="form-group">
                                <label id="mobileLabel">Mobile Number </label>
                                <input className="form-control" type="text" name="mobile" ref="mobile"
                                value={ this.state.mobile } onChange={ this.handleChange } required />
                                <div className="error" id="mobileError" />
                        </div>
                        <div className="form-group">
                                <label id="pwdLabel">password </label>
                                <input className="form-control" type="password" name="pwd" ref="pwd"
                                value={ this.state.pwd } onChange={ this.handleChange } required />
                                <div className="error" id="pwdError" />
                        </div>
                        {/*<div className="form-group">
                                <label id="cpwdLabel">Conform password:</label>
                                <input className="form-control" type="text" name="cpwd" ref="cpwd"
                                value={ this.state.cpwd } onChange={ this.handleChange } required />
                                <div className="error" id="cpwdError" />
                        </div>*/}
                        <div className="form-group">
                            <div className="col-md-4 col-sm-4">
                                <label id="genderLabel" className="gender">Gender :</label>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <input type="radio" name="gender" ref="gender" value="mail"  onChange={ this.handleChange } required />  Male
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <input type="radio" name="gender" id="fgender" ref="gender" value="female" onChange={ this.handleChange } required />  Female     
                            </div>
                            <div className="error" id="genderError" />
                        </div><br/><br/>
                        <div className="form-group">
                                <button type="submit" className="form-control btn btn-success" onClick={ this.handleSubmit }>Sign me up!</button>
                        </div>
                        Already have an Account??<Link to='/'>Signin</Link>
                    </form>
                </div>
            </div>
        );
    }
}