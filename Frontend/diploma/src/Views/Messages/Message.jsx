import React, { Component } from "react";

const Message = ({ message, senderId, currentUserId }) => {
	console.log(`Passed message is ${message}`);
	let isSentByCurUser = senderId === currentUserId;
	return isSentByCurUser ? (
		<div>
			{/* //Слева */}
			<p>{message}</p>
		</div>
	) : (
		<div>
			{/* //Справа */}
			<p>{message}</p>
		</div>
	);
};

export default Message;
