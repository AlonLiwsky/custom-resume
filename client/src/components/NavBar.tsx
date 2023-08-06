import React from 'react';
import { Link } from 'react-router-dom';


// Define the prop types
type NavBarProps = {
  onAuthClick: () => void;  // a function that returns void
};

const NavBar: React.FC<NavBarProps> = ({ onAuthClick }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Profile Button on the left */}
        <Link to="/profile">
            <button className="text-white hover:underline">Profile</button>
        </Link>

        
        {/* Sign In and Sign Up buttons on the right */}
        <div className="space-x-4">
          <button 
            onClick={onAuthClick}
            className="text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded">
            Sign In
          </button>
          <button 
            onClick={onAuthClick}
            className="text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

