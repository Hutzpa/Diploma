const serverUrl = "http://localhost:4000/";

const ServerRouter = {
	auth: serverUrl + "auth/authenticate",
	register: serverUrl + "auth/register",
	search: serverUrl + "request/search",
	contactRequest: serverUrl + "request/send",
	specificUser: serverUrl + "user/getUser/?id=",
	requests: serverUrl + "request/requests",
	replyOnRequest: serverUrl + "request/decide",
	contacts: serverUrl + "contacts",
	chat: serverUrl + "chat/getDialog",
	getCompanionName: serverUrl + "chat/GetCompanionName",
	saveMessage: serverUrl + "chat/SaveMessage",
	getMessages: serverUrl + "chat/GetMessages",
	setProfilePicture: serverUrl + "profile/setProfilePicture",
	avatar: serverUrl + "/content/photos/",
	getPhoto: serverUrl + "user/getUserPhoto",
	deleteContact: serverUrl + "contacts/deleteContact",
};

export default ServerRouter;
