import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import {Home} from "./components/home/home";
import {Signin} from "./components/home/signin";
import {Signup} from "./components/home/signup";
import {Dashboard} from "./components/dashboard/dashboard";
import {Header} from "./components/dashboard/header/header";
import {Profile} from "./components/dashboard/sidenav/profile";
import {About} from "./components/dashboard/sidenav/about";
import {Photos} from "./components/dashboard/sidenav/photos";
import {FriendsProfile} from "./components/dashboard/sidenav/friendsProfile";
import {EditProfile} from "./components/dashboard/editprofile/editprofile";
class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path={"/"} component={Home} >
                    <IndexRoute component={Signin} />
                    {/*<Route path={"signpin"} component={Signin} />*/}
                    <Route path={"signup"} component={Signup} />
                </Route>
                <Route path={"dashboard" }component={Dashboard}>
                    <IndexRoute component={Header} />
                    <Route path={"about"} component={About} />
                    <Route path={"photos"} component={Photos} />
                    <Route path={"profile"} component={Profile} />
                    <Route path={"friendsProfile"} component={FriendsProfile} />
                    <Route path={"editprofile"} component={EditProfile} />
                </Route>
            </Router>
        );
    }
}

render(<App />, window.document.getElementById('root'));