import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router";
//import { Route, Switch, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

import ClientRouter from "./Network/ClientRouter";

import "./App.css";

import Navbar from "./Views/Navbar/NavBar";
import Login from "./Views/Auth/Login";
import Register from "./Views/Auth/Register";
import Home from "./Views/Home/Home";
import Logout from "./Views/Auth/Logout";
import Profile from "./Views/Profile/Profile";
import Search from "./Views/Contacts/Search";
import ContactRequests from "./Views/Contacts/ContactRequests";
import Contacts from "./Views/Contacts/Contacts";
import Dialog from "./Views/Messages/Dialog";
import VideoDialog from "./Views/Messages/VideoDialog";

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
		const { user } = this.state;
		return (
			<div>
				<Navbar user={this.state.user} />
				<div className="content">
					<Switch>
						<Route exact path={ClientRouter.home} component={Home} />
						<Route
							path={ClientRouter.chatroom + "/:id"}
							render={(props) => <Dialog user={user} {...props} />}
						/>
						<Route
							path={ClientRouter.profile + "/:id"}
							render={(props) => <Profile user={user} {...props} />}
						/>
						<Route path={ClientRouter.logout} component={Logout} />
						<Route path="/VideoDialog" component={VideoDialog} />
						<Route
							path={ClientRouter.search}
							render={(props) => <Search user={user} {...props} />}
						/>
						<Route
							path={ClientRouter.profile}
							render={(props) => <Profile user={user} {...props} />}
						/>
						<Route
							path={ClientRouter.requests}
							render={(props) => <ContactRequests user={user} {...props} />}
						/>
						<Route
							path={ClientRouter.contacts}
							render={(props) => <Contacts user={user} {...props} />}
						/>
						<Redirect to={ClientRouter.home} />
						<Route path={ClientRouter.login} component={Login} />
						<Route path={ClientRouter.register} component={Register} />
						<Redirect to={ClientRouter.login} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
