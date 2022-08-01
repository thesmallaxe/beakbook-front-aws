export const graphNames = {
  area: "average_weight",
  bar: "total_activity",
  line: "standard_deviation",
};

export const mapGraphs = (graphs) => {
  let graphArray = {};

  if (Object.keys(graphs).length > 0) {
    graphs.forEach((graph) => {
      let key = graphNames[graph.chartType];
      if (!graphArray[key]) {
        graphArray[key] = {};
      }
      graphArray[key] = graph;
    });
  }

  return sortObject(graphArray);
};

export const mapSectionsData = (graph) => {
  let data = [];
  let updateData = [];
  let graphs = graph.barnGraph ?? false;
  let sections = graph.allSections ?? false;

  if (Object.keys(graphs).length !== 0) {
    data.push(graphs);
    data.push(graphs);
  }

  if (Object.keys(sections).length !== 0) {
    sections.forEach(function (item, key) {
      data.push(item.data);
    });
  }

  const names = ["barn", "all", "s1", "s2", "s3", "s4"];
  const section_names = {
    s1: "Section 1",
    s2: "Section 2",
    s3: "Section 3",
    s4: "Section 4",
  };

  if (Object.keys(data).length !== 0) {
    data.forEach(function (element, key) {
      let newElement = [];
      let name = names[key];
      element.forEach(function (item, index) {
        let arr = {};
        arr[name] = item.value;
        newElement[index] = { ...item, ...arr };

        if (key !== 0) {
          updateData["barn"][index] = { ...updateData["barn"][index], ...arr };
        }

        if (key === 2) {
          updateData["all"][index]["miniGraph"] = [];
        }

        if (key > 1) {
          updateData["all"][index] = { ...updateData["all"][index], ...arr };
          if (item.value > 0) {
            updateData["all"][index]["miniGraph"].push({
              time: section_names[name],
              value: item.value,
            });
          }
        }
      });

      updateData[name] = newElement;
    });
  }

  return updateData;
};

export const sortObject = (sortObj) => {
  Object.keys(sortObj)
    .sort()
    .forEach(function (key) {
      var value = sortObj[key];
      delete sortObj[key];
      sortObj[key] = value;
    });

  return sortObj;
};

export const formatNumber = (val) => {
  // trim the number decimal point if it exists
  let num = val.toString().toLocaleString("en-US");

  return num;
};

export const downloadFile = (url) => {
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("target", "_blank");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
