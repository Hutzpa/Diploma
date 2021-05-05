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
};

export default ServerRouter;
