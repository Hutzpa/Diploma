import React, { Component } from "react";
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

	addToContacts = (e, id) => {
		e.preventDefault();

		console.log(this.state.user);
		console.log(id);
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
										<td>{user.lastName}</td>
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
