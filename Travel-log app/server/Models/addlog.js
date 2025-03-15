import { Schema } from "mongoose";
import { model } from "mongoose";

const addlog=new Schema({
    // user:{type:String,required:true},
    logid:{type:String,required:true,unique:true},
    category:{type:String,required:true},
    placename:{type:String,required:true},
    dateoftravel:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:String,required:true},
    image:{type:String},
    favorite: { type: Boolean, default: true } ,
    email: {type: String,required: true},
    
    
})
const add=model('Logdetails',addlog)


export default add;