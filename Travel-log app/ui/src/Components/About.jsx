import React from "react";
import aboutus from "../assets/co.avif";

const About = () => {
  return (
    <section className="flex justify-center items-center py-12 bg-gray-200">
      <div className="w-full max-w-[90rem] bg-white shadow-lg flex flex-col lg:flex-row overflow-hidden mt-10 lg:min-h-[800px] rounded-lg">
        
        
        <div className="w-full lg:w-1/2 h-[250px] sm:h-[400px] lg:h-auto">
          <img src={aboutus} alt="About Us" className="w-full h-full object-cover" />
        </div>

        
        <div className="w-full lg:w-1/2 p-6 sm:p-12 lg:p-16 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 font-serif text-center lg:text-left">
            About Us
          </h2>
          <p className="text-gray-600 mt-4 sm:mt-6 text-lg sm:text-xl leading-relaxed font-mono text-center lg:text-left">
            Welcome to <span className="text-green-600 font-semibold">TripTales</span>, Welcome to Travel Log, your ultimate companion for capturing and sharing unforgettable travel experiences! Our platform is designed for adventurers, explorers, and wanderers who love to document their journeys, discover new destinations, and inspire others. Whether you're a solo traveler, a backpacker, or a family vacationer, Travel Log helps you create a digital diary of your travels, complete with photos, ratings, and detailed descriptions.
          </p>
          <p className="text-gray-600 mt-4 text-lg sm:text-xl leading-relaxed font-mono text-center lg:text-left">
            At Travel Log, we believe that every journey tells a story. Our mission is to make it easy for travelers to keep track of their experiences, revisit cherished memories, and connect with a community of like-minded explorers. Join us in celebrating the beauty of travel, one log at a time!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
