import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  { duration: "12 Meses", value: 0, color: "#ef4444" },
  { duration: "24 Meses", value: 0, color: "#f97316" },
  { duration: "30 Meses", value: 0, color: "#eab308" },
  { duration: "36+ Meses", value: 0, color: "#84cc16" },
];

const startDataDark = [
  { duration: "12 Meses", value: 0, color: "#b91c1c" },
  { duration: "24 Meses", value: 0, color: "#c2410c" },
  { duration: "30 Meses", value: 0, color: "#a16207" },
  { duration: "36+ Meses", value: 0, color: "#4d7c0f" },
];

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numMeses;
      if (num === 12) return incArrayValue(arr, "12 Meses");
      if (num === 24) return incArrayValue(arr, "24 Meses");
      if (num === 30) return incArrayValue(arr, "30 Meses");
      if (num >= 36) return incArrayValue(arr, "36+ Meses");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h2">Duração dos Contratos Ativos</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
