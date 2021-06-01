import React, { Component } from "react";
import ReactEmoji from "react-emoji";

const Message = ({ message, senderId, currentUserId, sendingTime }) => {
	let isSentByCurUser = senderId == currentUserId;
	// console.log("isSentByCurUser");
	// console.log(isSentByCurUser);
	// console.log(senderId);
	// console.log(currentUserId);
	return isSentByCurUser ? (
		<div className="container" style={{ backgroundColor: "lightcyan" }}>
			<div className="justify-content-end">
				{/* //справа */}
				<p>{ReactEmoji.emojify(message)}</p>
				<p>{sendingTime}</p>
			</div>
		</div>
	) : (
		<div className="container" style={{ backgroundColor: "lightblue" }}>
			<div className="justify-content-start">
				{/* //слева */}
				<p>{ReactEmoji.emojify(message)}</p>
				<p>{sendingTime}</p>
			</div>
		</div>
	);
};

export default Message;
