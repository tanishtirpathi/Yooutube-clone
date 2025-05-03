import { AsyncHanddler } from "../utils/AsyncHanddler.js";

const registerUser = AsyncHanddler(async (req , res) => {
    //* get user detials form frontend 
    //* validations
    //*check if user is exist already :username / E-mails 
    //*check about images
    //*upload them to cloudnary
    //*double ckeck the avtar 
    //* create user object
    //* check entry in db 
    //*remove password and refresh token feild from response 
    //* check for user creation 
    //*return response  


const {fullname , username , email , password} = req.body
console.log(` username :${username}`)
console.log(` fullname  :${fullname}`)
console.log(` email :${email}`)
console.log(` password :${password}`)
})
export {registerUser}