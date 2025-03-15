import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const FavoritePage = () => {
    const [favoriteLogs, setFavoriteLogs] = useState([]);

    useEffect(() => {
        const fetchFavoriteLogs = async () => {
            try {
                const response = await fetch("http://localhost:6005/getFavoriteLogs");
                const data = await response.json();
                setFavoriteLogs(data);
            } catch (error) {
                console.error("Error fetching favorite logs:", error);
            }
        };
        fetchFavoriteLogs();
    }, []);

    const toggleFavorite = async (id) => {
        try {
            const response = await fetch(`http://localhost:6005/toggleFavorite/${id}`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                const updatedLog = await response.json();
                setFavoriteLogs((prevLogs) =>
                    prevLogs.map((log) =>
                        log._id === id ? { ...log, favorite: updatedLog.log.favorite } : log
                    )
                );
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-10">
                <h2 className="text-4xl font-bold text-center mb-10 font-serif">
                    Favorite Logs
                </h2>
                {favoriteLogs.length === 0 ? (
                    <p className="text-center text-lg font-medium">No favorite logs found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                        {favoriteLogs.map((log) => (
                            <div
                                key={log._id}
                                className="relative max-w-md bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
                            >
                                {log.image && (
                                    <img
                                        src={`data:image/png;base64,${log.image}`}
                                        alt={log.placename}
                                        className="w-full h-56 object-cover"
                                    />
                                )}
                                <div className="p-6 font-sans">
                                    <h3 className="text-2xl font-semibold text-gray-800">
                                        {log.placename}
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-1">
                                        <strong>Category:</strong> {log.category}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        <strong>Travel Date:</strong> {new Date(log.dateoftravel).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-600 text-base mt-3 leading-relaxed">
                                        {log.description.substring(0, 100)}...
                                    </p>
                                    <div className="flex items-center mt-3 text-yellow-500 text-lg">
                                        <span>{log.rating} / 5</span>
                                    </div>
                                    <button
                                        className={`mt-4 px-4 py-2 rounded-lg text-white ${log.favorite ? 'bg-red-500' : 'bg-gray-400'}`}
                                        onClick={() => toggleFavorite(log._id)}
                                    >
                                        {log.favorite ? 'Unfavorite' : 'Favorite'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default FavoritePage;
