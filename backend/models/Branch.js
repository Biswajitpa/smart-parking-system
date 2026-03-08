import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name:{type:String,required:true,trim:true},
  code:{type:String,required:true,unique:true,uppercase:true,trim:true},
  address:{type:String,required:true,trim:true}
},{timestamps:true});
export default mongoose.model("Branch", schema);
