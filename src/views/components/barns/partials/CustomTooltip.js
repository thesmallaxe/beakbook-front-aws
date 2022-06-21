import React from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

export const CustomizedLabel = (props) => {
  const { x, y, width, fill, value } = props;
 
  return (
    <text
      x={x + width + 10}
      y={y + 10}
      fontSize="12"
      fontFamily="sans-serif"
      fill={fill}
      textAnchor="start"
    >
      {value.toFixed(2)} g
    </text>
  );
};

export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {

    let data = payload[0].payload.miniGraph ?? [];

    return (
      <div className="widget__tooltip tooltip">
        <div className="tooltip__heading">
          <div className="tooltip__heading_left">
            <h3>Average Weight</h3>
            <p className="label">
              {payload[0].payload.value.toFixed(2)} g / {label} days
            </p>
          </div>
          <div className="tooltip__heading_right">
            <label>{payload[0].payload.value.toFixed(2)} g</label>
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
                fill="#F97916"
                barSize={10}
                radius={[10, 10, 10, 10]}
                label={<CustomizedLabel />}
              />
            </BarChart>
          )}
        </div>
      </div>
    );
  }

  return null;
};
