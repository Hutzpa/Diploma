import React, { Component } from "react";
import ServerRouter from "../../Network/ServerRouter";
import SendReq from "./../../Network/SendReq";
import Picture from "./../../Reusable/Image";
import { Link } from "react-router-dom";
import ClientRouter from "./../../Network/ClientRouter";

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
		console.log(requests);
		return (
			<div>
				<table className="table table-striped lead">
					<tbody>
						{requests ? (
							requests.map((request) => {
								return (
									<tr key={request.SenderId}>
										<td>
											<Picture
												name={request.Sender.Photo}
												className="rounded"
												height="50"
												width="50"
											/>
										</td>
										<td>
											<Link to={ClientRouter.profile + `/${request.Sender.Id}`}>
												{request.Sender.FirstName}
											</Link>
										</td>
										<td>
											<label>{request.Sender.LastName}</label>
										</td>
										<td>
											<label>{request.Sender.Username}</label>
										</td>
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
												<button className="btn btn-success">Approve</button>
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
												<button className="btn btn-danger">Reject</button>
											</form>
										</td>
									</tr>
								);
							})
						) : (
							<h4>You have no contact requests</h4>
						)}
					</tbody>
				</table>
			</div>
		);
	}
}

export default ContactRequests;
