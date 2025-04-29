import React from 'react';
import { Bar, Line, Pie, Doughnut, Radar, Bubble, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, RadialLinearScale } from 'chart.js';
import { saveAs } from 'file-saver';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, 
  PointElement,
  LineElement,
  RadialLinearScale 
);

const ChartComponent = ({ data, barColor, chartType, selectedField }) => {
  if (!data || data.length === 0) {
    return <div>No data available for chart</div>;
  }

  const fieldToPlot = selectedField || Object.keys(data[0])[1] || Object.keys(data[0])[0];

  const chartData = {
    labels: data.map(item => item.name),  
    datasets: [
      {
        label: fieldToPlot,
        data: data.map(item => {
          const value = item[fieldToPlot];
          return typeof value === 'string' && !isNaN(value) ? parseFloat(value) : value;
        }),
        backgroundColor: barColor || 'rgba(75, 192, 192, 0.2)',
        borderColor: barColor || 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        beginAtZero: true, 
        pointLabels: {
          display: true, 
          font: {
            size: 14, 
          },
        },
      },
    },
  };


  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    saveAs(blob, 'chartData.json');
  };


  const downloadCsv = () => {
    const headers = Object.keys(data[0]);
    const rows = data.map(item => headers.map(key => item[key]));

    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(blob, 'chartData.csv');
  };

  const downloadImage = () => {
    const chartCanvas = document.querySelector('canvas');
    if (chartCanvas) {
      const imageUrl = chartCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'chartImage.png';
      link.click();
    }
  };

  const renderButtons = () => (
    <div style={{ marginTop: '20px' }}>
      <button className="download-btn" onClick={downloadJson}>Download JSON</button>
      <button className="download-btn" onClick={downloadCsv}>Download CSV</button>
      <button className="download-btn" onClick={downloadImage}>Download Image</button>
    </div>
  );

  switch (chartType) {
    case 'line':
      return (
        <div>
          <Line data={chartData} options={chartOptions} />
          {renderButtons()}
        </div>
      );
    case 'pie':
      return (
        <div>
          <Pie data={chartData} options={chartOptions} />
          {renderButtons()}
        </div>
      );
    case 'doughnut':
      return (
        <div>
          <Doughnut data={chartData} options={chartOptions} />
          {renderButtons()}
        </div>
      );
    case 'radar':
      return (
        <div>
          <Radar data={chartData} options={chartOptions} />
          {renderButtons()}
        </div>
      );
    case 'bubble':
      return (
        <div>
          <Bubble data={chartData} options={chartOptions} />
          {renderButtons()}
        </div>
      );
    case 'scatter':
      return (
        <div>
          <Scatter data={chartData} options={chartOptions} />
          {renderButtons()}
        </div>
      );
    case 'bar':
    default:
      return (
        <div>
          <Bar data={chartData} options={chartOptions} />
          {renderButtons()}
        </div>
      );
  }
};

export default ChartComponent;
