import React, { Component } from "react";
import { Link } from "react-router-dom";
import ClientRouter from "./../../Network/ClientRouter";

const Navbar = ({ user }) => {
	return (
		<nav>
			<div className="navbar-nav">
				<label>Navbar</label>

				<Link className="nav-item nav-link" to={ClientRouter.home}>
					Home
				</Link>
				{!user && (
					<React.Fragment>
						<Link to={ClientRouter.login}> Login</Link>
						<Link to={ClientRouter.register}>Register </Link>
					</React.Fragment>
				)}
				{user && (
					<React.Fragment>
						<Link to={ClientRouter.profile}>{user.firstName}</Link>
						<Link to={ClientRouter.logout}>Logout</Link>
					</React.Fragment>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
