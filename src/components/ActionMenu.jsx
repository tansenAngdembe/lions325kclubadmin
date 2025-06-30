import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Eye, Pencil, Trash2 } from 'lucide-react';

const ActionMenu = ({ club, onUpdate, onDelete, onView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const handleUpdate = () => {
    onUpdate(club);
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete(club.id);
    setIsOpen(false);
  };
  
  const handleView = () => {
    onView(club);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left z-10" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
        <MoreVertical size={20} />
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="#" onClick={handleView} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              <Eye size={16} className="mr-3" />
              View
            </a>
            <a href="#" onClick={handleUpdate} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              <Pencil size={16} className="mr-3" />
              Edit
            </a>
            <a href="#" onClick={handleDelete} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              <Trash2 size={16} className="mr-3" />
              Delete
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionMenu; 