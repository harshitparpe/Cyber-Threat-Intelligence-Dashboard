import IOCSearch from "../components/IOCLookup/IOCSearch";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #0f172a;
  min-height: 100vh;
`;

function IocLookupPage() {
  return (
    <Container>
      <Content>
        <IOCSearch />
      </Content>
    </Container>
  );
}

export default IocLookupPage;
