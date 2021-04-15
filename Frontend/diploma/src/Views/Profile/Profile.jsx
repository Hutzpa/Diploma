import React, { Component } from "react";

class Profile extends Component {
	state = {
		user: {},
	};

	componentDidMount() {
		const { user } = this.props;
		this.setState({ user });
	}

	render() {
		const { user } = this.state;
		return (
			<h1>
				{user.firstName} {user.username}
			</h1>
		);
	}
}

export default Profile;
