import {
  HiOutlineBriefcase,
  HiOutlineChartBar,
  HiOutlinePresentationChartLine,
} from "react-icons/hi";
import StatsItem from "./StatsItem";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";
import useRecentBookings from "../bookings/useRecentBookings";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import useRecentStays from "../bookings/useRecentStays";
import useCabinsData from "../cabins/useCabinsData";

const StyledStatistics = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
  grid-column: 1/-1;
`;

function Statistics() {
  const { recentBookings, recentBookingsLoading, recentBookingsError } =
    useRecentBookings();

  const { confirmedStays, recentStaysLoading, recentStaysError, numNights } =
    useRecentStays();
  const {
    cabins,
    cabinsLoadingError,
    isLoading: cabinsAreLoading,
  } = useCabinsData();

  const sales = recentBookings?.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const totalNumNights = confirmedStays?.reduce(
    (acc, curr) => acc + curr.numNights,
    0
  );
  const availableNights = numNights * cabins?.length;
  const occupancy = ((totalNumNights / availableNights) * 100).toFixed(2);

  return (
    <StyledStatistics>
      <StatsItem
        color="blue"
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={recentBookings?.length}
        error={recentBookingsError && "Failed Loading Bookings Statistics"}
        loading={recentBookingsLoading}
      />
      <StatsItem
        color="green"
        icon={<HiOutlinePresentationChartLine />}
        title="Sales"
        value={formatCurrency(sales)}
        loading={recentBookingsLoading}
        error={recentBookingsError && "Failed Loading Sales Statistics"}
      />
      <StatsItem
        color="brand"
        icon={<HiOutlineCalendarDays />}
        title="Check Ins"
        value={confirmedStays?.length}
        loading={recentStaysLoading}
        error={recentStaysError && "Failed Loading Check Ins statistics"}
      />
      <StatsItem
        color="yellow"
        icon={<HiOutlineChartBar />}
        title="Occupancy Rate"
        value={occupancy + "%"}
        loading={
          recentBookingsLoading || recentStaysLoading || cabinsAreLoading
        }
        error={
          (recentBookingsError || recentStaysError || cabinsLoadingError) &&
          "Failed Loading Occupancy Rate"
        }
      />
    </StyledStatistics>
  );
}

export default Statistics;
