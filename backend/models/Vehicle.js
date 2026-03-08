import mongoose from "mongoose";
const schema = new mongoose.Schema({
  vehicleNumber:{type:String,required:true,uppercase:true,trim:true},
  ownerName:{type:String,required:true,trim:true},
  slotNumber:{type:Number,required:true},
  floor:{type:Number,required:true},
  zone:{type:String,required:true,uppercase:true,trim:true},
  branchId:{type:mongoose.Schema.Types.ObjectId,ref:"Branch",required:true},
  entryTime:{type:Date,default:Date.now},
  contactEmail:{type:String,default:""},
  contactPhone:{type:String,default:""}
},{timestamps:true});
schema.index({branchId:1,vehicleNumber:1},{unique:true});
export default mongoose.model("Vehicle", schema);
