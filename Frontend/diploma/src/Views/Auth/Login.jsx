import React, { Component } from "react";
import Joi from "joi-browser";

import Input from "../../Reusable/Input";
import ServerRouter from "../../Network/ServerRouter";
import SendReq from "../../Network/SendReq";
import ClientRouter from "./../../Network/ClientRouter";

class Login extends Component {
	state = {
		account: { username: "", password: "" },
		errors: {},
	};

	schema = {
		username: Joi.string().required(),
		password: Joi.string().required(),
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		console.log("SUbmitted");

		try {
			let { data } = await SendReq.post(ServerRouter.auth, this.state.account);
			localStorage.setItem("JWT", data.token);
			window.location = ClientRouter.home;
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = ex.response.data.message;
				this.setState({ errors });
			}
		}
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
			<form onSubmit={this.handleSubmit}>
				<table align="center">
					<h4 className="lead">Authentication</h4>
					<tr>
						<td>
							<Input
								classNameInput="mb-2 mt-2 form-control"
								classNameLabel="mb-2 mt-2 lead"
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
						<td>
							<Input
								classNameInput="mb-2 mt-2 form-control"
								classNameLabel="mb-2 mt-2 lead"
								name="password"
								value={account.password}
								onChange={this.handleChange}
								label="Password"
								inputType="password"
								placeholder="Your password"
								error={errors.password}
								required={true}
							/>
						</td>
					</tr>
					<tr>
						<td>
							<button className="btn btn-success mb-2 mt-2">Log in</button>
						</td>
					</tr>
				</table>
			</form>
		);
	}
}

export default Login;
