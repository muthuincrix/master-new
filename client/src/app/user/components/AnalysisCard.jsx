import { Paper, Stack } from "@mui/material";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  ArcElement
} from "chart.js";
import { useEffect, useState } from "react";
import { Radar,Doughnut } from "react-chartjs-2";
import {chartColors} from '../../../util/colors'


ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
   // Legend
);




export default function AnalysisCard({ MD ,analysis}) {

 const subName = () =>{
  const list = []
  analysis.topicName.map((task) =>list.push(task))
  return list
}

const subMark = () =>{
  const list = []

  analysis.topicAnalysis.map((task) =>list.push(task))
  return list
}
 
const options = {
  legend: {
    display: true,
    position: "bottom"
  },
  elements: {
    arc: {
      borderWidth: 0
    }
  }
};
  const data = {
    labels: 
    subName()
    ,
    maintainAspectRatio: false,
    responsive: false,
    datasets: [
      {
        data:subMark(),
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors
        // backgroundColor: "#FEA80060",
        // borderColor: "#FEA800",
        // borderWidth: 2,
      },
    ],
  };

  return (
   data.labels.length !==0  && 
    <Paper
      elevation={MD ? 0 : 2}
      sx={{
        borderRadius: MD ? 0 : "20px",
        overflow: "hidden",
        padding: MD ? 0 : "20px",
        marginTop: "20px",
      }}
    >
      <h3
        style={{
          fontSize: MD ? "18px" : "22px",
          fontWeight: "600",
          color: "#656565",
          marginBottom: "10px",
          padding: MD ? "20px" : 0,
        }}
      >
        Overall Analysis
      </h3>
      <Stack
        direction="column"
        alignItems="center"
        sx={{
          maxHeight: MD ? "300px" : "400px",
        }}
      >
        {/* <Radar data={data} /> */}
        <Doughnut data={data} options={options} />
      </Stack>
    </Paper>
  );
}
