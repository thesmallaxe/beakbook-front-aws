import React, { useState, useEffect } from "react";
import { Widget } from "../partials/Widget";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  Tooltip,
  Bar,
} from "recharts";
import { mapSectionsData } from "../../../app/services/Helper";
import { CustomTooltip } from "./partials/CustomTooltip";
import { WidgetChild } from "./partials/TotalActivityWidgetChild";
import { withPermission } from "../../../app/hooks/with-permission";

export const colors = {
  barn: "#6A3EFF",
  all: "#6A3EFF",
  s1: "#F97916",
  s2: "#289D44",
  s3: "#FABE22",
  s4: "#01B7FF",
};

const TotalActivity = ({ graph, loading }) => {
  const [totalActivity, setTotalActivity] = useState({
    current: "barn",
    data: {},
  });

  useEffect(() => {
    let data = mapSectionsData(graph);
    let updatedValue = { data: data ? data : [] };
    setTotalActivity((totalActivity) => ({
      ...totalActivity,
      ...updatedValue,
    }));
  }, [setTotalActivity, graph]);

  let data = totalActivity.data;
  let colorName =
    totalActivity.current === "all"
      ? colors["barn"]
      : colors[totalActivity.current];
  data = data[totalActivity.current];

  const yLabel =
    totalActivity.current === "barn" ? graph.yLabelBarn : graph.yLabelSection;

  return (
    <Widget
      title="Total Activity"
      widget_action={{
        edit: true,
        child: (
          <WidgetChild
            key={graph.graphName}
            totalActivity={totalActivity}
            setTotalActivity={setTotalActivity}
            graph={graph}
          />
        ),
      }}
    >
      <ResponsiveContainer
        hwidth="100%"
        height={300}
        className={totalActivity.current === "all" ? "all" : ""}
      >
        <BarChart data={data} barSize={12} barGap={20} margin={{ bottom: 20 }}>
          <defs>
            {Object.keys(colors).map(function (name) {
              return (
                <linearGradient
                  key={name}
                  id={"ta_" + name}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0" stopColor={colors[name]} stopOpacity={1} />
                  <stop offset="1" stopColor={colors[name]} stopOpacity={0.5} />
                </linearGradient>
              );
            })}
          </defs>
          <CartesianGrid strokeDasharray="3 5" vertical={false} />
          <XAxis dataKey="age" tickLine={false} tickSize={15}>
            <Label value={graph.xLabel} offset={-20} position="insideBottom" />
          </XAxis>
          <YAxis tickLine={false} tickSize={15}>
            <Label
              value={yLabel}
              angle="-90"
              position="insideLeft"
              id="chart-left-label"
            />
          </YAxis>
          <Tooltip
            content={
              <CustomTooltip
                data={data}
                name={graph.graphName}
                unit=""
                color={colorName}
              />
            }
          />
          {totalActivity.data && totalActivity.current === "all" ? (
            Object.keys(totalActivity.data).map(function (name) {
              if (name === "barn" || name === "all") {
                return null;
              }
              let dataKey = name === "barn" || name === "all" ? "value" : name;
              return (
                <Bar
                  key={name}
                  dataKey={dataKey}
                  fill={"url(#ta_" + name + ")"}
                  radius={[10, 10, 10, 10]}
                />
              );
            })
          ) : (
            <Bar
              dataKey="value"
              fill={"url(#ta_" + totalActivity.current + ")"}
              radius={[10, 10, 10, 10]}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </Widget>
  );
};

export default withPermission(TotalActivity, "activity");
