import React from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// ChartJS.register(ArcElement, Tooltip, Legend);
"use client"
import { Box } from '@chakra-ui/react'
import { Chart, useChart } from "@chakra-ui/charts"
import { Cell, Label, Pie, PieChart, Tooltip } from "recharts"


// const ThreadGaugeChart = ({ value, total, label, color }) => {
//   const percentage = Math.min((value / total) * 100, 100);
//   const data = {
//     labels: [label, 'Other Threads'],
//     datasets: [
//       {
//         data: [value, total - value],
//         backgroundColor: [color, '#e5e7eb'],
//         borderWidth: 0,
//         circumference: 180,
//         rotation: 270,
//         cutout: '70%',
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         callbacks: {
//           label: (ctx) => `${ctx.label}: ${ctx.raw}`,
//         },
//       },
//     },
//   };

//   return (
//     <div style={{ position: 'relative', width: '200px', height: '200px' }}>
//       <Doughnut data={data} options={options} />
//       <div className="text-center mt-1 zIndex-10" style={{ position: 'relative', top: '-120px',marginTop: '20px'}}>
//         <p style={{ fontSize: '30px', fontWeight: '600' }}>{value}</p>
//         <p style={{ fontSize: '14px', fontWeight: '700', color: '#959595ff',marginTop: '20px' }}>{label}</p>
//       </div>
//     </div>
//   );
// };



const ThreadGaugeChart = ({value,label,total,color}) => {
  const chart = useChart({
    data: [
      { name: label, value: value, color: color },
      { name: "Other Threads", value: total-value, color: "white" },
    ],
  })

  return (
    <Box   >
    <Chart.Root boxSize="200px" chart={chart} mx="auto" width="200px" height="200px">
      <PieChart>
        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<Chart.Tooltip hideLabel />}
        />
        <Pie
          innerRadius={60}
          outerRadius={100}
          isAnimationActive={true}
          data={chart.data}
          dataKey={chart.key("value")}
          nameKey="name"
          startAngle={180}
          endAngle={0}
            paddingAngle={8}
          cornerRadius={4}
        >
          {chart.data.map((item) => (
            <Cell key={item.name} fill={chart.color(item.color)} />
          ))}
        </Pie>
      </PieChart>
    </Chart.Root>
     <div style={{ position: 'relative', top: '-140px' , height: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <p style={{ fontSize: '30px', fontWeight: '600' }}>{value}</p>
        <p style={{ fontSize: '14px', fontWeight: '700', color: '#959595ff',marginTop: '20px' }}>{label}</p>
     </div>
    </Box>
  )
}


export default ThreadGaugeChart;
