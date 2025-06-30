import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Info, Users, Settings } from 'lucide-react';

const Sidebar = () => {
  const baseClasses = "flex items-center px-3 py-2 rounded-md";
  const activeLinkClass = "bg-gray-700 text-white";
  const inactiveLinkClass = "text-gray-300 hover:bg-gray-700 hover:text-white";
  const getNavLinkClass = ({ isActive }) => `${baseClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`;

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Lions 325K clubs</h2>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        <NavLink to="/" className={getNavLinkClass} end>
          <LayoutDashboard size={20} className="mr-3" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/club-info" className={getNavLinkClass}>
          <Info size={20} className="mr-3" />
          <span>Club Info</span>
        </NavLink>
        <NavLink to="/club-members" className={getNavLinkClass}>
          <Users size={20} className="mr-3" />
          <span>Club Members</span>
        </NavLink>
        <NavLink to="/other-info" className={getNavLinkClass}>
          <Settings size={20} className="mr-3" />
          <span>Other Info</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar; 