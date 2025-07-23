import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LookupPage from "./pages/IocLookupPage";
import IncidentPage from "./pages/IncidentPage";
import Sidebar from "./components/Shared/Sidebar";
import ThreatMapPage from "./pages/ThreatMapPage";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/lookup" element={<LookupPage />} />
            <Route path="/map" element={<ThreatMapPage />} />
            <Route path="/incidents" element={<IncidentPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
