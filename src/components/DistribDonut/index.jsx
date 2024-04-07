import {
  Chart as ChartJS, ArcElement, Tooltip, Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import React, { useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const DistribDonut = () => {
  // <div>Distribs</div>
  // const [options, setOptions] = useState([]);
  const [data, setData] = useState([]);
  setData(['ART', 'LIT']);

  return (
    <Doughnut
      options={['ART', 'LIT', 'TMV', 'INT', 'SOC', 'QDS', 'SLA', 'SCI', 'TAS', 'TLA']} // need to check that you have at least one "_LA" class
      data={data}
      {...props}
    />
  );
};
export default DistribDonut;
