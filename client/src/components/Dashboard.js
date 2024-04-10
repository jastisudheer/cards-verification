import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve the user data

    const handleLogout = () => {
        localStorage.removeItem('user'); // Removes user data from localStorage
        navigate('/'); // Redirects to login page
    };

    return (
        <div className="min-h-screen bg-blue-100">
            <div className="flex justify-between items-center p-4 shadow-md">
                <h2 className="text-2xl font-bold text-blue-900">Dashboard</h2>
                <div className="flex items-center">
                    <span className="mr-4 text-lg text-gray-700">{user?.username}</span> {/* Display username */}
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-6 pt-10">
                <button
                    onClick={() => navigate('/add-new-card')}
                    className="px-8 py-3 text-lg bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
                >
                    Add New Card
                </button>
                <button
                    onClick={() => navigate('/card-history')}
                    className="px-8 py-3 text-lg bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300 ease-in-out"
                >
                    Card History
                </button>
            </div>
        </div>
    );
}

export default Dashboard
