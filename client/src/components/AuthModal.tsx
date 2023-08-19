import React, { useState, useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { BsLinkedin } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { loginUser, registerUser } from '../utils/api/authAPI'; 
import { StoreContext, StoreContextType } from '../utils/store'; 
import { LOGIN_SUCCESS } from '../utils/actions';

function AuthModal({ onAuthClose }: { onAuthClose: () => void }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useContext(StoreContext) as StoreContextType;
  


  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignIn) {
        // Call login function
        const result = await loginUser(email, password);
        console.log('Login successful:', result);
        dispatch({ type: LOGIN_SUCCESS, payload: result });
        onAuthClose();
      } else {
        const result = await registerUser('Name', email, password); // Add name field if needed for registration
        console.log('Registration successful:', result);
        // Handle successful registration (e.g., update global state, redirect)
        dispatch({ type: LOGIN_SUCCESS, payload: result });
        onAuthClose();
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

    return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
                    {/* Close Button */}
                    <button 
                        onClick={onAuthClose}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                        <AiOutlineClose size={24} />
                    </button>
                <div className="text-center">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {isSignIn ? 'Sign In' : 'Sign Up'}
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleAuth}>
                    <div>
                        {/* ... (Email input field) */}
                        <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-2 text-lg"
                        />
                    </div>

                    <div>
                        {/* ... (Password input field) */}
                        <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-md border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-2 text-lg"
                        />
                    </div>

                    <div className="flex justify-between mt-4">
                        <div>
                            <button
                                type="button"
                                className="text-indigo-600 hover:text-indigo-500 hover:underline"
                                onClick={() => setIsSignIn(!isSignIn)}
                            >
                                {isSignIn ? 'Create an account' : 'Already have an account?'}
                            </button>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
                            >
                                {isSignIn ? 'Sign In' : 'Sign Up'}
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center items-center">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 w-full flex justify-center items-center">
                            <span className="mr-2">
                                <BsLinkedin />
                            </span>
                            {isSignIn ? 'Sign In with LinkedIn' : 'Sign Up with LinkedIn'}
                        </button>
                    </div>

                    <div className="mt-4 flex justify-center items-center">
                        <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 w-full flex justify-center items-center">
                            <span className="mr-2">
                                <FcGoogle />
                            </span>
                            {isSignIn ? 'Sign In with Google' : 'Sign Up with Google'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default AuthModal;

