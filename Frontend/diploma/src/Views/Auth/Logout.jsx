import React, { Component } from "react";
import ClientRouter from "./../../Network/ClientRouter";

class Logout extends Component {
	componentDidMount() {
		localStorage.removeItem("JWT");
		window.location = ClientRouter.login;
	}

	render() {
		return null;
	}
}

export default Logout;
