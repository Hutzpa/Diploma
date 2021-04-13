import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router";

import ClientRouter from "./Network/ClientRouter";

import "./App.css";

import Navbar from "./Views/Navbar/NavBar";
import Login from "./Views/Auth/Login";
import Register from "./Views/Auth/Register";
import Home from "./Views/Home/Home";

class App extends Component {
	state = {};
	render() {
		return (
			<React.Fragment>
				<div className="content">
					<Navbar />
					<Switch>
						<Route path={ClientRouter.login} component={Login} />
						<Route path={ClientRouter.register} component={Register} />
						<Route path={ClientRouter.home} component={Home} />
						<Redirect to={ClientRouter.home} />
					</Switch>
				</div>
			</React.Fragment>
		);
	}
}

export default App;
