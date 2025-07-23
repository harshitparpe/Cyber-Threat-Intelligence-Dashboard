import styled from "styled-components";

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: #2d3748;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
`;

function ThreatCards() {
  const cards = [
    { label: "Total Threats", value: "1,023" },
    { label: "High-Risk IPs", value: "47" },
    { label: "Active IOCs", value: "92" },
    { label: "New Today", value: "21" },
  ];

  return (
    <CardGrid>
      {cards.map((card) => (
        <Card key={card.label}>
          <h3>{card.label}</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{card.value}</p>
        </Card>
      ))}
    </CardGrid>
  );
}

export default ThreatCards;
