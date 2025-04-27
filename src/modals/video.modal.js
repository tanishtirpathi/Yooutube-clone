import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const Videoschema = new Schema({
        videofile:{
            type:String,
            required:true
        },
        thumbnail:{
            type:String,
            required:true
        },
        tittle:{
            type:String,
            required:true
        },
        discription :{
            type:String,
            required:true
        },
        duration :{
            type:Number,
            required:true
        },
        views:{
            type:Number,
            default:0
        },
        Ispublish :{
            type:Boolean,
            default:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User "
        }
        
}
,{
    timestamps:true
});


Videoschema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video",Videoschema);
