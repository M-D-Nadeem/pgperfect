import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

import axiosInstance from '../helper/axiosInstance';

const ComplaintsChart = () => {
  const [summary, setSummary] = useState({});
  const [propertySummary, setPropertySummary] = useState([]);

  // Define a color palette to be used for different segments
  const colorPalette = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

  useEffect(() => {
    const fetchComplaintsData = async () => {
      try {
        const response = await axiosInstance.get('/helper/complainSummery');
        setSummary(response.data.data);
      } catch (error) {
        console.error('Error fetching complaints data:', error);
      }
    };

    const fetchComplaintsDataByProperty = async () => {
      try {
        const response = await axiosInstance.get('/helper/complainSummeryByProperty');
        setPropertySummary(response.data.data);
      } catch (error) {
        console.error('Error fetching complaints data by property:', error);
      }
    };

    fetchComplaintsData();
    fetchComplaintsDataByProperty();
  }, []);

  const pieData = {
    labels: ['Cleaning', 'Food', 'Maintenance', 'Noise', 'Other'],
    datasets: [
      {
        data: [
          summary.cleaning || 0,
          summary.food || 0,
          summary.maintenance || 0,
          summary.noise || 0,
          summary.other || 0,
        ],
        backgroundColor: colorPalette, // Use the color palette for the summary chart
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: (context) => context.dataset.data[context.dataIndex] > 0,
        color: 'white',
        formatter: (value, context) => {
          return context.chart.data.labels[context.dataIndex];
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.raw !== null) {
              label += context.raw;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className='flex h-full w-full'>
      <div className="category flex flex-col items-center w-1/2 my-10">
        <h2 className='text-xl font-semibold'>Complaints by Category</h2>
        <div className='my-5 flex h-[50%] w-[50%] hover:scale-110 duration-500'>
          <Pie data={pieData} options={options} />
        </div>
      </div>
      <div className="property w-1/2 h-full flex flex-col items-center my-10">
        <h2 className='text-xl font-semibold my-1'>Complaints by Property</h2>
        <div className='flex flex-col items-center justify-center gap-2 w-full h-[90%]'>
          {propertySummary.map((property, index) => (
            <div className='h-1/2 w-1/2' key={property.property}>
              <h3 className='text-md font-semibold my-1'>{property.name}</h3>
              <div className='h-full w-full hover:scale-110 duration-500'>
                <Pie
                  data={{
                    labels: ['Cleaning', 'Food', 'Maintenance', 'Noise', 'Other'],
                    datasets: [
                      {
                        data: [
                          property.cleaning || 0,
                          property.food || 0,
                          property.maintenance || 0,
                          property.noise || 0,
                          property.other || 0,
                        ],
                        backgroundColor: colorPalette, // Use the color palette for the property chart
                      },
                    ],
                  }}
                  options={options}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplaintsChart;
