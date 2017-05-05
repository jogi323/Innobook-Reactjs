
import React from 'react';
// import {Typeahead} from 'react-bootstrap-typeahead';
import $ from "jquery";
import { browserHistory } from 'react-router';
var Typesearch = require('react-bootstrap-typeahead').Typeahead;
import '../../../App.css';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data : []
        };
        this.handleLogout = this.handleLogout.bind(this);
        $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/alldata'
      })
      .done((res) => {
        console.log("Success");
        console.log(res);
       
       this.setState({data:res})
        
      })
      .fail(function(jqXhr) {
        console.log('failed ');
      });
      
    }
    handleLogout(e){
        e.preventDefault();
       
        $.ajax({
            method:'POST',
            url:'http://localhost:8080/logOut'
        }).done((res)=>{
            localStorage.clear();
            console.log(res);
            browserHistory.push('/');
        }).fail(function(jqXhr) {
        console.log('failed to Logout');
      });
    }
    render() {
        return(
            <div className=" header-main">
                <div className="">
                    <nav className="navbar navbar-default nav-menu" role="navigation">
                    <div className=" navbar-border">
                        <div className="navbar-header col-md-3">
                        <a className="navbar-brand logo-react" href="#"><img alt="logo" className="logoimg" src="http://localhost:3000/images/logowhite.png"/></a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav  col-md-6 typehead-search">
                            <li>
                                <Typesearch placeholder="search by name..."
                                    labelKey={option => `${option.firstName} ${option.lastName}`}
                                    options={this.state.data}
                                />   
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right logoutlink col-md-2">
                            <li id="notifications"><i className="fa fa-bell-o" aria-hidden="true"></i></li>
                            <li id="logout"><a href=""  onClick={this.handleLogout}>Logout</a></li>
                        </ul>
                        </div>
                    </div>
                    </nav>
                </div>
        </div>
        )
    }
}

export default Header;