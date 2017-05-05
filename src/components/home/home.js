import React from "react";
import './../../App.css';


export class Home extends React.Component {
    render() {
        return (
            <div>
               {this.props.children}
            </div>
        );
    }
}