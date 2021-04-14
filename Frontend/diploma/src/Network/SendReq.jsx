import Axios from "axios";

Axios.defaults.headers.common["Authorization"] = localStorage.getItem("JWT");

const SendReq = {
	get: Axios.get,
	post: Axios.post,
	put: Axios.put,
	patch: Axios.patch,
	delete: Axios.delete,
};

export default SendReq;
