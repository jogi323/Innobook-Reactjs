import React from "react";
import { Link } from 'react-router';
import './sidestyle.css';
export class Sidenav extends React.Component {
    render() {
           var myStyle = {
         fontSize:16 
        }
        return (
           
            <div>
               
                <nav className="navbar navbar-default sidebar" role="navigation">
                    <div className="container-fluid">
                
                    <ul className="nav navbar-nav">
                        <li ><Link to="/dashboard/profile">Profile<span style={myStyle} className="pull-right hidden-xs showopacity glyphicon glyphicon-home"></span></Link></li>
                        <li ><Link  to="/dashboard/about">About<span style={myStyle} className="pull-right hidden-xs showopacity glyphicon glyphicon-th-list"></span></Link></li>
                        <li ><Link  to="/dashboard/friendsProfile">Friendprofile<span style={myStyle} className="pull-right hidden-xs showopacity glyphicon glyphicon-th-list"></span></Link></li>
                        <li ><Link  to="/dashboard/photos">photos<span style={myStyle} className="pull-right hidden-xs showopacity glyphicon glyphicon-th-list"></span></Link></li>
                        <li ><Link  to="/dashboard/editprofile">editprofile<span style={myStyle} className="pull-right hidden-xs showopacity glyphicon glyphicon-th-list"></span></Link></li>    
                    </ul>
                    </div>
 
                </nav>
               
            </div>
        );
    }
}
// <nav class="navbar navbar-default sidebar" role="navigation">
//     <div class="container-fluid">
   
//       <ul class="nav navbar-nav">
//         <li class="active"><a href="#">Home<span style="font-size:16px;" class="pull-right hidden-xs showopacity glyphicon glyphicon-home"></span></a></li>
//         <li class="dropdown">
//           <a href="#" class="dropdown-toggle" data-toggle="dropdown">Usuarios <span class="caret"></span><span style="font-size:16px;" class="pull-right hidden-xs showopacity glyphicon glyphicon-user"></span></a>
        
//         </li>          
//         <li ><a href="#">Libros<span style="font-size:16px;" class="pull-right hidden-xs showopacity glyphicon glyphicon-th-list"></span></a></li>        
//         <li ><a href="#">Tags<span style="font-size:16px;" class="pull-right hidden-xs showopacity glyphicon glyphicon-tags"></span></a></li>
//       </ul>
//     </div>
 
// </nav>