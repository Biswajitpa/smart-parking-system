function VehicleTable({ vehicles, onRemove }) {
  return (
    <div className="panel">
      <div className="panel-title"><h2>Active Vehicles</h2></div>
      <div className="table-wrapper">
        <table className="vehicle-table">
          <thead><tr><th>Vehicle</th><th>Owner</th><th>Slot</th><th>Floor</th><th>Zone</th><th>Entry</th><th>Action</th></tr></thead>
          <tbody>
            {vehicles.length ? vehicles.map(v => (
              <tr key={v._id}>
                <td>{v.vehicleNumber}</td><td>{v.ownerName}</td><td>{v.slotNumber}</td><td>{v.floor}</td><td>{v.zone}</td>
                <td>{new Date(v.entryTime).toLocaleString()}</td>
                <td><button className="danger-btn" onClick={() => onRemove(v.vehicleNumber)}>Exit</button></td>
              </tr>
            )) : <tr><td colSpan="7" className="empty-state">No active vehicles</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default VehicleTable;
