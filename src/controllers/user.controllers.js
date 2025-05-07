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
    //!alll are done here 

    const { fullname, username, email, password } = req.body || {};
    console.log(` username :${username}`)
if (
    [fullname, username,    email , password].some((field)=>field?.trim()==="" )
) {
    throw new Apierror(400 ," fullname is requred ")
    
}
const existUser =await User.findOne(
    {$or:[{email}, {username}]}
)

if(existUser){
throw new Apierror(409 ,"user with same email and username is already exist ")
}
// Debug logging to understand incoming files
console.log("req.files:", req.files);

const avatarFiles = req.files?.avatar;
const coverImageFiles = req.files?.coverImage;

if (!Array.isArray(avatarFiles) || avatarFiles.length === 0) {
  throw new Apierror(408, "Avatar image not found", Apierror);
}
if (!Array.isArray(coverImageFiles) || coverImageFiles.length === 0) {
  throw new Apierror(408, "Cover image not found");
}

const avatarLocalPath = avatarFiles[0].path;
const coverImageLocalPath = coverImageFiles[0].path;

// Upload to Cloudinary
const avatar = await uploadOnCloudinary(avatarLocalPath);
const coverImage = await uploadOnCloudinary(coverImageLocalPath);

if (!avatar) {
  throw new Apierror(400, "Avatar image upload failed");
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
    "-password -refreshToken "
 )
 if(!createdUser){
    throw new Apierror(500 , "something went wrong in server ")
 }

 return res.status(201).json(
   new APIresp(200, createdUser , "user registore bro tune kar liya ")
 )
})
export {registerUser}