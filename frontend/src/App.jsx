import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import api from "./api/client";
import Login from "./components/Login";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import ChartDashboard from "./components/ChartDashboard";
import BranchLayoutForm from "./components/BranchLayoutForm";
import VehicleEntryForm from "./components/VehicleEntryForm";
import BookingForm from "./components/BookingForm";
import SearchVehicle from "./components/SearchVehicle";
import ParkingGrid from "./components/ParkingGrid";
import VehicleTable from "./components/VehicleTable";
import ReceiptCard from "./components/ReceiptCard";
import PaymentButton from "./components/PaymentButton";
import QrPassGenerator from "./components/QrPassGenerator";
import ReportPanel from "./components/ReportPanel";
import "./styles.css";

const socket = io((import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace("/api",""));

function App(){
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [stats, setStats] = useState({});
  const [slots, setSlots] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [branches, setBranches] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [billing, setBilling] = useState(null);
  const [message, setMessage] = useState("");

  const canManageReports = useMemo(() => ["SUPER_ADMIN","ADMIN"].includes(user?.role), [user]);

  const loadData = async () => {
    if(!user) return;
    try{
      const [statsRes, slotRes, vehicleRes, branchRes] = await Promise.all([
        api.get("/parking/stats"),
        api.get("/parking/slots"),
        api.get("/parking/vehicles"),
        api.get("/branches")
      ]);
      setStats(statsRes.data);
      setSlots(slotRes.data);
      setVehicles(vehicleRes.data);
      setBranches(branchRes.data);
    }catch(error){
      setMessage(error.response?.data?.message || "Failed to load data");
    }
  };

  useEffect(() => { loadData(); }, [user]);
  useEffect(() => {
    socket.on("parkingUpdated", loadData);
    return () => socket.off("parkingUpdated", loadData);
  }, [user]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const parkVehicle = async (payload) => {
    const { data } = await api.post("/parking/park", payload);
    setMessage(data.message);
    await loadData();
  };

  const removeVehicle = async (vehicleNumber) => {
    const { data } = await api.post("/parking/remove", { vehicleNumber });
    setBilling(data.billing);
    setMessage(data.message);
    await loadData();
  };

  const createBooking = async (payload) => {
    const { data } = await api.post("/bookings", payload);
    setMessage(data.message);
    await loadData();
  };

  const searchVehicle = async (vehicleNumber) => {
    try{
      const { data } = await api.get(`/parking/search/${vehicleNumber}`);
      setSearchResult(data);
    }catch{
      setSearchResult(null);
      setMessage("Vehicle not found");
    }
  };

  if(!user) return <Login onLogin={setUser} />;

  return (
    <div className="app-shell">
      <div className="main-container">
        <Header user={user} onLogout={logout} />
        {message && <div className="alert-box">{message}</div>}
        <StatsCards stats={stats} />
        <ChartDashboard stats={stats} />

        <div className="two-column-layout">
          <VehicleEntryForm branches={branches} user={user} onSubmit={parkVehicle} />
          <BookingForm branches={branches} user={user} onSubmit={createBooking} />
        </div>

        {["SUPER_ADMIN","ADMIN"].includes(user.role) && (
          <BranchLayoutForm branches={branches} onDone={loadData} />
        )}

        <div className="two-column-layout">
          <SearchVehicle onSearch={searchVehicle} result={searchResult} />
          <QrPassGenerator />
        </div>

        <ParkingGrid slots={slots} />
        <VehicleTable vehicles={vehicles} onRemove={removeVehicle} />

        <div className="two-column-layout">
          <ReceiptCard billing={billing} />
          <div className="panel">
            <div className="panel-title"><h2>Payment</h2></div>
            <PaymentButton billing={billing} onPaid={() => setMessage("Payment marked as successful")} />
          </div>
        </div>

        <ReportPanel canView={canManageReports} />
      </div>
    </div>
  );
}

export default App;
