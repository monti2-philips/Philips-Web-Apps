// Javascript Function and Classes

document.getElementById("partNumberInput").value = "453561780787";
document.getElementById("workOrderInput").value = "302232423";

async function loadMulti(key, id) {
  const response = await fetch("../data/operation-resource.json");
  const jsonData = await response.json();
  const resourceData = jsonData[key];

  var options = [];

  for (const item of resourceData) {
    options.push({
      label: item,
      value: item,
      selected: true,
    });

    $(id).multiselect({
      includeSelectAllOption: true,
      selectAllName: "All Resources",
      selectAllValue: "All Resources",
      selectAllText: "All Resources",
    });
    $(id).multiselect("dataprovider", options);
    $(id).multiselect("selectAll");
  }
  return resourceData;
}

const aimResources = loadMulti("AIM", "#resourceAIM");
const rfbResources = loadMulti("RFB", "#resourceRFB");
const thermalResources = loadMulti("THERMAL", "#resourceThermal");

function checkResources(id, resources) {
  const inputs = $(id).val();
  console.log("inputs");
  console.log(inputs);
  console.log("imports");
  console.log(resources);
}

function setMaxDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  document.getElementById("maxDate").value = today;
}

setMaxDate();

function resetInputs() {
  document.getElementById("variantToggle").checked = true;
  document.getElementById("acousticTestInput").checked = true;
  document.getElementById("aimTestInput").checked = true;
  document.getElementById("rfbTestInput").checked = true;
  document.getElementById("thermalTestInput").checked = true;
  document.getElementById("partNumberInput").value = null;
  document.getElementById("workOrderInput").value = null;
  document.getElementById("minDate").value =
    document.getElementById("minDate").min;
  setMaxDate();
  loadMulti("AIM", "#resourceAIM");
  loadMulti("RFB", "#resourceRFB");
  loadMulti("THERMAL", "#resourceThermal");
}

class formCollection {
  constructor() {
    // Collect Value for Query Type
    if (document.getElementById("variantToggle").checked == true) {
      this.queryType = "Variant";
    } else if (document.getElementById("referenceToggle").checked == true) {
      this.queryType = "Reference";
    } else {
      alert("There is an error with the Query Test Selection");
    }

    // Collect Test Types
    this.acousticTest = document.getElementById("acousticTestInput").checked;
    this.aimTest = document.getElementById("aimTestInput").checked;
    this.rfbTest = document.getElementById("rfbTestInput").checked;
    this.thermalTest = document.getElementById("thermalTestInput").checked;

    // Collect Part Number
    this.partNumber = document.getElementById("partNumberInput").value;

    // Collect Work Orders
    let workOrderArray = document
      .getElementById("workOrderInput")
      .value.split(",");
    this.workOrders = workOrderArray.map((workOrderArray) =>
      workOrderArray.trim()
    );

    // Collect Min/Max Dates
    this.minDate = document.getElementById("minDate").value;
    this.maxDate = document.getElementById("maxDate").value;

    // Collect Resources
    this.aimResources = checkResources("resourceAIM");
    this.rfbResources = checkResources("resourceRFB");
    this.thermalResources = checkResources("resourceThermal");
  }
}

function runQuery() {
  let x = new formCollection();
  console.log(JSON.stringify(x, undefined, 4));
}
