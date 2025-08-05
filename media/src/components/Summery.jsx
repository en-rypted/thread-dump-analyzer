import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

export const Summery = ({ summary }) => {
   const labels = ['Runnable', 'Waiting', 'Timed Waiting', 'Blocked', 'Deadlocked'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Thread State Count',
        data: [
          summary.runnableThreads || 0,
          summary.waitingThreads || 0,
          summary.timedWaitingThreads || 0,
          summary.blockedThreads || 0,
          summary.deadlockedThreads || 0,
        ],
        backgroundColor: [
          '#70ff75ff',   // Runnable - Green
          '#feee5aff',   // Waiting - Yellow
          '#4baeffff',   // Timed Waiting - Blue
          '#222222ff',   // Blocked - Red
          '#b02727ff',   // Deadlocked - Purple
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div style={{ width: '400px', margin: '0 auto' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};
