import DashboardStats from "../components/Dashboard/DashboardStats";
import ThreatFeed from "../components/Dashboard/ThreatFeed";

function DashboardPage() {
  return (
    <div style={{ padding: "2rem 3rem", marginLeft: "1rem" }}>
      <h2 style={{ marginBottom: "1rem", color: "white" }}>
        Cyber Threat Intelligence Dashboard
      </h2>
      <DashboardStats />
      <ThreatFeed />
    </div>
  );
}

export default DashboardPage;
