import React from 'react';
import { X } from 'lucide-react';
import { BASE_DOC } from '../config';

const ViewMemberModal = ({ isOpen, onClose, member }) => {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 border-shadow">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Member Details</h2>
        <div className="flex flex-col items-center mb-6">
          <img src={`${BASE_DOC}/${member.imageUrl}`} alt={member.fullName} className="w-32 h-32 rounded-full object-cover border-4 border-gray-200" />
          <h3 className="text-xl font-semibold mt-4">{member.fullName}</h3>
          <p className="text-gray-600">{member.email}</p>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Phone Number</p>
              <p className="text-lg">{member.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Member Number</p>
              <p className="text-lg">{member.memberNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="text-lg">{member.address}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Date of Birth</p>
              <p className="text-lg">{new Date(member.dateOfBirth).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMemberModal; 