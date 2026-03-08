import ParkingSlot from "../models/ParkingSlot.js";
import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Booking.js";
import ParkingHistory from "../models/ParkingHistory.js";
import MinHeap from "../utils/MinHeap.js";
import { calculateParkingFee } from "../utils/feeCalculator.js";
import { getIO } from "../config/socket.js";
import { getBranchFilter } from "../utils/branchFilter.js";
import { sendReceiptEmail } from "../utils/sendReceiptEmail.js";
import { sendReceiptSms } from "../utils/sendReceiptSms.js";

const heapMap = new Map();
const getHeap = async (branchId) => {
  if(heapMap.has(String(branchId))) return heapMap.get(String(branchId));
  const heap = new MinHeap();
  const freeSlots = await ParkingSlot.find({ branchId, isOccupied:false, isBooked:false }).sort({ slotNumber:1 });
  freeSlots.forEach(s => heap.insert(s.slotNumber));
  heapMap.set(String(branchId), heap);
  return heap;
};

export const getDashboardStats = async (req,res) => {
  const filter = getBranchFilter(req);
  const totalSlots = await ParkingSlot.countDocuments(filter);
  const occupiedSlots = await ParkingSlot.countDocuments({ ...filter, isOccupied:true });
  const availableSlots = totalSlots - occupiedSlots;
  const totalVehicles = await Vehicle.countDocuments(filter);
  res.json({ totalSlots, occupiedSlots, availableSlots, totalVehicles });
};

export const getSlots = async (req,res) => {
  const slots = await ParkingSlot.find(getBranchFilter(req)).sort({ floor:1, zone:1, slotNumber:1 });
  res.json(slots);
};

export const getVehicles = async (req,res) => {
  const vehicles = await Vehicle.find(getBranchFilter(req)).sort({ createdAt:-1 });
  res.json(vehicles);
};

export const parkVehicle = async (req,res) => {
  try{
    const { vehicleNumber, ownerName, branchId, contactEmail="", contactPhone="" } = req.body;
    const selectedBranch = req.user.role==="SUPER_ADMIN" ? branchId : req.user.branchId;
    if(!selectedBranch) return res.status(400).json({message:"Branch is required"});

    const normalizedVehicle = vehicleNumber.trim().toUpperCase();
    const existing = await Vehicle.findOne({ branchId:selectedBranch, vehicleNumber:normalizedVehicle });
    if(existing) return res.status(400).json({message:"Vehicle already parked"});

    let slot = null;
    const booking = await Booking.findOne({ branchId:selectedBranch, vehicleNumber:normalizedVehicle, status:"BOOKED" });
    if(booking){
      slot = await ParkingSlot.findOne({ branchId:selectedBranch, slotNumber:booking.slotNumber });
      booking.status = "USED";
      await booking.save();
    } else {
      const heap = await getHeap(selectedBranch);
      const slotNumber = heap.extractMin();
      if(!slotNumber) return res.status(400).json({message:"Parking is full"});
      slot = await ParkingSlot.findOne({ branchId:selectedBranch, slotNumber });
    }

    if(!slot || slot.isOccupied) return res.status(400).json({message:"Unable to allocate slot"});

    slot.isOccupied = true;
    slot.vehicleNumber = normalizedVehicle;
    slot.isBooked = false;
    await slot.save();

    const vehicle = await Vehicle.create({
      vehicleNumber:normalizedVehicle,
      ownerName,
      slotNumber:slot.slotNumber,
      floor:slot.floor,
      zone:slot.zone,
      branchId:selectedBranch,
      contactEmail,
      contactPhone
    });

    await ParkingHistory.create({
      vehicleNumber:normalizedVehicle,
      ownerName,
      slotNumber:slot.slotNumber,
      floor:slot.floor,
      zone:slot.zone,
      branchId:selectedBranch,
      entryTime:vehicle.entryTime,
      receiptId:`RCPT-${Date.now()}`
    });

    getIO()?.emit("parkingUpdated", { type:"ENTRY", vehicleNumber:normalizedVehicle });
    res.status(201).json({ message:`Vehicle parked in slot ${slot.slotNumber}`, vehicle });
  }catch(error){
    res.status(500).json({message:"Vehicle parking failed", error:error.message});
  }
};

export const removeVehicle = async (req,res) => {
  try{
    const { vehicleNumber } = req.body;
    const normalizedVehicle = vehicleNumber.trim().toUpperCase();
    const vehicle = await Vehicle.findOne({ ...getBranchFilter(req), vehicleNumber:normalizedVehicle });
    if(!vehicle) return res.status(404).json({message:"Vehicle not found"});

    const slot = await ParkingSlot.findOne({ branchId:vehicle.branchId, slotNumber:vehicle.slotNumber });
    slot.isOccupied = false;
    slot.vehicleNumber = null;
    await slot.save();

    const heap = await getHeap(vehicle.branchId);
    heap.insert(slot.slotNumber);

    const exitTime = new Date();
    const { totalHours, fee } = calculateParkingFee(vehicle.entryTime, exitTime);
    const history = await ParkingHistory.findOne({ branchId:vehicle.branchId, vehicleNumber:normalizedVehicle, exitTime:null }).sort({ createdAt:-1 });

    const billing = {
      receiptId: history?.receiptId || `RCPT-${Date.now()}`,
      vehicleNumber:vehicle.vehicleNumber,
      ownerName:vehicle.ownerName,
      slotNumber:vehicle.slotNumber,
      floor:vehicle.floor,
      zone:vehicle.zone,
      entryTime:vehicle.entryTime,
      exitTime,
      totalHours,
      fee
    };

    if(history){
      history.exitTime = exitTime;
      history.totalHours = totalHours;
      history.fee = fee;
      await history.save();
    }

    await sendReceiptEmail({ to:vehicle.contactEmail, billing });
    await sendReceiptSms({ to:vehicle.contactPhone, billing });
    await Vehicle.deleteOne({ _id:vehicle._id });

    getIO()?.emit("parkingUpdated", { type:"EXIT", vehicleNumber:normalizedVehicle });
    res.json({ message:`Vehicle removed from slot ${slot.slotNumber}`, billing });
  }catch(error){
    res.status(500).json({message:"Vehicle removal failed", error:error.message});
  }
};

export const searchVehicle = async (req,res) => {
  const vehicle = await Vehicle.findOne({ ...getBranchFilter(req), vehicleNumber:req.params.vehicleNumber.trim().toUpperCase() });
  if(!vehicle) return res.status(404).json({message:"Vehicle not found"});
  res.json(vehicle);
};
