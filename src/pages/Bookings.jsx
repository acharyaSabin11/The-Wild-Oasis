import styled from "styled-components";
import Heading from "./../ui/Heading";
import BookingsTable from "../features/bookings/BookingsTable";
import Filter from "./../ui/Filter";
import SortBy from "./../ui/SortBy";

const SpacedRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

const StyledBookings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 120rem;
  min-width: 82rem;
  margin: 0 auto;
`;

function Bookings() {
  return (
    <StyledBookings>
      <SpacedRow>
        <Heading as="h1">Bookings Table</Heading>
        <SpacedRow>
          <Filter
            filterField="status"
            options={[
              { label: "All", value: "all" },
              { label: "Unconfirmed", value: "unconfirmed" },
              { label: "Checked In", value: "checked-in" },
              { label: "Checked Out", value: "checked-out" },
            ]}
          />
          <SortBy
            options={[
              { label: "Date (Latest First)", value: "startDate-dsc" },
              { label: "Date (Oldest First)", value: "startDate-asc" },
              { label: "Amount (High-Low)", value: "totalPrice-dsc" },
              { label: "Amount (Low-High)", value: "totalPrice-asc" },
            ]}
          />
        </SpacedRow>
      </SpacedRow>
      <BookingsTable />
    </StyledBookings>
  );
}

export default Bookings;
