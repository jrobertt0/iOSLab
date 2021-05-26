class response {
    status;
    message;
    data;

    constructor(status = "Success", message = "", data = null){
        this.status = status;
        this.message = message;
        this.data = data
    }
}