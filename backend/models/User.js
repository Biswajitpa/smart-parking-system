import mongoose from "mongoose";
const schema = new mongoose.Schema({
  name:{type:String,required:true,trim:true},
  email:{type:String,required:true,unique:true,lowercase:true,trim:true},
  password:{type:String,required:true},
  role:{type:String,enum:["SUPER_ADMIN","ADMIN","STAFF"],default:"STAFF"},
  branchId:{type:mongoose.Schema.Types.ObjectId,ref:"Branch",default:null}
},{timestamps:true});
export default mongoose.model("User", schema);
