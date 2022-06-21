export const mapGraphs = (graphs) => {
  let graphArray = {};

  if (Object.keys(graphs).length > 0) {
    graphs.forEach((graph) => {
      if (!graphArray[graph.chartType]) {
        graphArray[graph.chartType] = {};
      }
      graphArray[graph.chartType] = graph;
    });
  }

  return sortObject(graphArray);
};

export const mapSectionsData = (graph) => {
  let data = [];
  let updateData = [];
  let graphs = graph.barnGraph ?? false;
  let sections = graph.allSections ?? false;

  if (Object.keys(graphs).length !== 0) data.push(graphs);

  if (Object.keys(sections).length !== 0) {
    sections.forEach(function (item, key) {
      data.push(item.data);
    });
  }

  if (Object.keys(data).length !== 0) {
    data.forEach(function (element, key) {
      let newElement = [];
      let name = key === 0 ? "barn" : "s" + key;
      element.forEach(function (item, index) {
        let arr = {};
        arr[name] = item.value;
        newElement[index] = { ...item, ...arr };

        if (key !== 0) {
          updateData["barn"][index] = { ...updateData["barn"][index], ...arr };
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
