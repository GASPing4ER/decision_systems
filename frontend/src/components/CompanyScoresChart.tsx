import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

const CompanyScoresChart = ({ chartData }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (chartData) {
      const ctx = document.getElementById("companyScoresChart");

      // Create the chart instance if not created already
      if (!chart) {
        const newChart = new ChartJS(ctx, {
          type: "bar",
          data: {
            labels: chartData.labels, // Company names
            datasets: [
              {
                label: "Company Scores",
                data: chartData.scores, // Company scores
                backgroundColor: "rgba(75, 192, 192, 0.2)", // Bar color
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Company Name",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Score",
                },
                beginAtZero: true,
              },
            },
          },
        });

        setChart(newChart);
      } else {
        // Update chart data if the chart already exists
        chart.data.labels = chartData.labels;
        chart.data.datasets[0].data = chartData.scores;
        chart.update();
      }
    }
  }, [chartData, chart]);

  return (
    <div>
      <canvas id="companyScoresChart" width="400" height="200"></canvas>
    </div>
  );
};

export default CompanyScoresChart;
