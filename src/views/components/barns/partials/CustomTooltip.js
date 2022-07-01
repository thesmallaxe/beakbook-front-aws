import React from "react";
import { BarChart, Bar, XAxis, YAxis, Cell } from "recharts";

export const CustomizedLabel = (props) => {
  const { x, y, width, value, unit } = props;

  return (
    <text
      x={x + width + 10}
      y={y + 10}
      fontSize="12"
      fontFamily="sans-serif"
      fill="#000"
      textAnchor="start"
    >
      {value.toFixed(2)} {unit}
    </text>
  );
};

export const CustomTooltip = ({
  name,
  active,
  payload,
  label,
  unit,
  color,
}) => {
  if (active && payload && payload.length) {
    let data = payload[0].payload.miniGraph ?? [];
    let value = parseFloat(payload[0].payload.value).toFixed(2);

    if (value === "0.00" || value === 0) {
      return "";
    }

    return (
      <div className="widget__tooltip tooltip">
        <div className="tooltip__heading">
          <div className="tooltip__heading_left">
            <h3>{name}</h3>
            <p className="label">
              {value} {unit} / {label} days
            </p>
          </div>
          <div className="tooltip__heading_right">
            <label>
              {value} {unit}
            </label>
          </div>
        </div>
        <div className="tooltip__body">
          {data.length > 0 && (
            <BarChart
              height={150}
              width={300}
              layout="vertical"
              barCategoryGap={1}
              margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
              data={data}
            >
              <XAxis tickLine={false} type="number" hide />
              <YAxis
                tickLine={false}
                type="category"
                padding={{ left: 20 }}
                dataKey="time"
              />

              <Bar
                dataKey="value"
                fill={color}
                barSize={10}
                radius={[10, 10, 10, 10]}
                label={<CustomizedLabel unit={unit} />}
              >
                {payload.map((entry, index) => {
                  return <Cell key={`cell-${index}`} fill={entry.color} />;
                })}
              </Bar>
            </BarChart>
          )}
        </div>
      </div>
    );
  }

  return null;
};
