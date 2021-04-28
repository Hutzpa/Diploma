import React, { Component } from "react";
import { Link } from "react-router-dom";
import ClientRouter from "../../Network/ClientRouter";
import ServerRouter from "../../Network/ServerRouter";
import Input from "../../Reusable/Input";
import SendReq from "./../../Network/SendReq";

class Search extends Component {
	state = {
		params: { query: "" },
		matches: [],
	};

	componentDidMount() {
		this.setState({ user: this.props.user });
	}

	handleChange = async ({ currentTarget: input }) => {
		const params = { ...this.state.params };
		params[input.name] = input.value;
		this.setState({ params });

		let { data: matches } = await SendReq.post(
			ServerRouter.search,
			this.state.params
		);
		this.setState({ matches });
	};

	addToContacts = async (e, id) => {
		e.preventDefault();
		const { user } = this.state;
		console.log(`Sender - ${user.id}`);
		console.log(`Reciever id - ${id}`);
		const obj = {
			SenderId: user.id,
			ReceiverId: id,
		};
		let result = await SendReq.post(ServerRouter.contactRequest, obj);
		console.log(result);
		if (result.status === 200) alert("Sended");
	};

	render() {
		const { matches } = this.state;
		const { params } = this.state;
		return (
			<div>
				<Input
					name="query"
					value={params.query}
					onChange={this.handleChange}
					inputType="text"
					placeholder="User you are looking for..."
					maxLength={15}
				/>
				<table>
					<tbody>
						{matches &&
							matches.map((user) => {
								return (
									<tr key={user.id}>
										<td>{/* photo */}</td>
										<td>
											<Link to={ClientRouter.profile + `/${user.id}`}>
												{user.lastName}
											</Link>
										</td>
										<td>
											<form onSubmit={(e) => this.addToContacts(e, user.id)}>
												<input type="submit" value="Add to contacts" />
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

export default Search;
