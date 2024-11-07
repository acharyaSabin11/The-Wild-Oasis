import styled from "styled-components";
import Statistics from "./Statistics";
import SalesChart from "./SalesChart";
import StaysDurationChart from "./StaysDurationChart";
import TodaysActivity from "./TodaysActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  column-gap: 2rem;
  row-gap: 4rem;
  overflow-wrap: anywhere;
`;

function DashboardLayout() {
  return (
    <StyledDashboardLayout>
      <Statistics />
      <TodaysActivity />
      <StaysDurationChart />
      <SalesChart />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
