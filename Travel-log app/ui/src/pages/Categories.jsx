import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import desertImage from '../assets/desert.png'
import beachImage from '../assets/vacations.png'
import mountainImage from '../assets/mountain.png'
import forestImage from '../assets/forest.png'
import cityImage from '../assets/city.png'
import islandImage from '../assets/island.png'
import cultureImage from '../assets/cultures.png'
import wildImage from '../assets/forests.png'
import Footer from '../Components/Footer';



const Categories = () => {
  const navigate = useNavigate();

  const selectCategory = (category) => {
    navigate('/add-log', { state: { selectedCategory: category } }); 
  };

  return (
    <>
    <div className="flex flex-col items-center bg-gray-200 min-h-screen py-6">
    
    <header className="w-full bg-white py-6 shadow-md text-center text-3xl font-bold text-gray-800 font-serif">
      Select a Category
    </header>

   
    <main className="w-full max-w-6xl mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 font-mono">
      {[
        { name: 'Beach', image:  beachImage },
        { name: 'Mountain', image: mountainImage },
        { name: 'Forest', image: forestImage },
        { name: 'City', image: cityImage },
        { name: 'Desert', image: desertImage },
        { name: 'Island', image: islandImage },
        { name: 'Cultural Heritage', image: cultureImage },
        { name: 'Wildlife', image: wildImage },
        
      ].map((category, index) => (
        <div
          key={index}
          className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer w-64 h-64 flex flex-col items-center justify-center"
          onClick={() => selectCategory(category.name)}
        >
          <img src={category.image} alt={category.name} className="w-48 h-36 object-cover rounded-lg" />
          <h2 className="text-lg font-semibold mt-4">{category.name}</h2>
        </div>
      ))}
    </main>
  </div>
  <Footer/>
  </>
);
};

  


export default Categories;
