import React, { Component, useEffect, useRef, useState } from "react";
import { Route, Switch, Redirect } from "react-router";
import jwtDecode from "jwt-decode";
import io from "socket.io-client";

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
import SendReq from "./Network/SendReq";
import ServerRouter from "./Network/ServerRouter";

const socket = io("localhost:5000");
class App extends Component {
	state = {
		user: localStorage.getItem("JWT")
			? jwtDecode(localStorage.getItem("JWT"))
			: "",
	};
	async componentDidMount() {
		if (this.state.user) {
			const { data } = await SendReq.get(ServerRouter.getPhoto);
			let user = this.state.user;
			user.Photo = data.photo;
			this.setState({ user });
			socket.emit("getUserData", this.state.user.id);
		}
	}
	render() {
		const { user } = this.state;
		return (
			<div>
				<Navbar user={this.state.user} />
				<div className="content">
					<Switch>
						<Route
							path={ClientRouter.chatroom + "/:id"}
							render={(props) => (
								<Dialog socket={socket} user={user} {...props} />
							)}
						/>
						<Route
							path={ClientRouter.profile + "/:id"}
							render={(props) => <Profile user={user} {...props} />}
						/>
						<Route path={ClientRouter.login} component={Login} />
						<Route path={ClientRouter.register} component={Register} />
						<Route path={ClientRouter.logout} component={Logout} />
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
						{user ? (
							<Redirect to={ClientRouter.contacts} />
						) : (
							<Redirect to={ClientRouter.login} />
						)}
					</Switch>
				</div>
			</div>
		);
	}

	componentWillUnmount() {
		socket.disconnect();
		socket.off();
	}
}

export default App;
