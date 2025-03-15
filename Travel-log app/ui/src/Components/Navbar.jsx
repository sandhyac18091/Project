import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import travellog from "../assets/airplane.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="w-full bg-gray-900 flex items-center justify-between px-6 py-4 md:px-10 relative">
      
     
      <Link to="/home" className="flex items-center">
        <img src={travellog} alt="Logo" className="h-12 w-auto mr-2" />
        <span className="text-white text-2xl font-bold font-serif tracking-wide">TripTales</span>
      </Link>

      
      <div className="hidden md:flex space-x-8">
        <Link to="/home" className="text-white text-lg font-serif hover:text-gray-400">Home</Link>
        <Link to="/search-log" className="text-white text-lg font-serif hover:text-gray-400">Search</Link>
        <Link to="/getlog" className="text-white text-lg font-serif hover:text-gray-400">View Log</Link>
        <Link to="/contact-us" className="text-white text-lg font-serif hover:text-gray-400">Contact Us</Link>
        <Link to="/mylog" className="text-white text-lg font-serif hover:text-gray-400">Mylog</Link>
        <Link to="/fav" className="text-white text-lg font-serif hover:text-gray-400">Favorite</Link>
      </div>

      
      <button onClick={() => navigate('/profile')} className="hidden md:block text-white text-xl hover:text-gray-400">
        <FontAwesomeIcon icon={faUser} />
      </button>

      
      <button onClick={toggleMenu} className="md:hidden text-white text-2xl">
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </button>

     
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 flex flex-col items-center py-6 space-y-4 md:hidden z-50">
          <Link to="/home" className="text-white text-lg font-serif hover:text-gray-400" onClick={toggleMenu}>Home</Link>
          <Link to="/search-log" className="text-white text-lg font-serif hover:text-gray-400" onClick={toggleMenu}>Search</Link>
          <Link to="/getlog" className="text-white text-lg font-serif hover:text-gray-400" onClick={toggleMenu}>View Log</Link>
          <Link to="/contact-us" className="text-white text-lg font-serif hover:text-gray-400" onClick={toggleMenu}>Contact Us</Link>
          <Link to="/mylog" className="text-white text-lg font-serif hover:text-gray-400" onClick={toggleMenu}>Mylog</Link>
          <Link to="/fav" className="text-white text-lg font-serif hover:text-gray-400" onClick={toggleMenu}>Favorite</Link>
          <button onClick={() => { navigate('/profile'); toggleMenu(); }} className="text-white text-xl hover:text-gray-400">
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
