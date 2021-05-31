import React from "react";
import { Link } from "react-router-dom";
import ClientRouter from "./../../Network/ClientRouter";

const Navbar = ({ user }) => {
	return (
		<nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
			<div className="container">
				<Link className="navbar-brand" to={ClientRouter.contacts}>
					Holoserv
				</Link>
				<div className="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
					<ul className="navbar-nav flex-grow-1">
						{!user && (
							<React.Fragment>
								<li className="nav-item">
									<Link className="nav-link text-dark" to={ClientRouter.login}>
										{" "}
										Login
									</Link>
								</li>
								<li>
									<Link
										className="nav-link text-dark"
										to={ClientRouter.register}
									>
										Register{" "}
									</Link>
								</li>
							</React.Fragment>
						)}
						{user && (
							<React.Fragment>
								<li className="nav-item">
									<Link className="nav-link text-dark" to={ClientRouter.search}>
										Search
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link text-dark"
										to={ClientRouter.requests}
									>
										Requests
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link text-dark"
										to={ClientRouter.contacts}
									>
										Contacts
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link text-info"
										to={ClientRouter.profile}
									>
										Welcome {user.firstName}
									</Link>
								</li>

								<li className="nav-item">
									<Link className="nav-link text-dark" to={ClientRouter.logout}>
										Logout
									</Link>
								</li>
							</React.Fragment>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
