import {
  Chart as ChartJS, ArcElement, Tooltip, Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import React from 'react';
// import {useState} from 'react';

// export NODE_OPTIONS=--openssl-legacy-provider

ChartJS.register(ArcElement, Tooltip, Legend);

const DistribDonut = () => {
  // should be props eventually
  const doneDistribs = ['ART', 'SLA'];
  const doneDistribsNum = doneDistribs.length;// eventually need to code something that differentiates labs and non labs
  const totalDistribs = 11;
  const percentDone = (doneDistribsNum / totalDistribs) * 100;
  const percentNotDone = 100 - percentDone;

  const distribData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [percentDone, percentNotDone],
        backgroundColor: ['#36A2EB', '#FF6384'],
      }
    ],
  };

  // setRequirements(['ART', 'LIT', 'TMV', 'INT', 'SOC', 'SOC','QDS', 'SLA', 'SCI', 'TAS', 'TLA']);

  return (
    <div>
      <p>Distributive Progress</p>
      <Doughnut
        data={distribData}
      />
    </div>
  );
};
export default DistribDonut;
