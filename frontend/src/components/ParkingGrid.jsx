function ParkingGrid({ slots }) {
  return (
    <div className="panel">
      <div className="panel-title"><h2>Parking Slots</h2></div>
      <div className="parking-grid">
        {slots.map(slot => (
          <div key={slot._id} className={`slot-card ${slot.isOccupied ? "occupied" : slot.isBooked ? "booked" : "available"}`}>
            <h3>Slot {slot.slotNumber}</h3>
            <p>Floor {slot.floor} / Zone {slot.zone}</p>
            <span>{slot.isOccupied ? slot.vehicleNumber : slot.isBooked ? "Booked" : "Available"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ParkingGrid;
