const serverUrl = "http://localhost:4000/";

const ServerRouter = {
	auth: serverUrl + "auth/authenticate",
	register: serverUrl + "auth/register",
	users: serverUrl + "user",
	search: serverUrl + "request/search",
};

export default ServerRouter;
