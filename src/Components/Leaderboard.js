// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Leaderboard({ assignmentId }) {
//   const [leaderboard, setLeaderboard] = useState([]);

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/student/leaderboard/${assignmentId}`);
//         console.log(response.data)
//         setLeaderboard(response.data);
//         console.log(leaderboard)
//       } catch (error) {
//         console.error('Error fetching leaderboard', error);
//       }
//     };

//     fetchLeaderboard();
//   }, [assignmentId]);

//   return (
//     <div>
//       <h2>Leaderboard</h2>
//       <ul>
//         {leaderboard.map((submission, index) => (
//           <li key={submission._id}>
//             {index + 1}. {submission.studentId.name} - {submission.correctAnswers} point - {submission.timeTaken} seconds
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// export default Leaderboard



import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Leaderboard = ({ data }) => {
  const dailyStudyTime = data?.timeSpent[0]?.daily[0]?.timeInMinutes || 0;
  const weeklyStudyTime = data?.timeSpent[0]?.weeklyAverage || 0;
  const dailyWatchTime = data?.totalWatchTime?.daily[0]?.timeInMinutes || 0;
  const weeklyWatchTime = data?.totalWatchTime?.weeklyAverage || 0;
  const totalAverageTime = (dailyStudyTime + dailyWatchTime) / 2;

  const pieData = {
    labels: ["Study Time", "Watch Time"],
    datasets: [
      {
        data: [dailyStudyTime, dailyWatchTime],
        backgroundColor: ["#4CAF50", "#2196F3"],
        hoverBackgroundColor: ["#45A049", "#1E88E5"],
      },
    ],
  };

  const barData = {
    labels: ["Daily Study", "Weekly Study", "Daily Watch", "Weekly Watch"],
    datasets: [
      {
        label: "Time in Minutes",
        data: [
          dailyStudyTime,
          weeklyStudyTime * 7, // weekly time to total weekly minutes
          dailyWatchTime,
          weeklyWatchTime * 7,
        ],
        backgroundColor: ["#4CAF50", "#45A049", "#2196F3", "#1E88E5"],
      },
    ],
  };

  if (!data) {
    return <h1>No data available</h1>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Daily Progress</h2>
            <p>Daily Study Time: {dailyStudyTime.toFixed(2)} minutes</p>
            <p>Daily Watch Time: {dailyWatchTime.toFixed(2)} minutes</p>
            <p>Total Daily Average: {totalAverageTime.toFixed(2)} minutes</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Weekly Averages</h2>
            <p>Weekly Study Time: {(weeklyStudyTime * 7).toFixed(2)} minutes</p>
            <p>Weekly Watch Time: {(weeklyWatchTime * 7).toFixed(2)} minutes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Time Distribution</h2>
            <div className="chart-container">
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Weekly Breakdown</h2>
            <div className="chart-container">
              <Bar data={barData} options={{ maintainAspectRatio: false }} />
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        .chart-container {
          position: relative;
          height: 300px;
          width: 100%;
        }

        @media (min-width: 768px) {
          .chart-container {
            height: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;