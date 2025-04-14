import React from 'react';
import { Bar, Line, Pie, Doughnut, Radar, Bubble, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { saveAs } from 'file-saver'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const ChartComponent = ({ data, barColor, chartType }) => {
  const chartData = {
    labels: data.map(item => item.Name),
    datasets: [
      {
        label: 'Scores',
        data: data.map(item => item.Score),
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
  };

  // Function to download chart data as JSON
  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(chartData)], { type: 'application/json' });
    saveAs(blob, 'chartData.json');
  };

  // Function to download chart data as CSV
  const downloadCsv = () => {
    const headers = ['Name', 'Score'];
    const rows = data.map(item => [item.Name, item.Score]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(blob, 'chartData.csv');
  };

  // Function to download chart as an image
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

  switch (chartType) {
    case 'line':
      return (
        <div>
          <Line data={chartData} options={chartOptions} />
          <button className="download-btn" onClick={downloadJson}>Download JSON</button>
          <button className="download-btn" onClick={downloadCsv}>Download CSV</button>
          <button className="download-btn" onClick={downloadImage}>Download Image</button>
        </div>
      );
    case 'pie':
      return (
        <div>
          <Pie data={chartData} options={chartOptions} />
          <button className="download-btn" onClick={downloadJson}>Download JSON</button>
          <button className="download-btn" onClick={downloadCsv}>Download CSV</button>
          <button className="download-btn" onClick={downloadImage}>Download Image</button>
        </div>
      );
    case 'doughnut':
      return (
        <div>
          <Doughnut data={chartData} options={chartOptions} />
          <button className="download-btn" onClick={downloadJson}>Download JSON</button>
          <button className="download-btn" onClick={downloadCsv}>Download CSV</button>
          <button className="download-btn" onClick={downloadImage}>Download Image</button>
        </div>
      );
    case 'radar':
      return (
        <div>
          <Radar data={chartData} options={chartOptions} />
          <button className="download-btn" onClick={downloadJson}>Download JSON</button>
          <button className="download-btn" onClick={downloadCsv}>Download CSV</button>
          <button className="download-btn" onClick={downloadImage}>Download Image</button>
        </div>
      );
    case 'bubble':
      return (
        <div>
          <Bubble data={chartData} options={chartOptions} />
          <button className="download-btn" onClick={downloadJson}>Download JSON</button>
          <button className="download-btn" onClick={downloadCsv}>Download CSV</button>
          <button className="download-btn" onClick={downloadImage}>Download Image</button>
        </div>
      );
    case 'scatter':
      return (
        <div>
          <Scatter data={chartData} options={chartOptions} />
          <button className="download-btn" onClick={downloadJson}>Download JSON</button>
          <button className="download-btn" onClick={downloadCsv}>Download CSV</button>
          <button className="download-btn" onClick={downloadImage}>Download Image</button>
        </div>
      );
    case 'bar':
    default:
      return (
        <div>
          <Bar data={chartData} options={chartOptions} />
          <button className="download-btn" onClick={downloadJson}>Download JSON</button>
          <button className="download-btn" onClick={downloadCsv}>Download CSV</button>
          <button className="download-btn" onClick={downloadImage}>Download Image</button>
        </div>
      );
  }
};

export default ChartComponent;
