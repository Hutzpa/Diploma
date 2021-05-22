import React, { Component } from "react";
import ReactEmoji from "react-emoji";

const Message = ({ message, senderId, currentUserId, sendingTime }) => {
	let isSentByCurUser = senderId === currentUserId;
	return isSentByCurUser ? (
		<div>
			{/* //Слева */}
			<p>{ReactEmoji.emojify(message)}</p>
			<p>{sendingTime}</p>
		</div>
	) : (
		<div>
			{/* //Справа */}
			<p>{ReactEmoji.emojify(message)}</p>
			<p>{sendingTime}</p>
		</div>
	);
};

export default Message;
