import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faStar,  faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

const SearchLog = () => {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [expanded, setExpanded] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("/api/getallLog", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to fetch logs");
        const data = await response.json();
        setLogs(data);
        setFilteredLogs(data);
        setExpanded(data.reduce((acc, log) => ({ ...acc, [log._id]: false }), {}));
        
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };
    fetchLogs();
  }, []);

  useEffect(() => {
    const results = logs.filter(log =>
      log.placename.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLogs(results);
  }, [searchTerm, logs]);

  return (
    <>
     
      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <h2 className="text-4xl font-bold text-center mb-10 font-serif">Search Travel Logs</h2>
        <div className="w-full flex items-center gap-3 mb-6 justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search by place name..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 shadow-md bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            />
          </div>
          <div
            onClick={() => navigate("/categories")}
            className="bg-black text-white p-3 hover:bg-black shadow-lg transition cursor-pointer rounded-lg"
          >
            <FontAwesomeIcon icon={faPlus} className="text-xl" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {filteredLogs.map(log => (
            <div key={log._id} className="relative max-w-md bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
              {log.image && (
                <img src={`data:image/png;base64,${log.image}`} alt={log.placename} className="w-full h-56 object-cover" />
              )}
              <div className="p-6 font-sans">
                <h3 className="text-2xl font-semibold text-gray-800">{log.placename}</h3>
                <p className="text-gray-500 text-sm mt-1"><strong>Category:</strong> {log.category}</p>
                <p className="text-gray-500 text-sm"><strong>Travel Date:</strong> {new Date(log.dateoftravel).toLocaleDateString()}</p>
                <p className="text-gray-600 text-base mt-3 leading-relaxed">
                  {expanded[log._id] ? log.description : `${log.description.substring(0, 100)}...`}
                </p>
                <button className="text-black font-bold underline mt-2" onClick={() => setExpanded(prev => ({ ...prev, [log._id]: !prev[log._id] }))}>
                  {expanded[log._id] ? "View Less" : "View More"}
                </button>
                <div className="flex items-center mt-3 text-yellow-500 text-lg">
                  <FontAwesomeIcon icon={faStar} className="mr-2" />
                  <span>{log.rating} / 5</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default SearchLog;
