import ParkingSlot from "../models/ParkingSlot.js";

export const initializeLayout = async (req,res) => {
  try{
    const { branchId, floors=2, zonesPerFloor=["A","B"], slotsPerZone=5 } = req.body;
    if(!branchId) return res.status(400).json({message:"branchId is required"});

    await ParkingSlot.deleteMany({ branchId });
    const slots = [];
    let slotCounter = 1;

    for(let floor=1; floor<=Number(floors); floor++){
      for(const zone of zonesPerFloor){
        for(let i=0; i<Number(slotsPerZone); i++){
          slots.push({ branchId, slotNumber:slotCounter++, floor, zone, isOccupied:false, vehicleNumber:null, isBooked:false });
        }
      }
    }

    await ParkingSlot.insertMany(slots);
    res.status(201).json({message:"Layout initialized successfully", count:slots.length});
  }catch(error){
    res.status(500).json({message:"Failed to initialize layout", error:error.message});
  }
};
