class response {
	status;
	message;
	data;

	constructor(obj) {
		this.status = obj.status ? obj.status : "Success";
		this.message = obj.message ? obj.message : "";
		this.data = obj.data ? obj.data : {};
	}
}

export default response;