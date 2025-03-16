import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Editlog = () => {
  const { placename } = useParams();
  const navigate = useNavigate();

  const [dateoftravel, setDateoftravel] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const res = await fetch(`http://localhost:7005/getlog/${encodeURIComponent(placename)}`);
        if (!res.ok) {
          throw new Error("Failed to fetch log");
        }
        const data = await res.json();
        if (!data || !data.Placename) {
          throw new Error("Log not found");
        }

        setDateoftravel(data.Dateoftravel || "");
        setDescription(data.Description || "");
        setRating(data.Rating || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLog();
  }, [placename]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const updatedLog = {
        Placename: placename,
        Dateoftravel: dateoftravel,
        Description: description,
        Rating: rating,
      };

      const res = await fetch("http://localhost:7005/editlog", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLog),
      });

      if (!res.ok) {
        throw new Error("Failed to update log");
      }

      toast.success("Log updated successfully!");
      navigate("/getlog");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <div className="p-4">Loading log data...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <>
      <Navbar />
      <section className="bg-gray-100 py-10">
        <div className="container mx-auto max-w-lg">
          <div className="bg-white shadow-lg rounded-xl border p-8">
            <h2 className="text-2xl font-semibold text-purple-700 text-center mb-6">Update Log</h2>
            <form onSubmit={submitForm} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Date of Travel</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
                  required
                  value={dateoftravel}
                  onChange={(e) => setDateoftravel(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition resize-none"
                  rows="4"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Rating (1-5)</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
                  min="1"
                  max="5"
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>
              <div>
                <button
                  className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition"
                  type="submit"
                >
                  Update Log
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Editlog;