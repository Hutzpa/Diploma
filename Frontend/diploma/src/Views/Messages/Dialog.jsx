import React, { Component } from "react";

class Dialog extends Component {
	state = {
		messages: [],
		dialogId: 0,
	};

	componentDidMount() {
		this.setState({ user: this.props.user });
		this.setState({ dialogId: this.props.match.params.id });
		console.log(this.state.dialogId);
		// const { data: contacts } = await SendReq.get(ServerRouter.contacts);
		// this.setState({ contacts });
		// console.log(this.state.contacts);
	}

	render() {
		return <h3>DIalog {this.state.dialogId}</h3>;
	}
}

export default Dialog;
