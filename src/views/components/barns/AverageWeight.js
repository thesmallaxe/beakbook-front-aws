import React, { useState, useLayoutEffect } from "react";
import { Widget } from "../partials/Widget";

import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";
import { Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { mapSectionsData } from "../../../app/services/Helper";
import { CustomTooltip } from "./partials/CustomTooltip";

const colors = {
  barn: "#F97916",
  s1: "#F97916",
  s2: "#289D44",
  s3: "#FABE22",
  s4: "#01B7FF",
};

export const WidgetChild = (props) => {
  const allSections = props.graph.allSections ?? {};
  const averageWeight = props.averageWeight;

  const HandleChange = (e) => {
    let updatedValue = { current: e.target.value };
    props.setAverageWeight((averageWeight) => ({
      ...averageWeight,
      ...updatedValue,
    }));
  };

  return (
    <div className="widget__action">
      {averageWeight.current === "all" &&
        allSections &&
        allSections.map((section, i) => (
          <div key={i} className="widget__color_wrapper">
            <span
              style={{ backgroundColor: `${colors["s" + (i + 1)]}` }}
            ></span>{" "}
            {section.sectionName}
          </div>
        ))}

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Select
          id="demo-select-small"
          value={averageWeight.current}
          onChange={HandleChange}
        >
          <MenuItem value="barn">Barn</MenuItem>
          {allSections && <MenuItem value="all">All Sections</MenuItem>}
          {allSections &&
            allSections.map((section, i) => (
              <MenuItem key={i} value={"s" + (i + 1)}>
                {section.sectionName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <button className="btn btn--icon btn--gray">
        <i className="icon icon-trash"></i>
      </button>
    </div>
  );
};

export const AverageWeight = ({ graph = {}, loading }) => {
  const [averageWeight, setAverageWeight] = useState({
    current: "barn",
    data: {},
  });

  useLayoutEffect(() => {
    let data = mapSectionsData(graph);
    let updatedValue = { data: data ? data : [] };
    setAverageWeight((averageWeight) => ({
      ...averageWeight,
      ...updatedValue,
    }));
  }, [setAverageWeight, graph]);

  let data = averageWeight.data;
  data =
    averageWeight.current !== "all"
      ? data[averageWeight.current]
      : data["barn"];

  return (
    <Widget
      title={graph.graphName}
      widget_action={{
        edit: true,
        child: (
          <WidgetChild
            key={graph.graphName}
            averageWeight={averageWeight}
            setAverageWeight={setAverageWeight}
            graph={graph}
          />
        ),
      }}
    >
      <ResponsiveContainer hwidth="100%" height={300}>
        <AreaChart data={data} margin={{ bottom: 20 }}>
          <defs>
            {Object.keys(colors).map(function (name) {
              return (
                <linearGradient
                  key={name}
                  id={name}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={colors[name]}
                    stopOpacity={0.4}
                  />
                  <stop offset="75%" stopColor={colors[name]} stopOpacity={0} />
                </linearGradient>
              );
            })}
          </defs>
          <XAxis dataKey="age" tickLine={false} tickSize={15}>
            <Label value={graph.xLabel} offset={-20} position="insideBottom" />
          </XAxis>
          <YAxis tickLine={false} tickSize={15}>
            <Label
              value={graph.yLabelBarn}
              angle="-90"
              position="insideLeft"
              id="chart-left-label"
            />
          </YAxis>
          <CartesianGrid strokeDasharray="1 5 " />
          <Tooltip content={<CustomTooltip data={data} />} />
          {averageWeight.data && averageWeight.current === "all" ? (
            Object.keys(averageWeight.data).map(function (name) {
              if (name === "barn") {
                return null;
              }
              let dataKey = name === "barn" ? "value" : name;
              return (
                <Area
                  key={name}
                  dot={{
                    stroke: "#FFF",
                    strokeWidth: 1,
                    fill: colors[name],
                  }}
                  stackId="1"
                  activeDot={{
                    stroke: "#FFF",
                    strokeWidth: 2,
                    fill: colors[name],
                    r: 6,
                  }}
                  type="monotone"
                  dataKey={dataKey}
                  stroke={colors[name]}
                  fillOpacity={1}
                  fill={"url(#" + name + ")"}
                />
              );
            })
          ) : (
            <Area
              dot={{
                stroke: "#FFF",
                strokeWidth: 1,
                fill: colors[averageWeight.current],
              }}
              activeDot={{
                stroke: "#FFF",
                strokeWidth: 2,
                fill: colors[averageWeight.current],
                r: 6,
              }}
              type="monotone"
              dataKey={averageWeight.current}
              stroke={colors[averageWeight.current]}
              fillOpacity={1}
              fill={"url(#" + averageWeight.current + ")"}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </Widget>
  );
};
