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
		// console.log(this.state.user);
		// console.log(this.state.contacts);
	}

	handleSubmit = async (e, id) => {
		e.preventDefault();
		console.log({
			User1: parseInt(this.state.user.id),
			User2: id,
		});
		const { data } = await SendReq.post(ServerRouter.chat, {
			User1: parseInt(this.state.user.id),
			User2: id,
		});
		console.log(data.Id);
		this.props.history.push(`${ClientRouter.chatroom}/id:${data.Id}`);
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
