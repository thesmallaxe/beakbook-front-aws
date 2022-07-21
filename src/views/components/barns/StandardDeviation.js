import React, { useState, useEffect } from "react";
import { Widget } from "../partials/Widget";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  Line,
  Tooltip,
} from "recharts";
import { mapSectionsData } from "../../../app/services/Helper";
import { CustomTooltip } from "./partials/CustomTooltip";
import { WidgetChild } from "./partials/StandardDeviationWidgetChild";
import { withPermission } from "../../../app/hooks/with-permission";

export const colors = {
  barn: "#F97916",
  all: "#F97916",
  s1: "#F97916",
  s2: "#289D44",
  s3: "#FABE22",
  s4: "#01B7FF",
};

const StandardDeviation = ({ graph, loading }) => {
  const [deviation, setDeviation] = useState({
    current: "barn",
    data: {},
  });

  useEffect(() => {
    let data = mapSectionsData(graph);
    let updatedValue = { data: data ? data : [] };
    setDeviation((deviation) => ({
      ...deviation,
      ...updatedValue,
    }));
  }, [setDeviation, graph]);

  let colorName =
    deviation.current === "all" ? colors["barn"] : colors[deviation.current];
  let data = deviation.data;
  data = data[deviation.current];
  const yLabel =
    deviation.current === "barn" ? graph.yLabelBarn : graph.yLabelSection;

  return (
    <Widget
      title="Standard Deviation"
      widget_action={{
        edit: true,
        child: (
          <WidgetChild
            key={graph.graphName}
            setDeviation={setDeviation}
            deviation={deviation}
            graph={graph}
          />
        ),
      }}
    >
      <ResponsiveContainer
        hwidth="100%"
        height={300}
        className={deviation.current === "all" ? "all" : ""}
      >
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{
            bottom: 20,
          }}
        >
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
          <CartesianGrid strokeDasharray="3 5" vertical={false} />
          <Tooltip
            content={
              <CustomTooltip
                data={data}
                name={graph.graphName}
                unit="g"
                color={colorName}
              />
            }
          />
          {deviation.data && deviation.current === "all" ? (
            Object.keys(deviation.data).map(function (name) {
              if (name === "barn" || name === "all") {
                return null;
              }
              let dataKey = name === "barn" || name === "all" ? "value" : name;
              return (
                <Line
                  type="monotone"
                  strokeWidth={2}
                  dataKey={dataKey}
                  stroke={colors[name]}
                  dot={false}
                />
              );
            })
          ) : (
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey={deviation.current}
              stroke={colors[deviation.current]}
              dot={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Widget>
  );
};

export default withPermission(StandardDeviation, "deviation");
