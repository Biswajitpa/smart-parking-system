function StatsCards({ stats }) {
  const items = [
    { label:"Total Slots", value:stats.totalSlots||0, klass:"blue" },
    { label:"Occupied", value:stats.occupiedSlots||0, klass:"red" },
    { label:"Available", value:stats.availableSlots||0, klass:"green" },
    { label:"Vehicles", value:stats.totalVehicles||0, klass:"purple" }
  ];
  return (
    <div className="stats-grid">
      {items.map(item => (
        <div key={item.label} className={`card ${item.klass}`}>
          <h3>{item.label}</h3>
          <h2>{item.value}</h2>
        </div>
      ))}
    </div>
  );
}
export default StatsCards;
