import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { time: "9AM", value: 22000 },
  { time: "10AM", value: 22100 },
  { time: "11AM", value: 22240 },
  { time: "12PM", value: 22120 },
  { time: "1PM", value: 22310 },
  { time: "2PM", value: 22450 },
  { time: "3PM", value: 22390 },
];

export default function CandleChart() {
  return (
    <div className="chart-box glass">
      <div className="chart-top">
        <div>
          <h3>NIFTY 50</h3>
          <p className="green">
            +1.84%
          </p>
        </div>
      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <AreaChart data={data}>
          <XAxis dataKey="time" />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#111"
            fill="#d9d9d9"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}