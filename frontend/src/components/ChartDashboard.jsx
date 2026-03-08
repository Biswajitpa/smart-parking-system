import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function ChartDashboard({ stats }) {
  const doughnutData = { labels:["Occupied","Available"], datasets:[{ data:[stats.occupiedSlots||0, stats.availableSlots||0] }] };
  const barData = { labels:["Total","Occupied","Available","Vehicles"], datasets:[{ label:"Parking Metrics", data:[stats.totalSlots||0, stats.occupiedSlots||0, stats.availableSlots||0, stats.totalVehicles||0] }] };
  return (
    <div className="panel">
      <div className="panel-title"><h2>Analytics</h2></div>
      <div className="charts-grid">
        <div className="chart-box"><Doughnut data={doughnutData}/></div>
        <div className="chart-box"><Bar data={barData}/></div>
      </div>
    </div>
  );
}
export default ChartDashboard;
