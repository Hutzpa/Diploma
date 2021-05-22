import React, { Component } from "react";
import { Link } from "react-router-dom";
import ClientRouter from "./../../Network/ClientRouter";

const DialogHeader = ({ firstName, lastName }) => {
	return (
		<div>
			<Link to={ClientRouter.contacts}>
				<h4>Get back</h4>
			</Link>
			<div className="lead">
				{firstName} {lastName}
			</div>
		</div>
	);
};

export default DialogHeader;
