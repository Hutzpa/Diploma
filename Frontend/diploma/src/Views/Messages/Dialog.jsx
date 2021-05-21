import React, { Component, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import ClientRouter from "./../../Network/ClientRouter";

let socket;

class Dialog extends Component {
	state = {
		messages: [],
		dialogId: 0,
	};

	componentDidMount() {
		//Получение текущего пользователя и ид диалога
		this.setState({ user: this.props.user });
		this.setState({ dialogId: this.props.match.params.id });
		console.log(this.state.dialogId);
		socket = io("http://127.0.0.1:5000");
		console.log(socket);

		//Получать все сообщения, расфасовывать по отправляющему
	}

	componentWillUnmount() {}

	render() {
		return <h3>DIalog {this.state.dialogId}</h3>;
	}
}

export default Dialog;
