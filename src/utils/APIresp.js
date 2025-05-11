class APIresp{
    constructor(statuscode, data , messag = 'success'){
        this.statuscode= statuscode
        this.data = data 
        this.messag= messag
        this.success = statuscode < 400
    }
}
export {APIresp}