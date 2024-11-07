import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import useRecentBookings from "../bookings/useRecentBookings";
import { formatDate } from "../../utils/helpers";
import SpinnerMini from "../../ui/SpinnerMini";

const StyledSalesChart = styled.div`
  grid-column: 1/-1;
  grid-row: 3/-1;
  background-color: var(--color-grey-0);
  padding: 3rem 4rem;
  color: var(--color-grey-700);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 40rem;
  width: 100%;
`;

const Title = styled.span`
  color: var(--color-grey-700);
  font-size: 2.4rem;
  font-weight: 700;
`;

const Screen = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-0);
  grid-row: 3/-1;
  grid-column: 1/-1;
  color: var(--color-red-7000);
  font-weight: 500;
`;

function SalesChart() {
  const { recentBookings, recentBookingsLoading, recentBookingsError } =
    useRecentBookings();

  if (recentBookingsLoading)
    return (
      <Screen>
        <SpinnerMini />
      </Screen>
    );

  if (recentBookingsError) return <Screen>Failed to load Sales data</Screen>;

  const salesData = recentBookings.map((booking) => ({
    date: formatDate(booking.created_at),
    totalPrice: booking.totalPrice,
    extrasPrice: booking.extrasPrice,
  }));

  return (
    <StyledSalesChart>
      <Title>Sales</Title>
      <ResponsiveContainer>
        <AreaChart
          data={salesData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis unit="$" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-grey-0)",
            }}
          />
          <Area
            type="monotone"
            dataKey="totalPrice"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
            name="Total Sales"
          />
          <Area
            type="monotone"
            dataKey="extrasPrice"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
            name="Extras Sales"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
