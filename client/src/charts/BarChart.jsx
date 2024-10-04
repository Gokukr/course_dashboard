// BarChart.js
import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ marks }) => {
  const chartOptions = {
    chart: {
      type: "bar",
      height: 250,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: marks.map((mark) => mark.course_name), // Using 'name' for the x-axis
    },
    colors: ["#E4B1F0"], // Color palette
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val} marks`; // Custom tooltip format
        },
      },
    },
    title: {
      text: "Employee Marks Overview",
      align: "center",
      style: {
        color: "#433878",
        fontSize: "20px",
      },
    },
  };

  const chartData = [
    {
      name: "Marks Obtained",
      data: marks.map((mark) => mark.marks.mark1 || 0), // Extracting 'mark1', setting default 0 if null
    },
  ];

  return (
    <div className="bg-whiter p-6 shadow-md rounded-md">
      <Chart
        options={chartOptions}
        series={chartData}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BarChart;
