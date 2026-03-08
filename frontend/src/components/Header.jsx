import { FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

function Header({ user, onLogout }) {
  const { dark, setDark } = useTheme();
  return (
    <div className="header">
      <div>
        <h1>Smart Parking Management</h1>
        <p>{user?.role} Dashboard</p>
      </div>
      <div className="header-actions">
        <button className="secondary-btn" onClick={() => setDark(!dark)}>{dark ? <FaSun/> : <FaMoon/>}</button>
        <button className="danger-btn" onClick={onLogout}><FaSignOutAlt/> Logout</button>
      </div>
    </div>
  );
}
export default Header;
