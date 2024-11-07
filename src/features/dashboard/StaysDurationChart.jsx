import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";
import useRecentStays from "../bookings/useRecentStays";
import SpinnerMini from "../../ui/SpinnerMini";

const StyledStaysDurationChart = styled.div`
  grid-column: 3/-1;
  grid-row: 2/3;
  background-color: var(--color-grey-0);
  padding: 1.5rem 2rem;
  color: var(--color-grey-700);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 30rem;
  width: 100%;
  border-radius: var(--border-radius-md);
`;

const Title = styled.span`
  color: var(--color-grey-700);
  font-size: 1%.4;
  font-weight: 700;
`;

const Screen = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-0);
  grid-row: 2/3;
  grid-column: 3/-1;
  color: var(--color-red-7000);
  font-weight: 500;
`;

const colors = [
  "#74B9FF", // Light Sky Blue
  "#81ECEC", // Aqua Mint
  "#A3CB38", // Bright Olive Green
  "#FAB1A0", // Light Coral
  "#E17055", // Burnt Sienna
  "#A29BFE", // Soft Lavender
  "#FF7675", // Pastel Red
  "#FDCB6E", // Soft Orange
  "#6C5CE7", // Vivid Purple
  "#E84393", // Deep Pink
  "#55EFC4", // Turquoise
  "#00CEC9", // Vibrant Teal
  "#FFEAA7", // Lemon Yellow
  "#FD79A8", // Blush Pink
  "#00B894", // Emerald Green
  "#636E72", // Charcoal Gray
  "#F39C12", // Amber
  "#D63031", // Rich Red
  "#0984E3", // Electric Blue
  "#FF9F43", // Mango Orange
];

function StaysDurationChart() {
  const { recentStays, recentStaysError, recentStaysLoading } =
    useRecentStays();

  if (recentStaysLoading)
    return (
      <Screen>
        <SpinnerMini />
      </Screen>
    );

  if (recentStaysError)
    return <Screen>Failed to load Stay Duration Data</Screen>;

  const staysDurationData = recentStays.reduce((acc, stay) => {
    const key = stay.numNights.toString();
    if (key in acc) {
      acc[key] = acc[key] + 1;
    } else {
      acc[key] = 1;
    }
    return acc;
  }, {});

  const data = Object.entries(staysDurationData).map((duration) => ({
    numNights: duration[0],
    count: duration[1],
  }));

  console.log(data);
  return (
    <StyledStaysDurationChart>
      <Title>Stay Durations</Title>

      <ResponsiveContainer>
        <PieChart width={730} height={250}>
          {/*  */}
          <Pie
            data={data}
            dataKey="count"
            nameKey="numNights"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            legendType="circle"
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} stroke="none" />
            ))}
          </Pie>
          <Legend
            align="right"
            layout="vertical"
            verticalAlign="middle"
            formatter={(value) => value + " nights"}
          />
          <Tooltip
            itemStyle={{
              color: "var(--color-grey-700)",
            }}
            contentStyle={{
              backgroundColor: "var(--color-grey-0)",
            }}
            formatter={(value, name) => [value, name + " Nights"]}
          />
        </PieChart>
      </ResponsiveContainer>
    </StyledStaysDurationChart>
  );
}

export default StaysDurationChart;

// const colors = [
//   "#FF5733", // Vibrant Red-Orange
//   "#33FF57", // Bright Green
//   "#3357FF", // Vivid Blue
//   "#FF33A1", // Hot Pink
//   "#FF8C33", // Deep Orange
//   "#33FFF3", // Aqua Blue
//   "#9B33FF", // Purple
//   "#FF3333", // Bright Red
//   "#33FF99", // Mint Green
//   "#3339FF", // Royal Blue
//   "#FFC733", // Golden Yellow
//   "#57FF33", // Lime Green
//   "#FF33C4", // Neon Pink
//   "#33D4FF", // Sky Blue
//   "#FFA533", // Pumpkin Orange
//   "#8C33FF", // Electric Purple
//   "#FFD633", // Sunny Yellow
//   "#33FFBA", // Teal
//   "#FF3357", // Cherry Red
//   "#33FF57", // Bright Lime
// ];

// const colors = [
//   "#6A89CC", // Soft Blue
//   "#82CCDD", // Light Teal
//   "#B8E994", // Pale Green
//   "#F8C291", // Soft Peach
//   "#E77F67", // Muted Coral
//   "#786FA6", // Gentle Purple
//   "#F3A683", // Warm Salmon
//   "#F7D794", // Subtle Yellow
//   "#778BEB", // Calm Periwinkle
//   "#E15F41", // Burnt Orange
//   "#3B3B98", // Deep Indigo
//   "#60A3BC", // Dusty Blue
//   "#78E08F", // Cool Mint
//   "#FA983A", // Soft Apricot
//   "#38ADA9", // Ocean Teal
//   "#596275", // Slate Gray
//   "#C44569", // Warm Mauve
//   "#0A3D62", // Navy Blue
//   "#3C6382", // Steel Blue
//   "#F5CD79", // Sand Yellow
// ];
