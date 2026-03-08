import mongoose from "mongoose";
const schema = new mongoose.Schema({
  vehicleNumber:{type:String,required:true,uppercase:true,trim:true},
  ownerName:{type:String,required:true,trim:true},
  slotNumber:{type:Number,required:true},
  floor:{type:Number,required:true},
  zone:{type:String,required:true,uppercase:true,trim:true},
  branchId:{type:mongoose.Schema.Types.ObjectId,ref:"Branch",required:true},
  entryTime:{type:Date,required:true},
  exitTime:{type:Date,default:null},
  totalHours:{type:Number,default:0},
  fee:{type:Number,default:0},
  paymentStatus:{type:String,enum:["PENDING","PAID"],default:"PENDING"},
  receiptId:{type:String,default:""}
},{timestamps:true});
export default mongoose.model("ParkingHistory", schema);
