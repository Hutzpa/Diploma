import React, { Component } from "react";
import SendReq from "./../../Network/SendReq";
import ServerRouter from "./../../Network/ServerRouter";
import ClientRouter from "./../../Network/ClientRouter";
import Picture from "./../../Reusable/Image";
import { Link } from "react-router-dom";

class Contacts extends Component {
	state = {
		contacts: [],
	};

	async componentDidMount() {
		this.setState({ user: this.props.user });
		const { data: contacts } = await SendReq.get(ServerRouter.contacts);
		this.setState({ contacts });
	}

	handleSubmit = async (e, id) => {
		e.preventDefault();
		const { data } = await SendReq.post(ServerRouter.chat, {
			User1: parseInt(this.state.user.id),
			User2: id,
		});
		this.props.history.push(`${ClientRouter.chatroom}/${data.Id}`);
	};
	handleDelete = async (e, id) => {
		e.preventDefault();
		await SendReq.post(ServerRouter.deleteContact, {
			ContactId: id,
		});
		window.location.reload();
	};

	render() {
		const { contacts } = this.state;
		return (
			<div>
				<table className="table table-striped lead">
					<tbody>
						{contacts.length > 0 ? (
							contacts.map((contacts) => {
								return (
									<tr key={contacts.Id}>
										<td>
											<Picture
												name={contacts.Photo}
												className="rounded"
												height="50"
												width="50"
											/>
										</td>
										<td>
											<Link to={ClientRouter.profile + `/${contacts.Id}`}>
												{contacts.FirstName}
											</Link>
										</td>
										<td>{contacts.LastName}</td>
										<td>{contacts.Username}</td>
										<td>
											<form onSubmit={(e) => this.handleSubmit(e, contacts.Id)}>
												<button className="btn btn-info">Dialog</button>
											</form>
										</td>
										<td>
											<form onSubmit={(e) => this.handleDelete(e, contacts.Id)}>
												<button className="btn btn-danger">
													Delete contact
												</button>
											</form>
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td>
									<h5 className="lead text-center">You have no contacts</h5>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Contacts;
