import React, { Component } from "react";
import ReactEmoji from "react-emoji";

const Message = ({ message, senderId, currentUserId, sendingTime }) => {
	let isSentByCurUser = senderId == currentUserId;
	const date = new Date(Date.parse(sendingTime));

	return isSentByCurUser ? (
		<div
			className="container rounded mt-1"
			style={{ backgroundColor: "#00ffff", textAlign: "end" }}
		>
			<div className="lead ">
				{/* //справа */}
				<label>{ReactEmoji.emojify(message)}</label>
				<br />
				<label
					style={{ fontSize: "x-small" }}
				>{`${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${" "} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</label>{" "}
			</div>
		</div>
	) : (
		<div
			className="container rounded mt-1"
			style={{ backgroundColor: "#33ccff", textAlign: "start" }}
		>
			<div className="lead">
				{/* //слева */}
				<label>{ReactEmoji.emojify(message)}</label> <br />
				<label
					style={{ fontSize: "x-small" }}
				>{`${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${" "} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</label>
			</div>
		</div>
	);
};

export default Message;
