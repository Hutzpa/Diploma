import React, { Component, useState } from "react";
import io from "socket.io-client";
import Input from "./../../Reusable/Input";
import DialogHeader from "./DialogHeader";
import SendReq from "./../../Network/SendReq";
import ServerRouter from "./../../Network/ServerRouter";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";

let socket;
class Dialog extends Component {
	state = {
		messages: [],
		message: "",
		dialogId: 0,
		companion: { firstName: "", lastName: "" },
	};

	async componentDidMount() {
		//Получение текущего пользователя и ид диалога
		this.setState({ user: this.props.user });
		this.setState({ dialogId: this.props.match.params.id });

		//Получение имени и фамилии пользователя напротив
		const { data } = await SendReq.post(ServerRouter.getCompanionName, {
			DialogId: parseInt(this.props.match.params.id),
		});
		this.setState({ companion: data });

		//Подключение сокета
		socket = io("localhost:5000");
		socket.emit("join", {
			room: this.props.match.params.id,
			user: this.props.user,
		});

		//Получать все сообщения, расфасовывать по отправляющему
		const { data: messages } = await SendReq.post(ServerRouter.getMessages, {
			DialogId: parseInt(this.props.match.params.id),
		});
		console.log(messages);
		this.setState({ messages });

		//Сокет для сообщений
		socket.on("message", (message) => {
			console.log(message);
			const { messages } = this.state;
			this.setState({ messages: [...messages, message] });
		});
	}

	componentWillUnmount() {
		socket.disconnect();
		socket.off();
	}

	handleChange = async ({ currentTarget: input }) => {
		let message = { ...this.state.message };
		message = input.value;
		this.setState({ message });
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		let { message } = this.state;
		socket.emit("sendMessage", { message });

		await SendReq.post(ServerRouter.saveMessage, {
			ChatRoomId: parseInt(this.state.dialogId),
			Text: this.state.message,
		});

		this.setState({ message: "" });
	};

	render() {
		const { message } = this.state;
		const { companion } = this.state;
		const { messages } = this.state;
		const { user: _user } = this.state;
		return (
			<div>
				<DialogHeader
					firstName={companion.firstName}
					lastName={companion.lastName}
				/>
				<ScrollToBottom>
					{messages.map(({ Id, User, Text, SendingTime }) => (
						<div key={parseInt(Id) === 0 ? Text : Id}>
							<Message
								message={Text}
								senderId={User.id}
								currentUserId={_user.id}
								sendingTime={SendingTime}
							/>
						</div>
					))}
				</ScrollToBottom>
				<div>
					<form onSubmit={(e) => this.handleSubmit(e)}>
						<Input
							name="message"
							value={message}
							onChange={this.handleChange}
							inputType="text"
							placeholder="Your message"
							maxLength={2000}
						/>
					</form>
				</div>
			</div>
		);
	}
}

export default Dialog;
