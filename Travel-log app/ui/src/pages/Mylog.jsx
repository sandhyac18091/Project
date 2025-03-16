import { useEffect, useState } from 'react';

const LogPage = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await fetch("http://localhost:7005/myLogs", {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch logs");
                }

                const data = await response.json();
                setLogs(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    if (loading) return <p>Loading logs...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">My Logs</h2>
            {logs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {logs.map((log) => (
                        <div
                            key={log._id}
                            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
                        >
                            <h3 className="text-xl font-bold text-gray-700">{log.title}</h3>
                            <p className="text-gray-600 mt-2">{log.description}</p>
                            <div className="mt-4 text-right">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No logs found.</p>
            )}
        </div>
    );
};

export default LogPage;
