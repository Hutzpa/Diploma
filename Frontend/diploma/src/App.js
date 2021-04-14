import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router";
import jwtDecode from "jwt-decode";

import ClientRouter from "./Network/ClientRouter";

import "./App.css";

import Navbar from "./Views/Navbar/NavBar";
import Login from "./Views/Auth/Login";
import Register from "./Views/Auth/Register";
import Home from "./Views/Home/Home";
import Logout from "./Views/Auth/Logout";

class App extends Component {
	state = {};

	componentDidMount() {
		try {
			var jwt = localStorage.getItem("JWT");
			const user = jwtDecode(jwt);
			this.setState({ user });
		} catch (error) {}
	}

	render() {
		return (
			<React.Fragment>
				<div className="content">
					<Navbar user={this.state.user} />
					<Switch>
						<Route path={ClientRouter.login} component={Login} />
						<Route path={ClientRouter.register} component={Register} />
						<Route path={ClientRouter.home} component={Home} />
						<Route path={ClientRouter.logout} component={Logout} />
						<Redirect to={ClientRouter.home} />
					</Switch>
				</div>
			</React.Fragment>
		);
	}
}

export default App;
