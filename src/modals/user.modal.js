import mongoose, { Schema } from "mongoose";

const userschema = new Schema({
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
},{
    timestamps:true
});

export const User = mongoose.model("User", userschema);
