import React, { Component } from "react";
import ServerRouter from "../../Network/ServerRouter";
import SendReq from "./../../Network/SendReq";

class ContactRequests extends Component {
	state = {
		requests: [],
	};

	async componentDidMount() {
		this.setState({ user: this.props.user });
		const { data: requests } = await SendReq.get(ServerRouter.requests);
		this.setState({ requests });
	}

	reply = async (e, senderId, receiverId, approved) => {
		e.preventDefault();
		await SendReq.post(ServerRouter.replyOnRequest, {
			SenderId: senderId,
			ReceiverId: receiverId,
			Approved: approved,
		});
	};

	render() {
		const { requests } = this.state;
		return (
			<div>
				<table>
					<tbody>
						{requests &&
							requests.map((request) => {
								return (
									<tr key={request.SenderId}>
										<td>{/* фото отправителя */}</td>
										<td>{/* Имя фамилия */}</td>
										<td>
											<form
												onSubmit={(e) =>
													this.reply(
														e,
														request.SenderId,
														request.ReceiverId,
														true
													)
												}
											>
												<button>Approve</button>
											</form>
										</td>
										<td>
											<form
												onSubmit={(e) =>
													this.reply(
														e,
														request.SenderId,
														request.ReceiverId,
														false
													)
												}
											>
												<button>Reject</button>
											</form>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default ContactRequests;
