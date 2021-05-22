import React, { Component } from "react";
import SendReq from "./../../Network/SendReq";
import ServerRouter from "./../../Network/ServerRouter";
import ClientRouter from "./../../Network/ClientRouter";

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

	render() {
		const { contacts } = this.state;
		return (
			<div>
				<table>
					<tbody>
						{contacts &&
							contacts.map((contacts) => {
								return (
									<tr key={contacts.Id}>
										<td>{contacts.FirstName}</td>
										<td>{contacts.LastName}</td>
										<td>{contacts.Username}</td>
										<td>
											<form onSubmit={(e) => this.handleSubmit(e, contacts.Id)}>
												<button>Dialog</button>
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

export default Contacts;
