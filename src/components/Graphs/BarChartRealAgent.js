'use client'
import React, { useEffect, useState } from 'react';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { obtenerTopAgentes } from '@/lib/processData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


export default function BarChartRealAgent({
    dataUsuarios = [],
    dataPropiedades=[]
}) {
    const [topAgents, setTopAgents] = useState([]);
    useEffect(()=>{
        if (dataUsuarios.length && dataPropiedades.length) {
          console.log(dataUsuarios, dataPropiedades);
          
            const resultado = obtenerTopAgentes(dataUsuarios, dataPropiedades);
            setTopAgents(resultado);
          }
    },[dataUsuarios, dataPropiedades]);

    const data = {
        labels: topAgents.map(agent => agent.name),
        datasets: [
          {
            label: 'Propiedades registradas',
            data: topAgents.map(agent => agent.properties),
            backgroundColor: '#3b82f6', // Azul Tailwind
            borderRadius: 8,
          },
        ],
    };
    const options = {
        indexAxis: 'y', // Horizontal
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: false,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: '#4b5563', // texto gris
              font: { size: 14 },
            },
          },
          y: {
            ticks: {
              color: '#4b5563',
              font: { size: 14 },
            },
          },
        },
      };
  return (
    <div className='w-full p-6 flex justify-center'>
        <Bar  data={data} options={options} />
    </div>
  )
}