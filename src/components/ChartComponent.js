import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

function ChartComponent({ data, type, chart }) {

    const chartConfigs = {
        type: type,
        width: "100%",
        height: "400",
        dataFormat: "json",
        dataSource: {
            chart,
            data
        }
    };

    return (<ReactFC {...chartConfigs} />);
}

export default ChartComponent;