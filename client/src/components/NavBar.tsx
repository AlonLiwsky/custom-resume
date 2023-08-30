import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import { StoreContext, StoreContextType } from '../utils/store';
import { LOGOUT } from '../utils/actions';
import { logoutUser } from '../utils/api/authAPI';


// Define the prop types
type NavBarProps = {
  onAuthClick: () => void;  // a function that returns void
};

const NavBar: React.FC<NavBarProps> = ({ onAuthClick }) => {
  const { state, dispatch } = useContext(StoreContext) as StoreContextType;
  const { isAuthenticated } = state;

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Profile Button on the left, shown only if user is authenticated */}
        <div>
          {isAuthenticated && (
            <Link to="/profile">
              <button className="text-white hover:underline">Profile</button>
            </Link>
          )}
        </div>
  
        {/* Sign In and Sign Up buttons on the right, shown if user is not authenticated */}
        {!isAuthenticated && (
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
        )}
  
        {/* Logout button, shown only if user is authenticated */}
        {isAuthenticated && (
          <button 
            // TODO: Implement the logout logic
            onClick={() => {
              if (state.tokens?.refresh?.token) {
                logoutUser(state.tokens?.refresh?.token);
              }
              // Update global state to indicate user is logged out
              dispatch({ type: LOGOUT });
              // TODO: Implement any additional logout logic if needed
            }}
            className="text-white bg-red-600 hover:bg-red-500 px-4 py-2 rounded">
            Logout
          </button>
        )}
      </div>
    </nav>
  ); 
}

export default NavBar;

