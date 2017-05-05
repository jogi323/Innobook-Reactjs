import React from "react";
import Header from './header/header';
import {Sidenav} from './sidenav/sidenav';
import { browserHistory} from 'react-router';
import swal from 'sweetalert';

export class Dashboard extends React.Component {
    componentWillMount() {
        if(localStorage.getItem('user')===null){
            swal('Please Login');
            browserHistory.push('/');
        }else{
            console.log('user');
        }
   }
    render() {
        return (
            <div className="dashboard">
                <div className="col-md-12">
                    <Header/>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <Sidenav/>
                    </div>
                    <div className="col-md-6">
                        {this.props.children}
                    </div>
                </div>
                
            </div>
        );
    }
}