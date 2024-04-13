import React from "react";
import { Pie } from "react-chartjs-2";

const Piechart = (props) => {
  const { data } = props;
  return (
    <div>
      <h2>Pie Chart</h2>
      <Pie data={data} />
    </div>
  );
};

export default Piechart;
