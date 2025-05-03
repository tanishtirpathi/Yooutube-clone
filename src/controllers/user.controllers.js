import { AsyncHanddler } from "../utils/AsyncHanddler.js";
import {Apierror} from "../utils/APIerror.js"
import {User} from "../modals/user.modal.js"
import {uploadOnCloudinary} from "../utils/cloudnary.js"
import {APIresp} from "../utils/APIresp.js"
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
if (
    [fullname, username,    email , password].some((field)=>field?.trim()==="" )
) {
    throw new Apierror(400 ," fullname is requred ")
    
}
const existUser = User.findOne(
    {$or:[{email}, {username}]}
)

if(existUser){
throw new Apierror(409 ,"user with same email and username is already exist ")
}

const avatarLocalPath = req.flies?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;
if (!avatarLocalPath) {
    throw new Apierror(400 , "image not found ")
} 
const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)
if (!avatar) {
    throw new Apierror(400 , "image not found ")
}

const user = await User.create({
    fullname,
    avatar:avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()

})
 const createdUser = await User.findById(user._id).select(
    "-password - refreshToken "
 )
 if(!createdUser){
    throw new Apierror(500 , "something went wrong in server ")
 }

 return res.status(201).json(
    APIresp(200, createdUser , "user registore bro tune kar liya ")
 )
})
export {registerUser}