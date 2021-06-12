import React, { Component } from "react";
import ReactEmoji from "react-emoji";

const Message = ({ message, senderId, currentUserId, sendingTime }) => {
	let isSentByCurUser = senderId == currentUserId;
	const date = new Date(Date.parse(sendingTime));

	console.log("sendingTime");
	console.log(date);

	return isSentByCurUser ? (
		<div
			className="container"
			style={{ backgroundColor: "lightcyan", textAlign: "end" }}
		>
			<div>
				{/* //справа */}
				<p>{ReactEmoji.emojify(message)}</p>
				<p>{`${date.getDate()}:${date.getHours()}:${date.getMinutes()}`}</p>
			</div>
		</div>
	) : (
		<div
			className="container"
			style={{ backgroundColor: "lightblue", textAlign: "start" }}
		>
			<div className="justify-content-start">
				{/* //слева */}
				<p>{ReactEmoji.emojify(message)}</p>
				<p>{`${date.getDate()}:${date.getHours()}:${date.getMinutes()}`}</p>
			</div>
		</div>
	);
};

export default Message;
