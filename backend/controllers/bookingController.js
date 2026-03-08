import Booking from "../models/Booking.js";
import ParkingSlot from "../models/ParkingSlot.js";

export const createBooking = async (req,res) => {
  try{
    const { vehicleNumber, ownerName, floor, zone, branchId } = req.body;
    const selectedBranch = req.user.role==="SUPER_ADMIN" ? branchId : req.user.branchId;

    const slot = await ParkingSlot.findOne({
      branchId:selectedBranch,
      floor,
      zone:zone.toUpperCase(),
      isOccupied:false,
      isBooked:false
    }).sort({ slotNumber:1 });

    if(!slot) return res.status(404).json({message:"No free slot in selected floor/zone"});

    slot.isBooked = true;
    await slot.save();

    const booking = await Booking.create({
      vehicleNumber:vehicleNumber.toUpperCase(),
      ownerName,
      floor,
      zone:zone.toUpperCase(),
      slotNumber:slot.slotNumber,
      branchId:selectedBranch
    });

    res.status(201).json({message:"Booking created", booking});
  }catch(error){
    res.status(500).json({message:"Booking failed", error:error.message});
  }
};

export const getBookings = async (req,res) => {
  const filter = req.user.role==="SUPER_ADMIN" && req.query.branchId ? { branchId:req.query.branchId } : req.user.branchId ? { branchId:req.user.branchId } : {};
  const bookings = await Booking.find(filter).sort({ createdAt:-1 });
  res.json(bookings);
};
