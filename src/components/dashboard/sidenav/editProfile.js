import React from "react";
import $ from 'jquery'; 
export class EditProfile extends React.Component {
    constructor(props){
            super(props);
            this.state = {
             firstName:'',
             lastName:'',
             email:'',
             description:'',
             mobile:'',
             dob:'',
             hobbies:'' 
        }
       this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
       $.ajax({
        type: 'GET',
        url: 'http://localhost:7377/update/profile/prudhviraju29.mantena@gmail.com'
      })
      .done((data) =>{
          console.log(data.data);
        //   console.log(this.state.firstName);
          this.setState({
              firstName : data.data.firstName,
              lastName:data.data.lastName,
              email:data.data.email,
              description:data.data.description,
              mobile:data.data.phone,
              hobbies:data.data.hobbies
       })
      })
      .fail(function(jqXhr) {
        console.log('failed to register');
      });
    
        }
         handleChange(event) {
        this.setState({
            [event.target.name]:event.target.value
        });
  }

  handleSubmit(event) {
    
    event.preventDefault();
    console.log(this.state);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:7377/update/profile',
        data:this.state

      })
      .done((data) =>{
          console.log(data.data);
        //   console.log(this.state.firstName);
          
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


                    <div className="form-group">
                        <label className="col-md-3 control-label">Email</label>
                        <div className="col-md-8">
                            <input className="form-control" type="text"name="email" value={this.state.email} onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-3 control-label">Description</label>
                        <div className="col-md-8">
                            <textarea className="form-control" type="text" name="description" value={this.state.description} onChange={this.handleChange}></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3 control-label">Mobile</label>
                        <div className="col-md-8">
                            <input className="form-control" type="tel" name="mobile" value={this.state.mobile} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-3 control-label">Date of birth</label>
                        <div className="col-md-8">
                            <input className="form-control" type="date" name="dob" value={this.state.dob} onChange={this.handleChange}/>
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

