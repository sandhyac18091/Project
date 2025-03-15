import React from "react";
import contact from '../assets/banner-two.jpg';
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer'

const ContactUs = () => {
  
  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg flex overflow-hidden mt-10 min-h-[800px]">
        
        <div className="w-1/2 p-14 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-green-800">Contact</h2>
          <p className="text-gray-600 mt-2 text-lg">
            Tel: <span className="text-green-600">123-456-7890</span> | 
            <a href="mailto:info@my-domain.com" className="text-green-600 ml-1">info@my-domain.com</a>
          </p>

          
          <form className="mt-6 space-y-6">
            <div className="flex space-x-6">
              <input type="text" placeholder="First name *" className="w-1/2 p-4 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input type="text" placeholder="Last name *" className="w-1/2 p-4 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="flex space-x-6">
              <input type="email" placeholder="Email *" className="w-1/2 p-4 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input type="text" placeholder="Phone" className="w-1/2 p-4 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <textarea placeholder="Message" rows="5" className="w-full p-4 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
            <button className="bg-green-700 text-white w-full py-3 text-lg rounded-md hover:bg-green-800 transition">Submit</button>
          </form>
        </div>

        
        <div className="w-1/2">
          <img src={contact} alt="contactus" className="w-full h-full object-cover" />
        </div>
      </div>
      
    </div>
    <Footer />
    </>
  );
 
};

export default ContactUs;
