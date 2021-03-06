import React, { Component } from "react";
import { Link } from "react-router-dom";
import ClientRouter from "./../../Network/ClientRouter";
import VideoDialog from "./VideoDialog";

const DialogHeader = ({ firstName, lastName }) => {
	return (
		<div className="container lead">
			<Link to={ClientRouter.contacts}>
				<h4>Get back</h4>
			</Link>
			<div className="lead">
				Dialog with with {firstName} {lastName}. Your video -
			</div>
		</div>
	);
};

export default DialogHeader;
