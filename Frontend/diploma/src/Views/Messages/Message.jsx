import React, { Component } from "react";

const Message = ({ message, senderId, currentUserId, sendingTime }) => {
	console.log(`Passed message is ${message}`);
	let isSentByCurUser = senderId === currentUserId;
	return isSentByCurUser ? (
		<div>
			{/* //Слева */}
			<p>{message}</p>
			<p>{sendingTime}</p>
		</div>
	) : (
		<div>
			{/* //Справа */}
			<p>{message}</p>
			<p>{sendingTime}</p>
		</div>
	);
};

export default Message;
