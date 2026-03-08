import mongoose from "mongoose";
const schema = new mongoose.Schema({
  vehicleNumber:{type:String,required:true,uppercase:true,trim:true},
  ownerName:{type:String,required:true,trim:true},
  floor:{type:Number,required:true},
  zone:{type:String,required:true,uppercase:true,trim:true},
  slotNumber:{type:Number,required:true},
  branchId:{type:mongoose.Schema.Types.ObjectId,ref:"Branch",required:true},
  status:{type:String,enum:["BOOKED","USED","CANCELLED"],default:"BOOKED"}
},{timestamps:true});
export default mongoose.model("Booking", schema);
