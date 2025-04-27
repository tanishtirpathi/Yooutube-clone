import mongoose, { Schema } from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import jwt from "jsonwebtoken";
import bcrypt from "brcypt";
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
    coverimage: {
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
    this.password = bcrypt.hash(this.password, 8);
    next();
});

userschema.methods.isPasswordCorrect = async function (password) {
 return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userschema);
