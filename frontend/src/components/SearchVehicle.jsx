import { useState } from "react";
function SearchVehicle({ onSearch, result }) {
  const [vehicleNumber, setVehicleNumber] = useState("");
  return (
    <div className="panel">
      <div className="panel-title"><h2>Search Vehicle</h2></div>
      <div className="search-row">
        <input value={vehicleNumber} onChange={(e)=>setVehicleNumber(e.target.value)} placeholder="Vehicle Number" />
        <button className="secondary-btn" onClick={() => onSearch(vehicleNumber)}>Search</button>
      </div>
      {result && (
        <div className="search-result">
          <p><strong>Vehicle:</strong> {result.vehicleNumber}</p>
          <p><strong>Owner:</strong> {result.ownerName}</p>
          <p><strong>Slot:</strong> {result.slotNumber}</p>
          <p><strong>Floor / Zone:</strong> {result.floor} / {result.zone}</p>
        </div>
      )}
    </div>
  );
}
export default SearchVehicle;
