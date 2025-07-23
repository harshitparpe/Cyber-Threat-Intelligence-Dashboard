import { useEffect, useState } from "react";
import { getThreatFeed } from "../../services/api";
import styled from "styled-components";

const Container = styled.div`
  background-color: #1e293b;
  border-radius: 12px;
  padding: 1rem 2rem;
  margin-top: 2rem;
  color: white;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0);
  &:hover {
    box-shadow: 0 0 20px rgba(0, 238, 255, 0.3);
  }
`;

const Title = styled.h3`
  color: rgba(0, 238, 255);
  text-shadow: 0 0 6px rgba(0, 238, 255, 0.3);
`;

const FeedItem = styled.div`
  background-color: #111827;
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Badge = styled.span`
  background-color: ${({ severity }) =>
    severity === "HIGH"
      ? "#ff4444"
      : severity === "MEDIUM"
      ? "#f59e0b"
      : "#22c55e"};
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.8rem;
  text-shadow: 0 0 5px white;
`;

function ThreatFeed() {
  const [feed, setFeed] = useState([]);

  const fetchFeed = async () => {
    const data = await getThreatFeed();
    setFeed(data);
  };

  useEffect(() => {
    fetchFeed();
    const interval = setInterval(fetchFeed, 30000); // every 30 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Title>🧠 Real-Time Threat Feed</Title>
      {feed.map((threat, i) => (
        <FeedItem key={i}>
          <div>
            <strong>{threat.type}</strong>
            <div style={{ fontSize: "0.85rem", color: "#ccc" }}>
              {threat.country} • {threat.timestamp}
            </div>
          </div>
          <Badge severity={threat.severity}>{threat.severity}</Badge>
        </FeedItem>
      ))}
    </Container>
  );
}

export default ThreatFeed;
