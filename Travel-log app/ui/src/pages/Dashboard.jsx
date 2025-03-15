import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalLogs, setTotalLogs] = useState(0);
  const [logs, setLogs] = useState([]);


  const fetchTotalUsers = async () => {
    try {
      const response = await fetch("http://localhost:6005/totalUsers");
      const data = await response.json();
      setTotalUsers(data.totalUsers);
    } catch (error) {
      console.error("Error fetching total users:", error);
    }
  };


  const fetchTotalLogs = async () => {
    try {
      const response = await fetch("http://localhost:6005/totalLogs");
      const data = await response.json();
      setTotalLogs(data.totalLogs);
    } catch (error) {
      console.error("Error fetching total logs:", error);
    }
  };


  const fetchLogs = async () => {
    try {
      const response = await fetch("http://localhost:6005/getLogs");
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };


  const deleteLog = async (logId) => {
    try {
      await fetch(`http://localhost:6005/deleteLog/${logId}`, { method: "DELETE" });
      setLogs(logs.filter(log => log._id !== logId));
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  useEffect(() => {
    fetchTotalUsers();
    fetchTotalLogs();
    fetchLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-3xl mt-2">{totalUsers}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Total Logs</h3>
          <p className="text-3xl mt-2">{totalLogs}</p>
        </div>
      </div>


      <Link to="/getlog">
        <h3 className="text-2xl font-semibold mb-4 cursor-pointer hover:text-blue-500 transition">
          User Logs
        </h3>
      </Link>
      <div className="overflow-auto bg-white p-4 shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-300">
              <th className="p-3 border">Place Name</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Date of Travel</th>
              <th className="p-3 border">Rating</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-3">No logs found</td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log._id} className="border">
                  <td className="p-3 border">{log.placename}</td>
                  <td className="p-3 border">{log.category}</td>
                  <td className="p-3 border">{new Date(log.dateoftravel).toLocaleDateString()}</td>
                  <td className="p-3 border">{log.rating} / 5</td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => deleteLog(log._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
