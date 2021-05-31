import React, { Component } from "react";

import Input from "../../Reusable/Input";
import ServerRouter from "../../Network/ServerRouter";
import SendReq from "../../Network/SendReq";
import ClientRouter from "./../../Network/ClientRouter";

class Register extends Component {
	state = {
		account: { firstName: "", lastName: "", username: "", password: "" },
		errors: {},
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const result = await SendReq.post(
				ServerRouter.register,
				this.state.account
			);
			this.props.history.push(ClientRouter.login);
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = ex.response.data.message;
				this.setState({ errors });
			}
		}
	};

	handleChange = ({ currentTarget: input }) => {
		const account = { ...this.state.account };
		account[input.name] = input.value;
		this.setState({ account });
	};

	render() {
		const { account } = this.state;
		const { errors } = this.state;
		return (
			<form
				onSubmit={this.handleSubmit}
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<table aling="text-center">
					<h4 className="lead">Registration</h4>
					<tr>
						{/* <tr className="row justify-content-center"> */}
						<td>
							<Input
								classNameInput=" form-control"
								classNameLabel=" lead"
								name="firstName"
								value={account.firstName}
								onChange={this.handleChange}
								label="First name"
								inputType="text"
								placeholder="Your first name"
								error={errors.firstName}
								required={true}
							/>
						</td>
					</tr>
					<tr>
						{/* <tr className="row justify-content-center"> */}
						<td>
							<Input
								classNameInput=" form-control"
								classNameLabel=" lead"
								name="lastName"
								value={account.lastName}
								onChange={this.handleChange}
								label="Last name"
								inputType="text"
								placeholder="Your last name"
								error={errors.lastName}
								required={true}
							/>
						</td>
					</tr>
					<tr>
						{/* <tr className="row justify-content-center"> */}
						<td>
							<Input
								classNameInput=" form-control"
								classNameLabel=" lead"
								name="username"
								value={account.username}
								onChange={this.handleChange}
								label="Username"
								inputType="email"
								placeholder="Your email"
								error={errors.username}
								required={true}
							/>
						</td>
					</tr>
					<tr>
						{/* <tr className="row justify-content-center"> */}
						<td>
							<Input
								classNameInput=" form-control"
								classNameLabel=" lead"
								name="password"
								value={account.password}
								onChange={this.handleChange}
								label="Password"
								inputType="password"
								error={errors.password}
								required={true}
								placeholder="Your password"
							/>
						</td>
					</tr>
					<tr>
						{/* <tr className="row justify-content-center"> */}
						<td>
							<button className="btn btn-success ">Register</button>
						</td>
					</tr>
				</table>
			</form>
		);
	}
}

export default Register;
