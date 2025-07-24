import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LookupPage from "./pages/IocLookupPage";
import IncidentPage from "./pages/IncidentPage";
import ThreatMapPage from "./pages/ThreatMapPage";
import MitrePage from "./pages/MitrePage";
import Sidebar from "./components/Shared/Sidebar";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Footer from "./components/Shared/Footer";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route
              path="/login"
              element={
                <LoginForm onLogin={() => (window.location.href = "/")} />
              }
            />
            <Route path="/register" element={<RegisterForm />} />

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/lookup"
              element={
                <PrivateRoute>
                  <LookupPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/map"
              element={
                <PrivateRoute>
                  <ThreatMapPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/incidents"
              element={
                <PrivateRoute>
                  <IncidentPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/mitre"
              element={
                <PrivateRoute>
                  <MitrePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
