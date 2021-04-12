import React, { Component } from "react";
import Joi from "joi-browser";

import Input from "../../Reusable/Input";

class Login extends Component {
	state = {
		account: { username: "", password: "" },
		errors: {},
	};

	schema = {
		username: Joi.string().required(),
		password: Joi.string().required(),
	};

	handleSubmit = (e) => {
		e.preventDefault();
		console.log("SUbmitted");

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;
		//call the server and redirect user
	};

	validate = () => {
		var result = Joi.validate(this.state.account, this.schema, {
			abortEarly: false,
		});

		if (!result.error) return null;

		const errors = {};
		for (let item of result.error.details) errors[item.path[0]] = item.message;
		return errors;
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
				<h1>Login</h1>

				<form onSubmit={this.handleSubmit}>
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
					<button className="btn btn-primary">Log in</button>
				</form>
			</div>
		);
	}
}

export default Login;
