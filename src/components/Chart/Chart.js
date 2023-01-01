import React from "react";
import "./Chart.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
function Chart(props) {
  const year = props.dt.year;
  const month =
    new Date(Date.parse(props.dt.month + " 1, 2012")).getMonth() + 1;
  const d = new Date(year, month, 0).getDate();
  const labelArray = [];
  const graphData = [];
  for (let i = 0; i < d; i++) {
    labelArray.push(i + 1);
    graphData.push(0);
  }
  props.data.map((data) => {
    graphData[Number(data.date.getDate()) - 1] =
      graphData[Number(data.date.getDate()) - 1] !== 0
        ? graphData[Number(data.date.getDate()) - 1] + Number(data.amount)
        : Number(data.amount);
    return graphData;
  });
  const data = {
    labels: labelArray.map((item) => {
      return `Day: ${item}`;
    }),
    datasets: [
      {
        label: "Your Expenses",
        data: graphData,
        fill: false,
        backgroundColor: "#9388a2",
        borderColor: "#341948",
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className="chartContainer">
      <Bar data={data} />
    </div>
  );
}

export default Chart;
