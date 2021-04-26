const serverUrl = "http://localhost:4000/";

const ServerRouter = {
	auth: serverUrl + "auth/authenticate",
	register: serverUrl + "auth/register",
	search: serverUrl + "request/search",
	contactRequest: serverUrl + "request/send",
	specificUser: serverUrl + "user/getUser/?id=",
};

export default ServerRouter;
