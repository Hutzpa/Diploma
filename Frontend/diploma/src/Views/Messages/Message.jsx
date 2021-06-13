import React, { Component } from "react";
import ReactEmoji from "react-emoji";

const Message = ({ message, senderId, currentUserId, sendingTime }) => {
	let isSentByCurUser = senderId == currentUserId;
	const date = new Date(Date.parse(sendingTime));

	return isSentByCurUser ? (
		<div
			className="container rounded"
			style={{ backgroundColor: "#00ffff", textAlign: "end" }}
		>
			<div className="lead">
				{/* //справа */}
				<p>{ReactEmoji.emojify(message)}</p>
				<p>{`${date.getDate()}.${date.getMonth()}-${date.getHours()}:${date.getMinutes()}`}</p>
			</div>
		</div>
	) : (
		<div
			className="container rounded"
			style={{ backgroundColor: "#33ccff", textAlign: "start" }}
		>
			<div className="lead">
				{/* //слева */}
				<p>{ReactEmoji.emojify(message)}</p>
				<p>{`${date.getDate()}.${date.getMonth()}-${date.getHours()}:${date.getMinutes()}`}</p>
			</div>
		</div>
	);
};

export default Message;
