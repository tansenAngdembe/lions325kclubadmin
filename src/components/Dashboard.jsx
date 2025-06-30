import React, { useEffect, useState } from 'react';
import ActionMenu from './ActionMenu';
import AddMemberModal from './AddMemberModal';
import UpdateMemberModal from './UpdateMemberModal';
import ViewMemberModal from './ViewMemberModal';
import api from '../api';
import { BASE_DOC } from '../config';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [viewingMember, setViewingMember] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMembers = async () => {
    try {
      const response = await api.post('/get');
      setMembers(response.data.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleAddMember = async (memberData) => {
    const formData = new FormData();
    Object.keys(memberData).forEach(key => {
      formData.append(key, memberData[key]);
    });

    setIsSubmitting(true);
    try {
      const response = await api.post('/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data && response.data.code === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
        });
        await fetchMembers(); // Re-fetch data
        setIsAddModalOpen(false);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message || 'Failed to add member.',
        });
      }
    } catch (error) {
       Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An unexpected error occurred. Please try again.',
      });
      console.error('Error adding member:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenUpdateModal = (member) => {
    setEditingMember(member);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateMember = async (id, memberData) => {
    const formData = new FormData();
    formData.append('id', id);
    Object.keys(memberData).forEach(key => {
      formData.append(key, memberData[key]);
    });
    
    setIsSubmitting(true);
    try {
      await api.post('/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      await fetchMembers(); // Re-fetch data
      setIsUpdateModalOpen(false);
      setEditingMember(null);
    } catch (error) {
      console.error('Error updating member:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMember = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
    if (result.isConfirmed) {
      try {
        await api.post('/delete', { id });
        setMembers(prevMembers => prevMembers.filter(m => m.id !== id));
        Swal.fire('Deleted!', 'The member has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting member:', error);
        Swal.fire('Error', 'Failed to delete the member.', 'error');
      }
    }
  };

  const handleViewMember = (member) => {
    setViewingMember(member);
    setIsViewModalOpen(true);
  };

  return (
    <>
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-700">Club Members List</h2>
          </div>
          <div className="p-6">
            <div className="mb-6 flex justify-end">
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 font-bold text-white bg-gray-800 rounded-md hover:cursor-pointer"
              >
                Add Member
              </button>
            </div>
            <div className="">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Full Name</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone Number</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                  </tr>
                </thead>
                <tbody>
                  {members.map(member => (
                    <tr key={member.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        <img src={`${BASE_DOC}/${member.imageUrl}`} alt={member.fullName} className="w-10 h-10 rounded-full" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{member.fullName}</td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{member.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{member.phoneNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{member.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border-b border-gray-200">
                        <ActionMenu 
                          club={member} 
                          onUpdate={handleOpenUpdateModal} 
                          onDelete={handleDeleteMember}
                          onView={handleViewMember}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <AddMemberModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAddMember={handleAddMember} 
        isSubmitting={isSubmitting}
      />
      {editingMember && (
        <UpdateMemberModal 
          isOpen={isUpdateModalOpen}
          onClose={() => { setIsUpdateModalOpen(false); setEditingMember(null); }}
          onUpdateMember={handleUpdateMember}
          member={editingMember}
          isSubmitting={isSubmitting}
        />
      )}
      {viewingMember && (
        <ViewMemberModal 
          isOpen={isViewModalOpen}
          onClose={() => { setIsViewModalOpen(false); setViewingMember(null); }}
          member={viewingMember}
        />
      )}
    </>
  );
};

export default Dashboard; 