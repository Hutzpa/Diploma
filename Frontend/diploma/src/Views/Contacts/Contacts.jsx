import React, { Component } from "react";
import SendReq from "./../../Network/SendReq";
import ServerRouter from "./../../Network/ServerRouter";

class Contacts extends Component {
	state = {
		contacts: [],
	};

	async componentDidMount() {
		this.setState({ user: this.props.user });
		const { data: contacts } = await SendReq.get(ServerRouter.contacts);
		this.setState({ contacts });
		console.log(this.state.contacts);
	}

	render() {
		const { contacts } = this.state;
		return (
			<div>
				<table>
					<tbody>
						{contacts &&
							contacts.map((contacts) => {
								return (
									<tr key={contacts.SenderId}>
										<td>{contacts.Sender.FirstName}</td>
										<td>{contacts.Sender.LastName}</td>
										<td>{contacts.Sender.Username}</td>
										<td>{/* Имя контакта */}</td>
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
