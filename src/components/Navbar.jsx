import React from 'react';
import { UserCircle, LogOut } from 'lucide-react';

const Navbar = ({ onLogout }) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-gray-800"></span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <UserCircle size={24} />
            </button>
            <button 
              onClick={onLogout}
              className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 