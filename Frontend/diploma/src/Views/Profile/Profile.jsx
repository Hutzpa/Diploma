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
		return (
			<div>
				<div>
					<Picture
						name={currentUser.photo}
						className="rounded"
						height="150"
						width="150"
					/>
				</div>
				<h4>Установка фото</h4>
				<form
					onSubmit={this.addProfilePhoto}
					enctype="multipart/form-data"
					method="post"
				>
					<input
						className="form-control-file"
						type="file"
						accept="image/*"
						name="photo"
						//value={this.state.photo}
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
				<h4>Отпрвка запросов пользователю</h4>
				{Object.keys(askedUser).length !== 0 && (
					<div>
						{askedUser.id == currentUser.id ? (
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
