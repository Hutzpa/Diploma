import React, { Component } from "react";
import SendReq from "../../Network/SendReq";
import ServerRouter from "./../../Network/ServerRouter";

class Profile extends Component {
	state = {
		currentUser: {},
		askedUser: {},
	};

	async componentDidMount() {
		const { user: currentUser } = this.props;
		this.setState({ currentUser });
		if (this.props.match.params.id) {
			try {
				let { data: askedUser } = await SendReq.get(
					ServerRouter.specificUser + this.props.match.params.id
				);
				this.setState({ askedUser });
			} catch (ex) {
				if (ex.response && ex.response.status === 400) {
				}
			}
		}
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		const { currentUser } = this.state;
		const { askedUser } = this.state;
		try {
			let response = await SendReq.post(ServerRouter.contactRequest, {
				SenderId: currentUser.id,
				ReceiverId: askedUser.id,
			});
			if (response.status === 200) {
				alert("Success");
				window.location.reload();
			}
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
			}
		}
	};

	render() {
		const { currentUser } = this.state;
		const { askedUser } = this.state;
		return (
			<div>
				{Object.keys(askedUser).length !== 0 && (
					<div>
						{askedUser.id == currentUser.id ? (
							""
						) : (
							<form onSubmit={this.handleSubmit}>
								<button
									disabled={askedUser.requestDisabled}
									className="btn btn-primary"
								>
									Send contact request
								</button>
							</form>
						)}
					</div>
				)}
			</div>
		);
	}
}

export default Profile;
