import styled from "styled-components";
import Heading from "../ui/Heading";
import SpacedRow from "../ui/SpacedRow";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function Dashboard() {
  return (
    <StyledDashboard>
      <SpacedRow>
        <Heading>Dashboard Page</Heading>
        <DashboardFilter />
      </SpacedRow>
      <DashboardLayout />
    </StyledDashboard>
  );
}

export default Dashboard;
