import React from "react";
import { Line } from "react-chartjs-2";

const Linechart = ({ data }) => {
  return (
    <div>
      <h2>Line Chart</h2>
      <Line data={data} />
    </div>
  );
};

export default Linechart;
