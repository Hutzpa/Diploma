import React, { Component } from "react";

import Input from "../../Reusable/Input";
import ServerRouter from "../../Network/ServerRouter";
import SendReq from "../../Network/SendReq";

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
			<div>
				<h2>Register</h2>
				<form onSubmit={this.handleSubmit}>
					<Input
						name="firstName"
						value={account.firstName}
						onChange={this.handleChange}
						label="First name"
						inputType="text"
						placeholder="Your first name"
						error={errors.firstName}
						required={true}
					/>
					<Input
						name="lastName"
						value={account.lastName}
						onChange={this.handleChange}
						label="Last name"
						inputType="text"
						placeholder="Your last name"
						error={errors.lastName}
						required={true}
					/>
					<Input
						name="username"
						value={account.username}
						onChange={this.handleChange}
						label="Username"
						inputType="email"
						placeholder="Your email"
						error={errors.username}
						required={true}
					/>
					<Input
						name="password"
						value={account.password}
						onChange={this.handleChange}
						label="Password"
						inputType="password"
						error={errors.password}
						required={true}
					/>
					<button className="btn btn-primary">Register</button>
				</form>
			</div>
		);
	}
}

export default Register;
