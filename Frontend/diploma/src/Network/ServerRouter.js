const serverUrl = "http://localhost:4000/";

const ServerRouter = {
	auth: serverUrl + "auth/authenticate",
	register: serverUrl + "auth/register",
	users: serverUrl + "user",
};

export default ServerRouter;
