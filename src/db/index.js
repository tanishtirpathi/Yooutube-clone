<<<<<<< HEAD
import mongoose, { connect } from "mongoose";
import DB_NAME from "../constants.js";


const connectDB = async()=>{
    try {
        const connectionIN = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB is connected ya bro you did it !! DB host is running :${connectionIN.connection.host}`)
    } catch (error) {
        console.log('error is :' , error)
        process.exit(1)
       
    }
}

export default connectDB;   
=======
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB;
>>>>>>> c7638e5a769d600d71617090368dc2a5290a7e12
