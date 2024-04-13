import React from "react";
import { PolarArea } from "react-chartjs-2";

const Polarchart = ({ data }) => {
  return (
    <div>
      <h1>Polar Chart</h1>
      <PolarArea data={data} />
    </div>
  );
};

export default Polarchart;
