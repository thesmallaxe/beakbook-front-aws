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
import { Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { mapSectionsData } from "../../../app/services/Helper";

const colors = {
  barn: "#6A3EFF",
  s1: "#F97916",
  s2: "#289D44",
  s3: "#FABE22",
  s4: "#01B7FF",
};

export const WidgetChild = (props) => {
  const allSections = props.graph.allSections ?? {};
  const totalActivity = props.totalActivity;

  const HandleChange = (e) => {
    let updatedValue = { current: e.target.value };
    props.setTotalActivity((totalActivity) => ({
      ...totalActivity,
      ...updatedValue,
    }));
  };

  return (
    <div className="widget__action">
      {totalActivity.current === "all" &&
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
          value={totalActivity.current}
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

export const TotalActivity = ({ graph, loading }) => {
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
  data =
    totalActivity.current !== "all"
      ? data[totalActivity.current]
      : data["barn"];
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
      <ResponsiveContainer hwidth="100%" height={300}>
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
          <Tooltip />
          {totalActivity.data && totalActivity.current === "all" ? (
            Object.keys(totalActivity.data).map(function (name) {
              if (name === "barn") {
                return null;
              }
              let dataKey = name === "barn" ? "value" : name;
              return (
                <Bar
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
