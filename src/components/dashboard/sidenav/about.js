import React, { Component } from 'react';

export class About extends Component {
  constructor(){
    super();
    this.state = {

    }
    
  }
     componentDidMount() {
      if(localStorage.getItem('user')){
            
            var userDetails=JSON.parse(localStorage.getItem('user'));
            this.setState({
              hobbies:userDetails.hobbies,
              description:userDetails.description
            });
        
          }
      }
  render() {
    return (
      <div className="about well">
        <div className="table-responsive well">
            <table className="table">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              
              <tr>
                <td><b>Hobbie </b> </td>
                <td>{this.state.hobbies}</td>
              </tr>
              <tr>
                <td><b>Description </b> </td>
                <td>{this.state.description}</td>
              </tr>
            </tbody>
          </table>
      </div>
      </div>
    )
  }
}
