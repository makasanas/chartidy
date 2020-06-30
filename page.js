

init();
var tablesNode;
var tables = [];

function init() {
    tables = [];
    tablesNode = document.getElementsByTagName("table");

    if (tablesNode.length > 0) {
        getTableData();
        addTableWrapper();
    }

}

//Generates data for table
function getTableData() {
    for (let i = 0; i < tablesNode.length; i++) {
        var table = [];
        const element = tablesNode[i];
        getTableHeaders(element, table);
        getTableCells(element, table);
        tables.push(table);
    }
}

//Get Headers data of table
function getTableHeaders(tableNode, table) {
    let tableHead = tableNode.getElementsByTagName("thead");
    if (tableHead.length == 0) {
        tableHead = tableNode.getElementsByTagName("tbody");
    }
    var headRows = tableHead[0].getElementsByTagName("tr");
    for (let hr = 0; hr < headRows.length; hr++) {
        const headRowElement = headRows[hr];
        if (headRowElement.getElementsByTagName("th").length > 0) {
            var heads = headRowElement.getElementsByTagName("th");
            for (let h = 0; h < heads.length; h++) {
                const headElement = heads[h];
                let tmpData = { head: headElement.textContent, data: [] };
                table.push(tmpData);
            }

        }
    }
    return table;
}

//Get cells data of table
function getTableCells(tableNode, table) {
    let tableBody = tableNode.getElementsByTagName("tbody");
    var bodyRows = tableBody[0].getElementsByTagName("tr");
    for (let br = 0; br < bodyRows.length; br++) {
        const bodyRowElement = bodyRows[br];
        if (bodyRowElement.getElementsByTagName("td").length > 0) {
            var cells = bodyRowElement.getElementsByTagName("td");
            for (let c = 0; c < cells.length; c++) {
                const cellElement = cells[c];
                table[c]['data'].push(cellElement.textContent.replace(/,/g, ""));
            }
        }
    }
    return table;
}

//Add wrapper to table
function addTableWrapper() {
    for (var i = 0; i < tablesNode.length; i++) {
        var parent = tablesNode[i].parentElement;
        let children = parent.getElementsByTagName("table");
        for (var j = 0; j < children.length; j++) {
            if (!parent.classList.contains("chartidy-table-wrapper")) {
                var child = parent.removeChild(children[0]);
                let visualizeBtn = generateVisualizeBtn(tables[i], i);
                let visualizeDialog = generateVisualizeDialog(tables[i], i);
                let visualizeChart = generateVisualizeChart(i);
                var wrap = document.createElement("div");
                wrap.className = "chartidy-table-wrapper";
                wrap.appendChild(child);
                wrap.appendChild(visualizeBtn);
                wrap.appendChild(visualizeDialog);
                wrap.appendChild(visualizeChart);
                parent.appendChild(wrap);
            }
        }
    }
}

//Button to open dialog box
function generateVisualizeBtn(data, i) {
    let visualizeBtnNode = document.createElement("div");
    let visualizeButton = document.createElement("button");
    visualizeButton.classList.add("chartidy-visualize-btn");
    visualizeButton.innerHTML = '<div class="top"><div class="icon"><svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 511.9 511.9" style="enable-background:new 0 0 511.9 511.9;" xml:space="preserve">  <g><g><path d="M460.8,25.55c-28.2-0.1-51.1,22.8-51.2,51c0,13.3,5.1,26.1,14.4,35.6l-93.5,187.1c-2-0.3-4.1-0.6-6.2-0.6    c-6.6,0-13.2,1.3-19.3,3.8l-72.6-81.7c4.2-7.5,6.5-15.9,6.6-24.6c0-28.3-22.9-51.2-51.2-51.2s-51.2,22.9-51.2,51.2    c0.1,12.2,4.5,24,12.6,33.2l-88.9,155.5c-3-0.6-6.1-0.9-9.1-0.9c-28.3,0-51.2,22.9-51.2,51.2c0,28.3,22.9,51.2,51.2,51.2    s51.2-22.9,51.2-51.2c-0.1-12.2-4.5-24-12.6-33.2l88.8-155.5c9.5,1.9,19.4,0.9,28.3-2.9l72.6,81.7c-4.2,7.5-6.4,16-6.5,24.6    c-0.1,28.3,22.8,51.3,51,51.4c28.3,0.1,51.3-22.8,51.4-51c0-13.3-5.1-26.2-14.4-35.8l93.5-187.1c2,0.3,4.1,0.6,6.2,0.6    c28.3,0,51.2-22.9,51.2-51.2S489.1,25.55,460.8,25.55z"/></g>    </g></svg></div><span>Visualize</span></div> <span class="btn-small-text">with chartidy</span>';
    visualizeButton.addEventListener('click', function () {
        visualizeTableData(i);
    });
    visualizeBtnNode.appendChild(visualizeButton);

    return visualizeBtnNode;
}

//Dialogbox for input axis
function generateVisualizeDialog(data, i) {

    let visualizeDialogWrapperNode = document.createElement("div");
    visualizeDialogWrapperNode.classList.add("chartidy-dialog-wrapper");
    visualizeDialogWrapperNode.setAttribute("id", "chartidy-dialog-wrapper" + i);

    let visualizeDialogNode = document.createElement("div");
    visualizeDialogNode.classList.add("chartidy-dialog");
    visualizeDialogNode.setAttribute("id", "chartidy-dialog" + i);

    let visualizeAxis = document.createElement("div");
    visualizeAxis.classList.add("chartidy-dialog-body");
    visualizeAxis.innerHTML = "<div class='chartidy-desc'><span>Enter the columns indexes to interpret in the visualization</span></div><div class='inputs'><div class='chartidy-input'><span class='input-label'>X-Axis Column</span><input id='chartidy-chart-x' type='text'></div><div class='chartidy-input '><span class='input-label'>Y-Axis Column</span><input id='chartidy-chart-y' type='text'></div></div><div id='chartidyInputError' class='chartidy-input-error'></div>";
    visualizeDialogNode.appendChild(visualizeAxis);

    //Buttons with their click events
    let visualizeCancelBtn = document.createElement("button");
    visualizeCancelBtn.classList.add("outlined");
    visualizeCancelBtn.innerHTML = "Cancel";
    let visualizeStartBtn = document.createElement("button");
    visualizeStartBtn.innerHTML = "Done";
    visualizeStartBtn.addEventListener('click', function () {
        visualizeStart(data, i);
    });
    visualizeCancelBtn.addEventListener('click', function () {
        visualizeCancel();
    });

    //Dialog buttons
    let visualizeButtons = document.createElement("div");
    visualizeButtons.classList.add("buttons");
    visualizeButtons.appendChild(visualizeCancelBtn);
    visualizeButtons.appendChild(visualizeStartBtn);

    visualizeDialogNode.appendChild(visualizeButtons);
    visualizeDialogWrapperNode.appendChild(visualizeDialogNode);

    return visualizeDialogWrapperNode;
}

//Open dialog on click visualize button
function visualizeTableData(i) {
    document.getElementById("chartidy-dialog-wrapper" + i).classList.add("active");
}

//On click Done in dialog
function visualizeStart(data, i) {
    if (isValidInputs(data)) {
        let chartidySelected = {
            x: parseInt(document.getElementById("chartidy-chart-x").value),
            y: parseInt(document.getElementById("chartidy-chart-y").value)
        };
        let finalData = {
            x: data[chartidySelected.x],
            y: data[chartidySelected.y]
        }
        generateChart(i, finalData);
    }
}

function generateChart(i, finalData) {
    document.getElementById("chartidyChartWrapper" + i).classList.add("active");

    var ctx = document.getElementById('myChart' + i);
    ctx.height = 300;
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: finalData.x.data,
            datasets: [{
                label: finalData.y.head,
                data: finalData.y.data
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    document.getElementById("chartidy-dialog-wrapper" + i).classList.remove("active");
}

//On click Cancel in dialog
function visualizeCancel() {
    document.getElementById("chartidy-dialog-wrapper" + i).classList.remove("active");
}

//Validate inputs
function isValidInputs(data) {
    try {
        if (document.getElementById("chartidy-chart-x").value == "" || document.getElementById("chartidy-chart-y").value == "") {
            addError("Enter some value");
            return false;
        } else {
            let x = parseInt(document.getElementById("chartidy-chart-x").value);
            let y = parseInt(document.getElementById("chartidy-chart-y").value);
            if (!Number.isInteger(x) || !Number.isInteger(y)) {
                addError("Only numbers allowed");
                return false;
            } else if (x > data[0].data.length || x < 0 || y > data[0].data.length || y < 0) {
                addError("Enter data between available range");
                return false;
            } else if (x == y) {
                addError("Value can not be same");
                return false;
            } else {
                document.getElementById("chartidyInputError").innerHTML = "";
                if (validateData(data, x, y)) {
                    return true;
                } else {
                    addError("Columns with numbers and dates are allowed only.");
                    return false;
                }

                // return true;
            }
        }
    } catch (error) {

    }
}

//validate data for dates and number
function validateData(data, x, y) {
    let validateDationArray = data[x].data.concat(data[y].data);
    for (let i = 0; i < validateDationArray.length; i++) {
        const element = validateDationArray[i];
        let dateValue = new Date(element);
        let numericValue = Number.isInteger(parseInt(element));
        if (dateValue == "Invalid Date" && !numericValue) {
            return false;
        }
    }
    return true;
}

//Add error to input
function addError(text) {
    document.getElementById("chartidyInputError").innerHTML = "";
    document.getElementById("chartidyInputError").innerHTML = text;
}

//Chart div
function generateVisualizeChart(i) {
    let visualizeChartWrapperNode = document.createElement("div");
    visualizeChartWrapperNode.classList.add("chartidy-chart-wrapper");
    visualizeChartWrapperNode.setAttribute("id", "chartidyChartWrapper" + i);
    visualizeChartWrapperNode.innerHTML = "";
    let tmpId = "myChart" + i;
    visualizeChartWrapperNode.innerHTML = '<canvas class="generatedCanvas" id="' + tmpId + '" width="400" height="400"></canvas>';
    return visualizeChartWrapperNode;
}

