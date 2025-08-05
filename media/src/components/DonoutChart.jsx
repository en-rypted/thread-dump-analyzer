"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { Box } from '@chakra-ui/react'
import { Cell, Label, Pie, PieChart, Tooltip } from "recharts"

const DonoutChart = ({data}) => {
  const chart = useChart({
    data
  })

  return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
    <Chart.Root boxSize="200px" chart={chart} mx="auto">
      <PieChart>
        <Tooltip
          cursor={false}
          animationDuration={100}
          content={<Chart.Tooltip hideLabel />}
        />
        <Pie
          innerRadius={80}
          outerRadius={100}
          isAnimationActive={true}
          data={chart.data}
          dataKey={chart.key("value")}
          paddingAngle={8}
          cornerRadius={4}
        > 
          {chart.data.map((item) => (
            <Cell key={item.name} fill={chart.color(item.color)} />
          ))}
        </Pie>
      </PieChart>
    </Chart.Root>
     <div className="text-center mt-1" style={{ position: 'relative', top: '-140px'}}>
        <p style={{ fontSize: '30px', fontWeight: '600' }}>{data.map(item => item.value).reduce((a, b) => a + b, 0)}</p>
        <p style={{ fontSize: '14px', fontWeight: '700', color: '#959595ff',marginTop: '10px' }}>{"Total Threads"}</p>
     </div>
    </Box>
  )
}

export default DonoutChart;