// requare dotenv . con ag pat .
import dotenv from "dotenv"
import { app } from "./app.js"
import connectDB from "./db/index.js"

dotenv. config({
    path:'./env'
})

connectDB()
.then(()=>
{
  app.listen(process.env.PORT ||7000 ,()=>{
console.log(`server is running here :   : ${process.env.PORT || 7000}`)
  })
})
.catch((err)=>{
  console.log("MONGO DB connnection failed bro now what to do", err)
})

//! it is for when you have to do the work in the same file it is the first way to do this 
/*
const app = express()
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    app.on("ERROR",(error)=>{
        console.log(`error ${error}`)
        throw error 
    })
    app.listen(process.env.PORT , ()=>{
        console.log( `app is listening on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.error("ERORR:", error);
    throw error
  }
})();
*/