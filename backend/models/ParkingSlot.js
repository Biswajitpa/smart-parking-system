import mongoose from "mongoose";
const schema = new mongoose.Schema({
  slotNumber:{type:Number,required:true},
  floor:{type:Number,required:true},
  zone:{type:String,required:true,uppercase:true,trim:true},
  branchId:{type:mongoose.Schema.Types.ObjectId,ref:"Branch",required:true},
  isOccupied:{type:Boolean,default:false},
  vehicleNumber:{type:String,default:null},
  isBooked:{type:Boolean,default:false}
},{timestamps:true});
schema.index({branchId:1,slotNumber:1},{unique:true});
export default mongoose.model("ParkingSlot", schema);
