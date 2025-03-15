import React from "react";
import { Link } from "react-router-dom";
import videoBg from "../assets/travel-bg.mp4"; 

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      
      <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center md:items-start justify-center px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center md:text-left md:ml-52 font-serif text-gray-200 ">
          Welcome to the TripTales
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 mt-4 max-w-lg text-center md:text-left md:ml-52 font-serif">
          Discover amazing destinations, plan your trips, and create unforgettable memories.
        </p>
        <Link
          to="/getlog"
          className="mt-6 inline-block bg-white text-gray-800 px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-400 hover:text-white transition duration-300 md:ml-52 font-serif"
        >
          Explore Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
