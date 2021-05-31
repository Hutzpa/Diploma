import React, { Component } from "react";
import { Link } from "react-router-dom";
import ClientRouter from "../../Network/ClientRouter";
import ServerRouter from "../../Network/ServerRouter";
import Input from "../../Reusable/Input";
import SendReq from "./../../Network/SendReq";
import Picture from "./../../Reusable/Image";

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

		let { data: matches } = await SendReq.post(ServerRouter.search, {
			Query: input.value,
		});
		this.setState({ matches });
	};

	// addToContacts = async (e, id) => {
	// 	e.preventDefault();
	// 	const { user } = this.state;
	// 	console.log(`Sender - ${user.id}`);
	// 	console.log(`Reciever id - ${id}`);
	// 	const obj = {
	// 		SenderId: user.id,
	// 		ReceiverId: id,
	// 	};
	// 	let result = await SendReq.post(ServerRouter.contactRequest, obj);
	// 	console.log(result);
	// 	if (result.status === 200) alert("Sended");
	// };

	render() {
		const { matches } = this.state;
		const { params } = this.state;
		return (
			<div
				className="container"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<div className="row">
					<Input
						name="query"
						value={params.query}
						onChange={this.handleChange}
						inputType="text"
						placeholder="User you are looking for..."
						maxLength={15}
					/>
				</div>
				<div className="row">
					<table className="table table-striped lead">
						<tbody>
							{matches.length > 0 ? (
								matches.map((user) => {
									return (
										<tr key={user.id}>
											<td>
												<Picture
													name={user.Photo}
													className="rounded"
													height="50"
													width="50"
												/>
											</td>
											<td>
												<Link to={ClientRouter.profile + `/${user.Id}`}>
													{user.FirstName}
												</Link>
											</td>
											<td>
												<label>{user.LastName}</label>
											</td>
											<td>
												<label>{user.Username}</label>
											</td>
											{/* <td>
												<form onSubmit={(e) => this.addToContacts(e, user.Id)}>
													<input
														className="btn btn-info"
														type="submit"
														value="Add to contacts"
													/>
												</form>
											</td> */}
										</tr>
									);
								})
							) : (
								<tr>
									<h4>Nothing been found</h4>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default Search;
