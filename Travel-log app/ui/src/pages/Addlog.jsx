import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Addlog = () => {
  const location = useLocation();

  const [category, setCategory] = useState(location.state?.selectedCategory || '');
  const [placename, setPlacename] = useState('');
  const [dateoftravel, setDateoftravel] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [logImage, setLogImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('Category', category);
      formData.append('Placename', placename);
      formData.append('Dateoftravel', dateoftravel);
      formData.append('Description', description);
      formData.append('Rating', rating);

      if (logImage) {
        formData.append('logImage', logImage);
      }

      const response = await fetch('http://localhost:7005/addlog', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Unknown error occurred');
      }

      alert('Log added successfully!');
      setCategory('');
      setPlacename('');
      setDateoftravel('');
      setDescription('');
      setRating('');
      setLogImage(null);
      document.getElementById('logImageInput').value = "";
    } catch (error) {
      console.error('Error:', error.message);
      alert('Something went wrong: ' + error.message);
    }
  };


  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto mt-12 p-8 bg-white shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Add Travel Log</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            className="w-full p-3 border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-black"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <input
            type="text"
            className="w-full p-3 border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Place Name"
            value={placename}
            onChange={(e) => setPlacename(e.target.value)}
            required
          />

          <input
            type="date"
            className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={dateoftravel}
            onChange={(e) => setDateoftravel(e.target.value)}
            required
          />

          <textarea
            className="w-full p-3 border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          ></textarea>

          <input
            type="number"
            className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Rating (1-5)"
            value={rating}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1 && value <= 5) {
                setRating(value);
              }
            }}
            min="1"
            max="5"
            required
          />


          <input
            id="logImageInput"
            type="file"
            accept="image/*"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
            onChange={(e) => setLogImage(e.target.files[0])}
          />

          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white font-semibold  hover:bg-green-700 transition-all duration-300"
          >
            Add Log
          </button>

        </form>

      </div>
    </>

  );
};

export default Addlog;
