import React, { Component } from "react";
import SendReq from "../../Network/SendReq";
import ServerRouter from "./../../Network/ServerRouter";
import Picture from "./../../Reusable/Image";

class Profile extends Component {
	state = {
		currentUser: {},
		askedUser: {},
		photo: {},
		photoName: "",
	};

	async componentDidMount() {
		const { user: currentUser } = this.props;
		this.setState({ currentUser });
		if (this.props.match.params.id) {
			try {
				let { data: askedUser } = await SendReq.get(
					ServerRouter.specificUser + this.props.match.params.id
				);
				this.setState({ askedUser });
			} catch (ex) {
				if (ex.response && ex.response.status === 400) {
				}
			}
		}
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		const { currentUser } = this.state;
		const { askedUser } = this.state;
		try {
			let response = await SendReq.post(ServerRouter.contactRequest, {
				SenderId: currentUser.id,
				ReceiverId: askedUser.id,
			});
			if (response.status === 200) {
				alert("Success");
				window.location.reload();
			}
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
			}
		}
	};

	addProfilePhoto = async (e) => {
		e.preventDefault();
		const { photo } = this.state;
		const { photoName } = this.state;
		const formData = new FormData();
		formData.append("formFile", photo);
		formData.append("fileName", photoName);
		await SendReq.post(ServerRouter.setProfilePicture, formData);
		alert("Profile photo will change after relogin");
	};
	handleFileSelect = (e) => {
		this.setState({ photo: e.target.files[0] });
		this.setState({ photoName: e.target.files[0].name });
	};

	render() {
		const { currentUser } = this.state;
		const { askedUser } = this.state;
		console.log("askedUser");
		console.log(askedUser);
		console.log("currentUser");
		console.log(currentUser);
		return (
			<div>
				<div>
					<Picture
						name={currentUser.Photo}
						className="rounded"
						height="150"
						width="150"
					/>
				</div>
				{!this.props.match.params.id ? (
					<div>
						<form
							onSubmit={this.addProfilePhoto}
							encType="multipart/form-data"
							method="post"
						>
							<input
								className="form-control-file"
								type="file"
								accept="image/*"
								name="photo"
								id="photo"
								onChange={this.handleFileSelect}
								required
							/>

							<input
								className="btn btn-outline-success form-control"
								type="submit"
								value="grgergre"
							/>
						</form>
					</div>
				) : (
					<div></div>
				)}

				<h4>Отпрвка запросов пользователю</h4>
				{Object.keys(askedUser).length !== 0 && (
					<div>
						{parseInt(askedUser.id) == parseInt(currentUser.id) ? (
							""
						) : (
							<form onSubmit={this.handleSubmit}>
								<button
									disabled={askedUser.requestDisabled}
									className="btn btn-primary"
								>
									Send contact request
								</button>
							</form>
						)}
					</div>
				)}
			</div>
		);
	}
}

export default Profile;
