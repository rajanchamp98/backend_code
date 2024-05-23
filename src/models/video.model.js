import mongoose,{Schema} from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';



const videoSchema=new Schema({

    videoFile:{
        type:String, // cloudinary pe jayega ye and udhar se link milega
        required:true
    },
    thumbnail:{
        type:String,   // cloudinary pe jayega ye and udhar se link milega
        required:true
    },
    title:{
        type:String,
        required:true
    },
   description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    views:{
        type:Number,
        default:0,
        required:true
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }



},
{timeStamps:true})

videoSchema.plugin()



export const Video=mongoose.model("Video",videoSchema);



