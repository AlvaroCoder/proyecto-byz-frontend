import React from 'react'

import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartProjects({
    data=[]
}) {
    const dataPieChart= {
        labels: [
            'Preventa disponible',
            'Venta disponible',
            'Vendido'
          ],
        datasets: [
          {
            label: 'Proyectos',
            data, // ← valores de ejemplo
            backgroundColor: [
              '#22c55e', // verde
              '#3b82f6', // azul
              '#ef4444', // rojo
            ],
            borderColor: '#ffffff',
            borderWidth: 2,
          },
        ],
    }
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#374151', // texto gris oscuro
              font: {
                size: 14,
                weight: '500',
              },
            },
          },
        },
    };
  return (
    <div className='w-full p-6 mx-auto flex justify-center '>
        <Pie data={dataPieChart} options={options} />
    </div>
  )
}