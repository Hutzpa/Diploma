import React from "react";
import { Link } from "react-router-dom";
import ClientRouter from "./../../Network/ClientRouter";

const Navbar = ({ user }) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link className="navbar-brand" to={ClientRouter.contacts}>
				Holoserv
			</Link>
			<div className="collapse navbar-collapse">
				{user ? (
					<ul className="navbar-nav">
						<li className="nav-item active">
							<Link className="nav-link" to={ClientRouter.contacts}>
								Contacts
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to={ClientRouter.search}>
								Search
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to={ClientRouter.requests}>
								Requests
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link text-info" to={ClientRouter.profile}>
								Welcome {user.firstName}
							</Link>
						</li>

						<li className="nav-item">
							<Link className="nav-link" to={ClientRouter.logout}>
								Logout
							</Link>
						</li>
					</ul>
				) : (
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link" to={ClientRouter.login}>
								Login
							</Link>
						</li>
						<li>
							<Link className="nav-link" to={ClientRouter.register}>
								Register
							</Link>
						</li>
					</ul>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
