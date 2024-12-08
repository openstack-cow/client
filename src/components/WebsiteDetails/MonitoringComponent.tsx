import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const MonitoringComponent = () => {
  const [cpuData, setCpuData] = useState<number[]>([]); // Store CPU usage values
  const [timestamps, setTimestamps] = useState<string[]>([]); // Store timestamps
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  // Simulate CPU usage data for demonstration (replace this with actual data from an API)
  const fetchCPUUsage = () => {
    const usage = Math.floor(Math.random() * 100); // Random CPU usage between 0-100%
    const timestamp = new Date().toLocaleTimeString();

    // Update state with new data
    setCpuData((prev) => [...prev.slice(-19), usage]); // Keep the last 20 data points
    setTimestamps((prev) => [...prev.slice(-19), timestamp]);
  };

  useEffect(() => {
    // Start fetching CPU data at regular intervals
    intervalRef.current = setInterval(fetchCPUUsage, 1000);

    return () => {
      // Clear the interval on component unmount
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const data = {
    labels: timestamps, // X-axis: Timestamps
    datasets: [
      {
        label: "CPU Usage (%)",
        data: cpuData, // Y-axis: CPU usage values
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "CPU Usage (%)",
        },
        min: 0,
        max: 100, // CPU usage percentage range
      },
    },
  };

  return (
    <div className="chart-container">
      <h4>Real-Time CPU Usage</h4>
      <Line data={data} options={options} />
    </div>
  );
};

export default MonitoringComponent;
