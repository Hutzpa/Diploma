import React from "react";
import { Link } from "react-router-dom";
import ClientRouter from "./../../Network/ClientRouter";

const Navbar = ({ user }) => {
	return (
		<nav>
			<div className="navbar-nav">
				<label>Navbar</label>

				{!user && (
					<React.Fragment>
						<Link to={ClientRouter.login}> Login</Link>
						<Link to={ClientRouter.register}>Register </Link>
					</React.Fragment>
				)}
				{user && (
					<React.Fragment>
						<Link className="nav-item nav-link" to={ClientRouter.home}>
							Home
						</Link>
						<Link to={ClientRouter.search}>Search</Link>
						<Link to={ClientRouter.requests}>Requests</Link>
						<Link to={ClientRouter.contacts}>Contacts</Link>
						<Link to={ClientRouter.profile}>Welcome {user.firstName}</Link>
						<Link to={ClientRouter.logout}>Logout</Link>
					</React.Fragment>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
