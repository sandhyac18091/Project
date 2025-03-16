import { Schema } from "mongoose";
import { model } from "mongoose";

const addlog=new Schema({
    
    
    category:{type:String,required:true},
    placename:{type:String,required:true},
    dateoftravel:{type:String,required:true},
    description:{type:String,required:true},
    rating:{type:String,required:true},
    image:{type:String},
    favorite: { type: Boolean, default: false } ,
    email: {type: String,required: true},
    
    
})
addlog.index({ placename: 1, dateoftravel: 1 }, { unique: true });
const add=model('Logdetails',addlog)


export default add;