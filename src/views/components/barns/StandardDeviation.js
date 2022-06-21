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
import { Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { mapSectionsData } from "../../../app/services/Helper";

const colors = {
  barn: "#F97916",
  s1: "#F97916",
  s2: "#289D44",
  s3: "#FABE22",
  s4: "#01B7FF",
};

const WidgetChild = (props) => {
  const allSections = props.graph.allSections ?? {};
  const deviation = props.deviation;

  const HandleChange = (e) => {
    let updatedValue = { current: e.target.value };
    props.setDeviation((deviation) => ({
      ...deviation,
      ...updatedValue,
    }));
  };

  return (
    <div className="widget__action">
      {deviation.current === "all" &&
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
          value={deviation.current}
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

export const StandardDeviation = ({ graph, loading }) => {
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

  let data = deviation.data;
  data = deviation.current !== "all" ? data[deviation.current] : data["barn"];
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
      <ResponsiveContainer hwidth="100%" height={300}>
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
          <Tooltip />
          {deviation.data && deviation.current === "all" ? (
            Object.keys(deviation.data).map(function (name) {
              if (name === "barn") {
                return null;
              }
              let dataKey = name === "barn" ? "value" : name;
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
