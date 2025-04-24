import mongoose, { connect } from "mongoose";
import DB_NAME from "../constants.js";


const connectDB = async()=>{
    try {
        const connectionIN = await mongoose.connect(`${process.env.MONGODB_URL}/ ${DB_NAME}`)
        console.log(`\n MongoDB is connected ya bro you did it !! DB host is running :${connectionIN.connection.host}`)
    } catch (error) {
        console.log('error is :' , error)
        process.exit(1)
       
    }
}

export default connectDB;   