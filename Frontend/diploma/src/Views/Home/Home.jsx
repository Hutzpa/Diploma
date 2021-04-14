import React, { Component } from "react";
import ServerRouter from "../../Network/ServerRouter";
import SendReq from "../../Network/SendReq";
class Home extends Component {
	state = {};

	componentDidMount = async () => {
		// const result = await SendReq.get(ServerRouter.users);
		// console.log(result);
	};

	render() {
		return <div>Home</div>;
	}
}

export default Home;
