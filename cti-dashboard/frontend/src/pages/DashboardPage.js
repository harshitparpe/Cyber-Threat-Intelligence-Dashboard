import ThreatStats from "../components/Dashboard/ThreatStats";
import ThreatFeed from "../components/Dashboard/ThreatFeed";

function DashboardPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <ThreatStats />
      <ThreatFeed />
    </div>
  );
}

export default DashboardPage;
