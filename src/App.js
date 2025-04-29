import './App.css';
import ChartComponent from './Chart';
import { useState } from 'react';

function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [barColor, setBarColor] = useState('rgba(75, 192, 192, 0.2)');
  const [chartType, setChartType] = useState('bar'); // Default chart type
  const [selectedField, setSelectedField] = useState(''); // New state for selected field

  const handleFileUpload = (event) => {
    setLoading(true);
    setError('');
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const content = reader.result;

      if (file.name.endsWith('.json')) {
        try {
          const jsonData = JSON.parse(content);
          const processedData = Array.isArray(jsonData) ? jsonData : [jsonData];
          setData(processedData);
        } catch (error) {
          setError('Invalid JSON file.');
        }
      } else if (file.name.endsWith('.csv')) {
        const rows = content.split('\n').filter((row) => row.trim() !== '');
        const headers = rows[0].split(',');

        const csvData = rows.slice(1).map((row) => {
          const values = row.split(',');
          if (values.length === headers.length) {
            const obj = {};
            headers.forEach((header, index) => {
              obj[header.trim()] = values[index].trim();
            });
            return obj;
          }
          return null;
        }).filter((row) => row);

        if (csvData.length > 0) {
          setData(csvData);
        } else {
          setError('Invalid CSV file or empty data.');
        }
      } else {
        setError('Please upload a valid .json or .csv file.');
      }

      setLoading(false);
    };

    reader.readAsText(file);
  };

  return (
    <div className="app-container">
      <label className="custom-upload" htmlFor="upload">
        Upload File (csv or json)
      </label>
      <input
        id="upload"
        style={{ display: 'none' }}
        type="file"
        onChange={(e) => handleFileUpload(e)}
      />
      {loading && <div className="spinner"></div>}
      {error && <p className="error-message">{error}</p>}
      {data ? (
        <div>
          <select onChange={(e) => setChartType(e.target.value)} value={chartType}>
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="pie">Pie Chart</option>
            <option value="doughnut">Doughnut Chart</option>
            <option value="radar">Radar Chart</option>
            <option value="bubble">Bubble Chart</option>
            <option value="scatter">Scatter Chart</option>
          </select>

          {/* New dropdown to choose FIELD */}
          <select
            onChange={(e) => setSelectedField(e.target.value)}
            value={selectedField}
          >
            <option value="">Select Field to Plot</option>
            {Object.keys(data[0]).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>

          <ChartComponent
            data={data}
            barColor={barColor}
            chartType={chartType}
            selectedField={selectedField}
          />
        </div>
      ) : (
        <p className="no-file-message">Please Enter A File</p>
      )}

      {data && <>
        <label>Choose Bar Color</label>
        <input
          type="color"
          value={barColor}
          onChange={(e) => setBarColor(e.target.value)}
        />
      </>
      }
    </div>
  );
}

export default App;
