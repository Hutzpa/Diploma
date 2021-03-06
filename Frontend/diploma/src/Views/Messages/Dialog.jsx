import React, { Component, useState } from "react";
import io from "socket.io-client";
import Input from "./../../Reusable/Input";
import DialogHeader from "./DialogHeader";
import SendReq from "./../../Network/SendReq";
import ServerRouter from "./../../Network/ServerRouter";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";
import VideoDialog from "./VideoDialog";
import ClientRouter from "./../../Network/ClientRouter";

class Dialog extends Component {
	state = {
		messages: [],
		message: "",
		dialogId: this.props.match.params.id,
		companion: { firstName: "", lastName: "", id: 0 },
		socket: this.props.socket,
		user: this.props.user,
		isVideoOn: false,
	};

	async componentDidMount() {
		//Получение имени и фамилии пользователя напротив
		const { data } = await SendReq.post(ServerRouter.getCompanionName, {
			DialogId: parseInt(this.props.match.params.id),
		});
		this.setState({ companion: data });

		const { socket } = this.state;

		socket.emit("join", {
			room: this.props.match.params.id,
			user: this.props.user,
		});

		//Получать все сообщения, расфасовывать по отправляющему
		const { data: messages } = await SendReq.post(ServerRouter.getMessages, {
			DialogId: parseInt(this.props.match.params.id),
		});
		this.setState({ messages });

		//Сокет для сообщений
		socket.on("message", (message) => {
			const { messages } = this.state;
			this.setState({ messages: [...messages, message] });
		});
	}

	handleChange = async ({ currentTarget: input }) => {
		let message = { ...this.state.message };
		message = input.value;
		this.setState({ message });
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const { socket } = this.state;
		let { message } = this.state;
		socket.emit("sendMessage", { message });

		await SendReq.post(ServerRouter.saveMessage, {
			ChatRoomId: parseInt(this.state.dialogId),
			Text: this.state.message,
		});
		this.setState({ message: "" });
	};

	clearTheVideo = () => {
		const { isVideoOn } = this.state;
		this.setState({ isVideoOn: !isVideoOn });
	};

	render() {
		const { messages } = this.state;
		const { user: _user } = this.state;
		const { message } = this.state;
		const { companion } = this.state;
		const { socket } = this.state;
		const { isVideoOn } = this.state;
		return (
			<div>
				<div className={!isVideoOn ? "container" : ""}>
					<div className="row">
						{!isVideoOn ? (
							<div className="">
								<DialogHeader
									firstName={companion.firstName}
									lastName={companion.lastName}
								/>
							</div>
						) : null}
						<div className="">
							<VideoDialog
								_socket={socket}
								nickname={
									this.state.user.firstName + " " + this.state.user.lastName
								}
								id={_user.id}
								nameToCall={companion.firstName + " " + companion.lastName}
								isVideoOn={this.clearTheVideo}
							/>
						</div>
					</div>
					{!isVideoOn ? (
						<div>
							<div
								className="row"
								style={{ height: 500, width: 1000, overflow: "scroll" }}
							>
								<div className="col-sm-10">
									{messages.map(({ Id, User, Text, SendingTime }) => (
										<div key={parseInt(Id) === 0 ? Text : Id}>
											<Message
												message={Text}
												senderId={User.Id ? User.Id : User.id}
												currentUserId={_user.id}
												sendingTime={SendingTime}
											/>
										</div>
									))}
								</div>
							</div>
							<div className="row">
								<div className="col"></div>
								<div className="col-6">
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
								<div className="col"></div>
							</div>
						</div>
					) : null}
				</div>
			</div>
		);
	}
}

export default Dialog;
