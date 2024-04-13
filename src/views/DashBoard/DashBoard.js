import React from "react";
import {
  Piechart,
  Barchart,
  Linechart,
  Doughnutchart,
  Polarchart,
} from "./components";
import {
  barChartData,
  pieChartData,
  lineChartData,
  doughnutChartData,
  radarChartData,
  polarChartData,
} from "../../mock/data";

const DashBoard = () => {
  return (
    <div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <Barchart data={barChartData} />
        </div>
        <div>
          <Linechart data={lineChartData} />
        </div>
        <div>
          <Doughnutchart data={doughnutChartData} />
        </div>
        <div>
          <Polarchart data={polarChartData} />
        </div>
        <div>
          <Piechart data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
