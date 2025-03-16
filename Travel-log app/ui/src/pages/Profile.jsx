import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("http://localhost:7005/profile", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });

                const data = await response.json();
                console.log("Profile Data:", data);

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch profile");
                }

                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    
    const handleLogout = () => {
        localStorage.removeItem("token"); 
        navigate("/login"); 
    };

    if (loading)
        return <p className="text-center text-lg font-semibold text-gray-600 ">Loading profile...</p>;

    if (error)
        return <p className="text-center text-red-500 font-semibold">Error: {error}</p>;

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Profile</h2>
            {user ? (
                <div className="space-y-4">
                    
                    <div className="flex justify-center items-center">
                        <img
                            src={user.profilePic || "/profile.jpg"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md object-cover"
                        />
                    </div>

                    
                    <p className="text-lg">
                        <strong className="text-gray-600">Name:</strong> {user.firstname}
                    </p>
                    
                    <p className="text-lg">
                        <strong className="text-gray-600">Username:</strong> {user.username}
                    </p>
                    <p className="text-lg">
                        <strong className="text-gray-600">Email:</strong> {user.email}
                    </p>

                    
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <p className="text-center text-gray-500">No user data available</p>
            )}
        </div>
    );
};

export default Profile;
