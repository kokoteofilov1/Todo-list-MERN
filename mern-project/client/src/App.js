import React from 'react';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Create from "./Create";
import Edit from "./Edit";
import User from "./User";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path={"/"}>
                    <SignIn/>
                </Route>

                <Route path={"/SignUp"}>
                    <SignUp/>
                </Route>

                <Route path={"/User"}>
                    <User/>
                </Route>

                <Route path={"/Create"}>
                    <Create/>
                </Route>

                <Route path={"/Edit"}>
                    <Edit/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
