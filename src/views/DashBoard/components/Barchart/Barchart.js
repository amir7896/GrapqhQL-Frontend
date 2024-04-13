import React from "react";
import { Bar } from "react-chartjs-2";
const Barchart = (props) => {
  const { data } = props;
  return (
    <div>
      <h2>Bar Chart Example</h2>
      <Bar data={data} />
    </div>
  );
};

export default Barchart;
