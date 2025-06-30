import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { User, Mail, Phone, Hash, MapPin, Calendar } from 'lucide-react';
import { BASE_DOC } from '../config';

const UpdateMemberModal = ({ isOpen, onClose, onUpdateMember, member, isSubmitting }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    memberNumber: '',
    address: '',
    dateOfBirth: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [hasNewImage, setHasNewImage] = useState(false);

  useEffect(() => {
    if (member) {
      setFormData({
        fullName: member.fullName || '',
        email: member.email || '',
        phoneNumber: member.phoneNumber || '',
        memberNumber: member.memberNumber || '',
        address: member.address || '',
        dateOfBirth: member.dateOfBirth ? new Date(member.dateOfBirth).toISOString().slice(0, 10) : '',
        image: null
      });
      // Set the existing image as preview
      if (member.imageUrl) {
        setImagePreview(`${BASE_DOC}/${member.imageUrl}`);
      } else {
        setImagePreview(null);
      }
      setHasNewImage(false);
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      if (files && files[0]) {
        setFormData(prev => ({ ...prev, image: files[0] }));
        setImagePreview(URL.createObjectURL(files[0]));
        setHasNewImage(true);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a copy of formData to modify
    const submitData = { ...formData };
    
    // If no new image was selected, remove the image field so it doesn't get sent as null
    if (!hasNewImage) {
      delete submitData.image;
    }
    
    onUpdateMember(member.id, submitData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50  border-shadow">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Edit Member</h2>
        <div className="flex flex-col items-center mb-6">
          <img
            src={imagePreview}
            alt={member.fullName}
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <span className="absolute left-3 top-9 text-gray-400"><User size={18} /></span>
              <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="p-2 pl-10 border rounded w-full" required />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <span className="absolute left-3 top-9 text-gray-400"><Mail size={18} /></span>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 pl-10 border rounded w-full" required />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <span className="absolute left-3 top-9 text-gray-400"><Phone size={18} /></span>
              <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="p-2 pl-10 border rounded w-full" />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Member Number</label>
              <span className="absolute left-3 top-9 text-gray-400"><Hash size={18} /></span>
              <input type="text" name="memberNumber" placeholder="Member Number" value={formData.memberNumber} onChange={handleChange} className="p-2 pl-10 border rounded w-full" />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <span className="absolute left-3 top-9 text-gray-400"><MapPin size={18} /></span>
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="p-2 pl-10 border rounded w-full" />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <span className="absolute left-3 top-9 text-gray-400"><Calendar size={18} /></span>
              <input type="date" name="dateOfBirth" placeholder="Date of Birth" value={formData.dateOfBirth} onChange={handleChange} className="p-2 pl-10 border rounded w-full" />
            </div>
          </div>
          <div className="relative mt-2">
            <label className="block text-sm font-medium text-white mb-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md cursor-pointer inline-block transition-colors duration-200">Update Profile Image</label>
            <input type="file" name="image" onChange={handleChange} className="mt-1 block w-full" />
            {!hasNewImage && member.imageUrl && (
              <p className="text-sm text-gray-500 mt-1">Current image will be preserved if no new image is selected</p>
            )}
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" disabled={isSubmitting}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMemberModal; 