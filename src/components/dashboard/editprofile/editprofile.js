import React from "react";
import $ from 'jquery';
import moment from 'moment';

export class EditProfile extends React.Component {
    
    constructor(props){
    super(props);
    if(localStorage.getItem('user')){
      var userDetails=JSON.parse(localStorage.getItem('user'));
      this.state={
        firstName:userDetails.firstName,
        lastName:userDetails.lastName,
        // email:userDetails.email,
        gender:userDetails.gender,
        phone:userDetails.phone,
        hobbies:userDetails.hobbies,
        description:userDetails.description,
        dob:userDetails.dob,
        id:userDetails._id
      };
   
    }
     this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
   }
handleChange(event) {
    this.setState({
        [event.target.name]:event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.id);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/updateuser',
        data:this.state

        })
        .done((data) =>{
            console.log(data);
       if(data.status===1){
        alert('Profile Updated Successfully');

       }else if(data.status===0){
           alert('Failed to Updated Profile'); 
       }
            
        })
        .fail(function(jqXhr) {
        console.log('failed to register');
        });

    }
    render() {
        return (
            <div>
                <div className="panel panel-info post animated fadeInUp">
                    <div className="panel-heading">
                        <h3 className="panel-title">Edit info</h3>
                    </div>
                     <div className="panel-body editform-main">
                          <div className="form-group">
                            <label className="col-md-3 control-label" >First name</label>
                            <div className="col-md-8">
                                <input className="form-control" type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                        <label className="col-md-3 control-label">Last name</label>
                        <div className="col-md-8">
                            <input className="form-control" type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
                        </div>
                        </div>


                    {/*<div className="form-group">
                        <label className="col-md-3 control-label">Email</label>
                        <div className="col-md-8">
                            <input className="form-control" type="text"name="email" value={this.state.email} onChange={this.handleChange}/>
                        </div>
                    </div>*/}

                    <div className="form-group">
                        <label className="col-md-3 control-label">Description</label>
                        <div className="col-md-8">
                            <textarea className="form-control" type="text" name="description" value={this.state.description} onChange={this.handleChange}></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3 control-label">Mobile</label>
                        <div className="col-md-8">
                            <input className="form-control" type="tel" name="phone" value={this.state.phone} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3 control-label">Date of birth</label>
                        <div className="col-md-8">
                            <input className="form-control" type="date" name="dob" 
                            value={moment(this.state.dob).format()} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3 control-label">Hobbies</label>
                        <div className="col-md-8">
                            <textarea className="form-control" type="text" name="hobbies" value={this.state.hobbies} onChange={this.handleChange}></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-info" onClick={this.handleSubmit}>Save Changes</button>
                    </div>
                     </div>
                </div>
            </div>
        );
    }
}

