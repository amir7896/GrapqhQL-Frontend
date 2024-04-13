import React from "react";
import { Doughnut } from "react-chartjs-2";

const Doughnutchart = ({ data }) => {
  return (
    <div>
      <h1>Doughnut Chart</h1>
      <Doughnut data={data} />
    </div>
  );
};

export default Doughnutchart;
