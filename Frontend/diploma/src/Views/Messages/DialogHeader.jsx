import React, { Component } from "react";
import { Link } from "react-router-dom";
import ClientRouter from "./../../Network/ClientRouter";
import VideoDialog from "./VideoDialog";

const DialogHeader = ({ firstName, lastName, socket, nickname }) => {
	return (
		<div className="container text-danger">
			<Link to={ClientRouter.contacts}>
				<h4>Get back</h4>
			</Link>
			<div className="lead">
				{firstName} {lastName}
			</div>
			<VideoDialog _socket={socket} nickname={nickname} />
		</div>
	);
};

export default DialogHeader;
