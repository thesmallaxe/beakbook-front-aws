import React from "react";
import { BarChart, Bar, XAxis, YAxis, Cell } from "recharts";

export const CustomizedLabel = (props) => {
  const { x, y, width, value, unit, name } = props;

  let miniValue =
    name === "Total Activity" ? value : parseFloat(value).toFixed(2);

  return (
    <text
      x={x + width + 10}
      y={y + 10}
      fontSize="12"
      fontFamily="sans-serif"
      fill="#000"
      textAnchor="start"
    >
      {miniValue} {unit}
    </text>
  );
};

export const CustomTooltip = ({ name, active, payload, label, unit }) => {
  if (active && payload && payload.length) {
    let data = payload[0].payload.miniGraph ?? [];
    // let value = parseFloat(payload[0].payload.value).toFixed(2);
    let value =
      name === "Total Activity"
        ? payload[0].payload.value
        : parseFloat(payload[0].payload.value).toFixed(2);

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
              height={window.innerWidth < 764 ? 100 : 150}
              width={window.innerWidth < 764 ? 200 : 300}
              layout="vertical"
              barCategoryGap={1}
              margin={{ top: 0, right: 60, left: 10, bottom: 0 }}
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
                barSize={10}
                radius={[10, 10, 10, 10]}
                label={<CustomizedLabel unit={unit} name={name} />}
              >
                {payload.map((entry, index) => {
                  if (entry.value > 0) {
                    return <Cell key={`cell-${index}`} fill={entry.color} />;
                  }
                  return null;
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
