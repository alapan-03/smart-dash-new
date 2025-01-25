import React, { useEffect, useState } from 'react';
import axios from 'axios';
import url from "./../../url";
import { useParams } from 'react-router-dom';

function Leaderboard() {
  const { assignId } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${url}/student/leaderboard/${assignId}`);
        console.log(response.data);
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard', error);
      }
    };

    fetchLeaderboard();
  }, [assignId]);

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Leaderboard</h2>
      <div className="bg-white shadow-md rounded-lg w-full max-w-2xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Taken (s)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaderboard.map((submission, index) => (
              <tr key={submission._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{submission.studentId.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{submission.correctAnswers} points</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{submission.timeTaken} seconds</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
