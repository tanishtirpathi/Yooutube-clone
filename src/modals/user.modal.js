import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
// Correct ES module syntax
import bcrypt from 'bcrypt';
const userschema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchistry: [
      {
        type: Schema.Types.ObjectId,
        ref: "video",
      },
    ],
    password: {
      type: String,
      required: [true, "password is required "],
    },
    refreshtoken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userschema.pre("save", async function (next) {
  if(!this.isModified("password"))return next()
    this.password = await bcrypt.hash(this.password, 8);
    next();
});
userschema.methods.isPasswordCorrect = async function (password) {
 return await bcrypt.compare(password, this.password)
}
userschema.methods.generateAccesstoken = async function () {
  jwt.sign({
    _jd:this._id,
    email:this.email,
    username:this.username,
    fullName:this.fullName
  },process.env.ACCCESS_TOKEN_SECRET,{
    expiresIn:process.env.ACCCESS_TOKEN_EXPIRY
  })
 }  
 userschema.methods.Refreshtoken = async function () {
  jwt.sign({
    _jd:this._id,
  },process.env.REFRESH_TOKEN_SECRET,{
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
  })
 }
 
 

export const User = mongoose.model("User", userschema,"users");
