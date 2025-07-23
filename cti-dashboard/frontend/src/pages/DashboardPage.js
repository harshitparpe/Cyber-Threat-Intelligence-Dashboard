import styled from "styled-components";
import ThreatFeed from "../components/Dashboard/ThreatFeed";

const StatCard = styled.div`
  background: #1e293b;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 238, 255, 0);
  color: white;
  width: 220px;
  text-align: center;
  transition: 0.2s;
  &:hover {
    box-shadow: 0 0 20px rgba(0, 238, 255, 0.3);
  }
`;

function DashboardPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <StatCard>
          <h4>Total Threats</h4>
          <p>145</p>
        </StatCard>
        <StatCard>
          <h4>Active IOCs</h4>
          <p>27</p>
        </StatCard>
        <StatCard>
          <h4>High-Risk IPs</h4>
          <p>13</p>
        </StatCard>
        <StatCard>
          <h4>New Today</h4>
          <p>8</p>
        </StatCard>
      </div>

      <ThreatFeed />
    </div>
  );
}

export default DashboardPage;
