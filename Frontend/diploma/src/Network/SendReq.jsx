import Axios from "axios";

const SendReq = {
	get: Axios.get,
	post: Axios.post,
	put: Axios.put,
	patch: Axios.patch,
	delete: Axios.delete,
};

export default SendReq;
