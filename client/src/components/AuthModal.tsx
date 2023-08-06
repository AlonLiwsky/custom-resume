import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { BsLinkedin } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

function AuthModal({ onAuthClose }: { onAuthClose: () => void }) {
    const [isSignIn, setIsSignIn] = useState(true); // toggle between SignIn and SignUp views

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

                <form className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full rounded-md border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 text-lg"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full rounded-md border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 text-lg"
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

