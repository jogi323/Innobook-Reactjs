import React from 'react';

export class Profile extends React.Component {
  constructor(){
    super();
    this.state = {

    }
    
  }
   componentDidMount() {
if(localStorage.getItem('user')){

      var userDetails=JSON.parse(localStorage.getItem('user'));
      this.setState({
        firstName:userDetails.firstName,
        lastName:userDetails.lastName,
        email:userDetails.email,
        gender:userDetails.gender,
        phone:userDetails.phone,
      });
   
    }
  }
  render() {
    return (
      <div>
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
                <td><b>Firstname</b> </td>
                <td>{this.state.firstName}</td>
              </tr>
              <tr>
                <td><b>Lastname</b> </td>
                <td>{this.state.lastName}</td>
              </tr>
              <tr>
                <td><b>Email-Id</b> </td>
                <td>{this.state.email}</td>
              </tr>
              <tr>
                <td><b>mobileNumber</b> </td>
                <td>{this.state.phone}</td>
              </tr>
              <tr>
                <td><b>Gender</b> </td>
                <td>{this.state.gender}</td>
              </tr>
            </tbody>
          </table>
      </div>
      </div>
    )
  }
}
